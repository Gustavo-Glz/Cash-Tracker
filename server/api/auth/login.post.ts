import argon2 from 'argon2'

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(
    event,
    userSchema.pick({ email: true, password: true }).parse
  )

  const user = await UserRepository.findUnique(email)
  if (!user)
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
      data: { message: 'Correo electrónico no registrado' }
    })

  const isValidPassword = await argon2.verify(user.password, password)
  if (!isValidPassword)
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      data: { message: 'Contraseña incorrecta' }
    })

  const isUserVerified = user.confirmed
  if (!isUserVerified)
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      data: { message: 'Usuario no verificado' }
    })

  const userSession = {
    id: user.id,
    name: user.name,
    email: user.email
  }

  await setUserSession(event, { user: userSession })
  return {
    user: userSession,
    message: 'Inicio de sesión exitoso'
  }
})
