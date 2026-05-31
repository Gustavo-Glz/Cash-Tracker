import * as z from 'zod'

export const confirmAccountSchema = z.object({
  token: z
    .string()
    .nonempty({ error: 'El token es requerido' })
    .min(6, { error: 'El token debe tener 6 caracteres' })
    .max(6, { error: 'El token debe tener 6 caracteres' })
})
