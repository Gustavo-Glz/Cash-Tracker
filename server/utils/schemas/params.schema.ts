import z from 'zod'

export const paramsSchema = z.object({
  idBudget: z
    .uuid({ error: 'El id del presupuesto debe ser un UUID válido' })
    .nonempty({ error: 'El id del presupuesto es obligatorio' }),
  idExpense: z
    .uuid({ error: 'El id del gasto debe ser un UUID válido' })
    .nonempty({ error: 'El id del gasto es obligatorio' })
})
