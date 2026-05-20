export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  await rateLimit(ip, 'confirm-account', { max: 5, duration: 60, ban: 600 })
  const { token } = await readValidatedBody(event, confirmAccountSchema.parse)
  const user = await UserRepository.findByToken(token)
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Token not found',
      data: { message: 'Token no valido' }
    })
  }
  await UserRepository.update(user.id, { confirmed: true, token: '' })
  return { message: 'Cuenta confirmada correctamente' }
})
