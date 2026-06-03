import type { Budget } from '../schemas/budget.schema'

export const budgetRepository = {
  findAll: (id: string) =>
    prisma.budget.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' },
      include: { expenses: true }
    }),
  findById: (id: string, userId: string) =>
    prisma.budget.findUnique({ where: { id, userId }, include: { expenses: true } }),
  create: (data: Budget, userId: string) => prisma.budget.create({ data: { ...data, userId } }),
  update: (id: string, data: Budget) => prisma.budget.update({ where: { id }, data }),
  delete: (id: string) => prisma.budget.delete({ where: { id } })
}
