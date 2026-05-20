import { createStorage } from 'unstorage'
import memoryDriver from 'unstorage/drivers/memory'

const storage = createStorage({ driver: memoryDriver() })

interface RateLimitOptions {
  max: number // máx peticiones
  duration: number // ventana en segundos
  ban?: number // segundos de ban al exceder (opcional)
}

export async function rateLimit(ip: string, key: string, options: RateLimitOptions) {
  const { max, duration, ban = 0 } = options
  const now = Date.now()

  const banKey = `ban:${key}:${ip}`
  const banned = await storage.getItem<number>(banKey)

  if (banned) {
    throw createError({
      statusCode: 429,
      message: 'Has excedido el límite de peticiones. Inténtalo de nuevo más tarde.'
    })
  }

  const storageKey = `rl:${key}:${ip}`
  const record = await storage.getItem<{ count: number; resetAt: number }>(storageKey)

  if (!record || record.resetAt < now) {
    await storage.setItem(storageKey, { count: 1, resetAt: now + duration * 1000 })
    return
  }

  if (record.count >= max) {
    if (ban > 0) {
      await storage.setItem(banKey, now, { ttl: ban })
    }
    throw createError({ statusCode: 429, message: 'Too Many Requests' })
  }

  await storage.setItem(storageKey, {
    count: record.count + 1,
    resetAt: record.resetAt
  })
}
