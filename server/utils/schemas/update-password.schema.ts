import z from 'zod'

export const updatePasswordSchema = z.object({
  currentPassword: z
    .string()
    .nonempty({ error: 'La contraseña es requerida' })
    .min(8, { error: 'La contraseña debe tener al menos 8 caracteres' }),
  password: z
    .string()
    .nonempty({ error: 'La contraseña es requerida' })
    .min(8, { error: 'La contraseña debe tener al menos 8 caracteres' })
})
