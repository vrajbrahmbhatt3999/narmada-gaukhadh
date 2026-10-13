import type { FastifyInstance } from 'fastify'
import { PRODUCTS } from '../config/products.js'

export async function productRoutes(app: FastifyInstance) {
  // GET /api/products
  app.get('/api/products', async (_req, reply) => {
    const products = PRODUCTS.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      variants: p.variants.map((v) => ({
        id: v.id,
        label: v.label,
        priceInr: v.priceInPaise / 100,
        sku: v.sku,
      })),
    }))
    return reply.send({ products })
  })

  // GET /api/products/:slug
  app.get<{ Params: { slug: string } }>('/api/products/:slug', async (req, reply) => {
    const product = PRODUCTS.find((p) => p.slug === req.params.slug)
    if (!product) {
      return reply.code(404).send({ error: 'Product not found' })
    }
    return reply.send({
      id: product.id,
      slug: product.slug,
      name: product.name,
      variants: product.variants.map((v) => ({
        id: v.id,
        label: v.label,
        priceInr: v.priceInPaise / 100,
        sku: v.sku,
      })),
    })
  })
}
