export default defineEventHandler(async (event) => {
  const idBudget = getRouterParam(event, 'id')
  const { idBudget: validatedId } = paramsSchema.pick({ idBudget: true }).parse({ idBudget })
  const budget = await budgetRepository.findById(validatedId)
  const body = await readValidatedBody(event, expenseSchema.parse)
  if (!budget) {
    throw createError({ statusCode: 404, statusMessage: 'Budget not found' })
  }
  const expense = await expenseRepository.create(body, budget.id)
  return expense
})
