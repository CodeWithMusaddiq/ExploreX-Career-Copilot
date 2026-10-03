import mongoose from 'mongoose'

const connectDB = async () => {
  const mongoUri = process.env.NODE_ENV === 'development'
    ? process.env.MONGODB_URI_LOCAL || process.env.MONGODB_URI
    : process.env.MONGODB_URI

  try {
    if (!mongoUri) throw new Error('Set MONGODB_URI or MONGODB_URI_LOCAL in backend/.env.')

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('❌ MongoDB connection failed.')
    throw error
  }
}

export default connectDB