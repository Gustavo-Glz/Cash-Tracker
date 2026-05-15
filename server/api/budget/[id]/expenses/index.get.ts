export default defineEventHandler(async (event) => {
  const idBudget = getRouterParam(event, 'id')
  const { idBudget: validatedId } = paramsSchema.pick({ idBudget: true }).parse({ idBudget })
  const budget = await budgetRepository.findById(validatedId)
  if (!budget) {
    throw createError({ statusCode: 404, statusText: 'Budget not found' })
  }
  const expenses = await expenseRepository.findAll(budget.id)
  return expenses
})
