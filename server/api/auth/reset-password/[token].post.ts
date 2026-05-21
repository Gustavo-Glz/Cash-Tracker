import argon2 from 'argon2'
export default defineEventHandler(async (event) => {
  const token = getRouterParam(event, 'token')
  const { token: tokenValid } = paramsSchema.pick({ token: true }).parse({ token })
  const user = await UserRepository.findByToken(tokenValid)
  if (!user)
    throw createError({
      statusCode: 404,
      statusMessage: 'Token not found',
      data: { message: 'Token no válido' }
    })
  const { password } = await readValidatedBody(
    event,
    resetPasswordSchema.pick({ password: true }).parse
  )
  const hashedPassword = await argon2.hash(password)
  await UserRepository.update(user.id, { token: '', password: hashedPassword })
  return { message: 'Contraseña actualizada correctamente' }
})
