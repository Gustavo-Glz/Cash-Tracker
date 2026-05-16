export const budgetRepository = {
  findAll: () =>
    prisma.budget.findMany({ orderBy: { createdAt: 'desc' }, include: { expenses: true } }),
  findById: (id: string) =>
    prisma.budget.findUnique({ where: { id }, include: { expenses: true } }),
  create: (data: Budget) => prisma.budget.create({ data }),
  update: (id: string, data: Budget) => prisma.budget.update({ where: { id }, data }),
  delete: (id: string) => prisma.budget.delete({ where: { id } })
}
