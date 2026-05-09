export const budgetRepository = {
  findAll: () => prisma.budget.findMany({ orderBy: { createdAt: 'desc' } }),
  findById: (id: string) => prisma.budget.findUnique({ where: { id } }),
  create: (data: Budget) => prisma.budget.create({ data }),
  update: (id: string, data: Budget) => prisma.budget.update({ where: { id }, data }),
  delete: (id: string) => prisma.budget.delete({ where: { id } })
}
