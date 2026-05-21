export default defineEventHandler(async (event) => {
  const { token } = await readValidatedBody(event, resetPasswordSchema.pick({ token: true }).parse)
  const user = await UserRepository.findByToken(token)
  if (!user)
    throw createError({
      statusCode: 404,
      statusMessage: 'Token not found',
      data: { message: 'Token no válido' }
    })
  return { success: true, message: 'Token válido' }
})
