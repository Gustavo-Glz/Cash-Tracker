import * as z from 'zod'

export const userSchema = z.object({
  name: z.string().min(3, { error: 'El nombre debe tener al menos 3 caracteres' }),
  email: z.email({ error: 'El correo electrónico no es válido' }),
  password: z.string().min(8, { error: 'La contraseña debe tener al menos 8 caracteres' }),
  token: z.string().optional(),
  confirmed: z.boolean().optional()
})
export type User = z.infer<typeof userSchema>
