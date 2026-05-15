export const expenseRepository = {
  findAll: (id: string) =>
    prisma.expense.findMany({ where: { budgetId: id }, orderBy: { createdAt: 'desc' } }),
  findById: (id: string) => prisma.expense.findUnique({ where: { id } }),
  create: (data: Expense, budgetId: string) =>
    prisma.expense.create({ data: { ...data, budgetId } }),
  update: (id: string, data: Expense) => prisma.expense.update({ where: { id }, data }),
  delete: (id: string) => prisma.expense.delete({ where: { id } })
}
