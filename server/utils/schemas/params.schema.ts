import z from 'zod'

export const paramsSchema = z.object({
  id: z.uuid('El id del presupuesto debe ser un UUID válido')
})
