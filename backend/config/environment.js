export const validateEnvironment = () => {
  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret || jwtSecret.length < 32 || /replace-with|change-me|example/i.test(jwtSecret)) {
    throw new Error('JWT_SECRET must be set to a non-placeholder value of at least 32 characters.')
  }

  const tokenLifetime = process.env.JWT_EXPIRES_IN
  if (tokenLifetime && !/^\d+(s|m|h|d)$/i.test(tokenLifetime)) {
    throw new Error('JWT_EXPIRES_IN must use seconds, minutes, hours, or days (for example, 7d).')
  }

  if (!process.env.GEMINI_API_KEY || /replace-with|your-key/i.test(process.env.GEMINI_API_KEY)) {
    throw new Error('GEMINI_API_KEY must be set to a non-placeholder value.')
  }

  if (process.env.NODE_ENV === 'production' && !process.env.CLIENT_URL) {
    throw new Error('CLIENT_URL must be configured in production.')
  }
}
