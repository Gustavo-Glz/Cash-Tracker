export default defineEventHandler(async () => {
  const budgets = await prisma.budget.findMany({ orderBy: { createdAt: 'desc' } })
  //TODO: filter budgers by user authentication
  return budgets
})
