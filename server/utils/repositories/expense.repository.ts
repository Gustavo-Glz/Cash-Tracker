import type { Expense } from '../schemas/expense.schema'

export const expenseRepository = {
  findById: (id: string, budgetId: string) =>
    prisma.expense.findUnique({ where: { id, budgetId } }),
  create: (data: Expense, budgetId: string) =>
    prisma.expense.create({ data: { ...data, budgetId } }),
  update: (id: string, data: Expense) => prisma.expense.update({ where: { id }, data }),
  delete: (id: string) => prisma.expense.delete({ where: { id } })
}
