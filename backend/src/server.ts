import 'dotenv/config'
import Fastify, { type FastifyError } from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'

import { productRoutes } from './routes/products.js'
import { orderRoutes, paymentRoutes } from './routes/orders.js'
import { enquiryRoutes } from './routes/enquiries.js'
import { prisma } from './services/db.js'

const PORT = parseInt(process.env.PORT ?? '4000', 10)
const NODE_ENV = process.env.NODE_ENV ?? 'development'

const app = Fastify({
  logger: {
    level: NODE_ENV === 'production' ? 'warn' : 'info',
    // Redact sensitive fields from logs
    redact: ['req.headers.authorization', '*.password', '*.salt', '*.hash'],
  },
})

// Security headers
await app.register(helmet, {
  contentSecurityPolicy: false, // Frontend served separately
})

// CORS
await app.register(cors, {
  origin: process.env.ALLOWED_ORIGINS?.split(',') ?? ['http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
})

// Rate limiting
await app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
  // Stricter limit for payment endpoints
  keyGenerator: (req) => req.ip,
})

// Body size limit
app.addContentTypeParser(
  'application/x-www-form-urlencoded',
  { parseAs: 'string', bodyLimit: 10_000 },
  (_req, body, done) => {
    try {
      const parsed = Object.fromEntries(new URLSearchParams(body as string))
      done(null, parsed)
    } catch (e) {
      done(e as Error, undefined)
    }
  }
)

// Health check
app.get('/api/health', async (_req, reply) => {
  let dbOk = false
  try {
    await prisma.$queryRaw`SELECT 1`
    dbOk = true
  } catch {
    // db not connected
  }

  return reply.send({
    status: dbOk ? 'ok' : 'degraded',
    db: dbOk ? 'connected' : 'disconnected',
    env: NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})

// Routes
await app.register(productRoutes)
await app.register(orderRoutes)
await app.register(paymentRoutes)
await app.register(enquiryRoutes)

// 404 handler
app.setNotFoundHandler((_req, reply) => {
  reply.code(404).send({ error: 'Route not found' })
})

// Error handler — never expose stack traces in production
app.setErrorHandler((error: FastifyError, _req, reply) => {
  app.log.error(error)
  const statusCode = error.statusCode ?? 500
  reply.code(statusCode).send({
    error: statusCode >= 500 && NODE_ENV === 'production'
      ? 'An internal error occurred. Please try again.'
      : (error.message || 'Internal server error'),
    code: error.code,
  })
})

// Graceful shutdown
const shutdown = async (signal: string) => {
  app.log.info(`Received ${signal}, shutting down...`)
  await app.close()
  await prisma.$disconnect()
  process.exit(0)
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

try {
  await app.listen({ port: PORT, host: '0.0.0.0' })
  app.log.info(`Backend running on http://0.0.0.0:${PORT}`)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
