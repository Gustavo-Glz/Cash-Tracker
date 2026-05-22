import argon2 from 'argon2'

export default defineEventHandler(async (event) => {
  const { currentPassword, password } = await readValidatedBody(event, updatePasswordSchema.parse)
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

  const isPasswordValid = await argon2.verify(user.password, currentPassword)
  if (!isPasswordValid)
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid password',
      data: { message: 'La contraseña actual no es válida' }
    })
  const newPassword = await argon2.hash(password)
  await UserRepository.update(user.id, { password: newPassword })
  return { message: 'Contraseña actualizada correctamente' }
})
