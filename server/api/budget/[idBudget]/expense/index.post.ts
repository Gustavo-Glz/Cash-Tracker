export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  const idBudget = getRouterParam(event, 'idBudget')
  const { idBudget: validatedId } = paramsSchema.pick({ idBudget: true }).parse({ idBudget })
  const budget = await budgetRepository.findById(validatedId, user!.id)
  const body = await readValidatedBody(event, expenseSchema.parse)
  if (!budget) {
    throw createError({ statusCode: 404, statusMessage: 'Budget not found' })
  }
  const expense = await expenseRepository.create(body, budget.id)
  return { message: 'Gasto creado correctamente', expense }
})
