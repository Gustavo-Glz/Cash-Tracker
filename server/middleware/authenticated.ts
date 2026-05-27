export default defineEventHandler(async (event) => {
  const path = event.path

  const publicRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/confirm-account',
    '/api/auth/validate-token',
    '/api/auth/forgot-password',
    '/api/auth/reset-password',
    '/api/_nuxt_icon/'
  ]

  const isPublic = publicRoutes.some((route) => path.startsWith(route))

  if (isPublic) return

  if (!path.startsWith('/api')) return

  const { user } = await getUserSession(event)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
})
