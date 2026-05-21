export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const path = event.path
  const method = event.method

  const limits: Record<string, { max: number; duration: number; ban?: number }> = {
    'POST:/api/auth/login': { max: 5, duration: 600, ban: 1800 },
    'POST:/api/auth/register': { max: 3, duration: 3600, ban: 3600 },
    'POST:/api/auth/confirm-account': { max: 5, duration: 600, ban: 600 }
  }

  const key = `${method}:${path}`
  const limit = limits[key]

  if (!limit) return

  await rateLimit(ip, key, limit)
})
