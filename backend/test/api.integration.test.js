import assert from 'node:assert/strict'
import { after, before, beforeEach, test } from 'node:test'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import nock from 'nock'
import request from 'supertest'
import User from '../models/User.js'
import Mentor from '../models/Mentor.js'
import Booking from '../models/Booking.js'
import CareerAnalysis from '../models/CareerAnalysis.js'

process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test-only-secret-with-at-least-32-characters'
process.env.JWT_EXPIRES_IN = '1h'
process.env.GEMINI_API_KEY = 'test-gemini-key'
process.env.CLIENT_URL = 'http://localhost:5173'

let app
let mongoServer

before(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri())
  const modules = await Promise.all([
    import('../app.js'),
    User.init(),
    Mentor.init(),
    Booking.init(),
    CareerAnalysis.init()
  ])
  app = modules[0].default
})

beforeEach(async () => {
  await Promise.all([
    User.deleteMany({}),
    Mentor.deleteMany({}),
    Booking.deleteMany({}),
    CareerAnalysis.deleteMany({})
  ])
  nock.cleanAll()
})

after(async () => {
  nock.cleanAll()
  await mongoose.disconnect()
  await mongoServer?.stop()
})

const createUserAndToken = async () => {
  const user = await User.create({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    education: 'Engineering'
  })
  const { generateToken } = await import('../middleware/auth.js')
  return { user, token: generateToken(user._id) }
}

test('registration and login create a password-protected account', async () => {
  const registration = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Test User',
      email: 'TEST@example.com',
      password: 'password123',
      education: 'Engineering'
    })

  assert.equal(registration.status, 201)
  assert.ok(registration.body.token)
  assert.equal(registration.body.user.email, 'test@example.com')
  assert.equal(await User.countDocuments(), 1)
  assert.notEqual((await User.findOne()).password, 'password123')

  const login = await request(app)
    .post('/api/auth/login')
    .send({ email: 'test@example.com', password: 'password123' })

  assert.equal(login.status, 200)
  assert.ok(login.body.token)
})

test('registration and login reject invalid request data', async () => {
  const registration = await request(app)
    .post('/api/auth/register')
    .send({ name: '', email: 'not-an-email', password: 'short' })
  const login = await request(app)
    .post('/api/auth/login')
    .send({ email: 'not-an-email' })

  assert.equal(registration.status, 400)
  assert.equal(login.status, 400)
})

test('protected profile route accepts a valid token and rejects a missing token', async () => {
  const { token, user } = await createUserAndToken()

  const unauthorized = await request(app).get('/api/users/profile')
  const authorized = await request(app)
    .get('/api/users/profile')
    .set('Authorization', `Bearer ${token}`)

  assert.equal(unauthorized.status, 401)
  assert.equal(authorized.status, 200)
  assert.equal(authorized.body._id, user.id)
  assert.equal(authorized.body.password, undefined)
})

test('protected route rejects an invalid JWT', async () => {
  const response = await request(app)
    .get('/api/users/profile')
    .set('Authorization', 'Bearer invalid-token')

  assert.equal(response.status, 401)
})

test('profile update rejects protected or unknown fields and accepts allowed fields', async () => {
  const { token, user } = await createUserAndToken()
  const invalid = await request(app)
    .put('/api/users/profile')
    .set('Authorization', `Bearer ${token}`)
    .send({ role: 'admin', password: 'attacker-password' })

  assert.equal(invalid.status, 400)
  assert.equal((await User.findById(user.id)).password, user.password)

  const valid = await request(app)
    .put('/api/users/profile')
    .set('Authorization', `Bearer ${token}`)
    .send({ bio: 'Updated profile', skills: ['React'] })

  assert.equal(valid.status, 200)
  assert.equal(valid.body.bio, 'Updated profile')
  assert.equal(valid.body.role, undefined)
})

test('career analysis rejects incomplete input before calling Gemini', async () => {
  const { token } = await createUserAndToken()
  const response = await request(app)
    .post('/api/career/analyze')
    .set('Authorization', `Bearer ${token}`)
    .send({ education: 'Engineering' })

  assert.equal(response.status, 400)
  assert.equal(response.body.message, 'Validation failed')
  assert.ok(Array.isArray(response.body.errors))
  assert.equal(nock.pendingMocks().length, 0)
})

