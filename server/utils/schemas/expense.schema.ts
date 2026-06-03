import * as z from 'zod'

export const expenseSchema = z.object({
  name: z
    .string()
    .nonempty({ error: 'El nombre del gasto es obligatorio' })
    .min(3, { error: 'El nombre del gasto debe tener al menos 3 caracteres' }),
  amount: z
    .number({ error: 'El monto del gasto es obligatorio' })
    .positive({ error: 'El monto del gasto debe ser un número positivo' })
})

export type Expense = z.infer<typeof expenseSchema>
