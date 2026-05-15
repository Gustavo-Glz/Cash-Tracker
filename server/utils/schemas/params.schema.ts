import z from 'zod'

export const paramsSchema = z.object({
  idBudget: z.uuid({ error: 'El id del presupuesto debe ser un UUID válido' }),
  idExpense: z.uuid({ error: 'El id del gasto debe ser un UUID válido' })
})