test('career comparison and AI chat reject invalid input before calling Gemini', async () => {
  const { token } = await createUserAndToken()
  const comparison = await request(app)
    .post('/api/career/compare')
    .set('Authorization', `Bearer ${token}`)
    .send({ careers: [''] })
  const chat = await request(app)
    .post('/api/career/chat')
    .set('Authorization', `Bearer ${token}`)
    .send({ message: '   ' })

  assert.equal(comparison.status, 400)
  assert.equal(chat.status, 400)
  assert.equal(nock.pendingMocks().length, 0)
})

test('booking endpoint validates mentor ID, date, time, and topic', async () => {
  const { token } = await createUserAndToken()
  const response = await request(app)
    .post('/api/mentors/bookings')
    .set('Authorization', `Bearer ${token}`)
    .send({ mentorId: 'not-an-object-id', date: 'not-a-date', time: '', topic: '' })

  assert.equal(response.status, 400)
  assert.equal(response.body.message, 'Validation failed')
})

test('simultaneous active bookings for the same mentor slot produce one booking', async () => {
  const { token, user } = await createUserAndToken()
  const mentor = await Mentor.create({
    name: 'Test Mentor',
    email: 'mentor@example.com',
    role: 'Engineer',
    company: 'Example',
    experience: '5 years',
    bio: 'Mentor bio',
    price: 1000
  })
  const booking = {
    mentorId: mentor.id,
    date: '2030-05-20',
    time: '10:00 AM',
    topic: 'Career guidance'
  }

  const results = await Promise.all([
    request(app).post('/api/mentors/bookings').set('Authorization', `Bearer ${token}`).send(booking),
    request(app).post('/api/mentors/bookings').set('Authorization', `Bearer ${token}`).send(booking)
  ])

  assert.deepEqual(results.map(({ status }) => status).sort(), [201, 409])
  assert.equal(await Booking.countDocuments({
    mentor: mentor._id,
    date: booking.date,
    time: booking.time,
    status: { $in: ['pending', 'confirmed'] }
  }), 1)

  await Booking.updateOne({ mentor: mentor._id }, { $set: { status: 'cancelled' } })
  const rebooking = await request(app)
    .post('/api/mentors/bookings')
    .set('Authorization', `Bearer ${token}`)
    .send(booking)
  assert.equal(rebooking.status, 201)
  assert.equal(await Booking.countDocuments({ user: user._id, mentor: mentor._id }), 2)
})

test('malformed Gemini JSON returns the existing validated fallback recommendations', async () => {
  const { token } = await createUserAndToken()
  const gemini = nock('https://generativelanguage.googleapis.com')
    .post('/v1beta/models/gemini-1.5-flash:generateContent')
    .matchHeader('x-goog-api-key', process.env.GEMINI_API_KEY)
    .reply(200, {
      candidates: [{ content: { parts: [{ text: 'not valid JSON' }] } }]
    })

  const response = await request(app)
    .post('/api/career/analyze')
    .set('Authorization', `Bearer ${token}`)
    .send({
      education: 'Engineering',
      interests: 'Technology',
      goals: 'Become a developer',
      skills: 'JavaScript'
    })

  assert.equal(response.status, 200)
  assert.equal(response.body.success, true)
  assert.equal(response.body.data.careers[0].title, 'Full Stack Developer')
  assert.equal(await CareerAnalysis.countDocuments(), 1)
  assert.equal(gemini.isDone(), true)
})

test('Gemini JSON with an invalid response structure returns fallback recommendations', async () => {
  const { token } = await createUserAndToken()
  const gemini = nock('https://generativelanguage.googleapis.com')
    .post('/v1beta/models/gemini-1.5-flash:generateContent')
    .matchHeader('x-goog-api-key', process.env.GEMINI_API_KEY)
    .reply(200, {
      candidates: [{ content: { parts: [{ text: '{"careers":[]}' }] } }]
    })

  const response = await request(app)
    .post('/api/career/analyze')
    .set('Authorization', `Bearer ${token}`)
    .send({
      education: 'Engineering',
      interests: 'Technology',
      goals: 'Become a developer',
      skills: 'JavaScript'
    })

  assert.equal(response.status, 200)
  assert.equal(response.body.data.careers[0].title, 'Full Stack Developer')
  assert.equal(gemini.isDone(), true)
})
