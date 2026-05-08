import z from 'zod'

export const paramsSquema = z.object({
  id: z.uuid('El id del presupuesto debe ser un UUID válido')
})
