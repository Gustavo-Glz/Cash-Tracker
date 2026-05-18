import argon2 from 'argon2'

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readValidatedBody(event, userSchema.parse)
  const user = await UserRepository.findUnique(email)
  if (user) {
    throw createError({
      statusCode: 409,
      statusMessage: 'email already registered',
      data: { message: 'El correo electrónico ya está registrado' }
    })
  }
  const hashedPassword = await argon2.hash(password)
  const tokenGenerated = generateToken()
  await UserRepository.create({ name, email, password: hashedPassword, token: tokenGenerated })
  await authEmail(email, name, tokenGenerated)
  setResponseStatus(event, 201)
  return {
    message: 'Usuario registrado correctamente'
  }
})
