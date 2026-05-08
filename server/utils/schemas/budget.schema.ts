import z from 'zod'

export const budgetSquema = z.object({
  name: z
    .string({ error: 'El nombre del presupuesto es obligatorio' })
    .min(3, { error: 'El nombre del presupuesto debe tener al menos 3 caracteres' }),
  amount: z
    .number({ error: 'El monto del presupuesto es obligatorio' })
    .min(0, { error: 'El monto del presupuesto debe ser un número positivo' })
})
