import * as z from 'zod'

export const updatePasswordSchema = z.object({
  currentPassword: z
    .string({ error: 'La contraseña es requerida' })
    .min(8, { error: 'La contraseña debe tener al menos 8 caracteres' }),
  newPassword: z
    .string({ error: 'La contraseña es requerida' })
    .min(8, { error: 'La contraseña debe tener al menos 8 caracteres' })
})
