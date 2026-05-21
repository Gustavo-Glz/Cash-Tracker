export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, userSchema.pick({ email: true }).parse)
  const user = await UserRepository.findUnique(email)
  if (!user)
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
      data: { message: 'Usuario no encontrado' }
    })
  const generatedToken = generateToken()
  await UserRepository.update(user.id, { token: generatedToken })
  await forgotPasswordEmail(email, user.name, generatedToken)
  return {
    message: 'Correo enviado correctamente, se ha enviado un token para restablecer la contraseña'
  }
})
