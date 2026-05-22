export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  const budgets = await budgetRepository.findAll(user!.id)
  return budgets
})
