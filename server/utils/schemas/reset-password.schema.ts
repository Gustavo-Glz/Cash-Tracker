import z from 'zod'

export const resetPasswordSchema = z.object({
  token: z.string().nonempty({ error: 'El token es requerido' }),
  password: z
    .string()
    .nonempty({ error: 'La contraseña es requerida' })
    .min(8, { error: 'La contraseña debe tener al menos 8 caracteres' })
})
