export default defineEventHandler(async (event) => {
  const { name, email } = await readValidatedBody(
    event,
    userSchema.pick({ name: true, email: true }).parse
  )
  const { user: userAuthenticated } = await getUserSession(event)
  if (!userAuthenticated)
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      data: { message: 'No estás autenticado' }
    })

  const user = await UserRepository.findById(userAuthenticated.id)
  if (!user)
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
      data: { message: 'Usuario no encontrado' }
    })

  if (email !== user.email) {
    const userByEmail = await UserRepository.findUnique(email)
    if (userByEmail)
      throw createError({
        statusCode: 409,
        statusMessage: 'Email already exists',
        data: { message: 'El correo ya existe' }
      })
  }

  await UserRepository.update(user.id, { name, email })
  await setUserSession(event, {
    user: { ...user, name, email }
  })
  return { message: 'Usuario actualizado correctamente' }
})
