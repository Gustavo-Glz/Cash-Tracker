export default defineEventHandler(async () => {
  const budgets = await budgetRepository.findAll()
  return budgets
})
