export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  const idBudget = getRouterParam(event, 'idBudget')
  const idExpense = getRouterParam(event, 'idExpense')
  const { idBudget: validatedBudgetId } = paramsSchema
    .pick({ idBudget: true })
    .parse({ idBudget: idBudget })
  const { idExpense: validatedExpenseId } = paramsSchema
    .pick({ idExpense: true })
    .parse({ idExpense: idExpense })

  const budget = await budgetRepository.findById(validatedBudgetId, user!.id)
  if (!budget) {
    throw createError({ statusCode: 404, statusMessage: 'Budget not found' })
  }
  const expense = await expenseRepository.findById(validatedExpenseId, validatedBudgetId)
  if (!expense) {
    throw createError({ statusCode: 404, statusMessage: 'Expense not found' })
  }
  await expenseRepository.delete(validatedExpenseId)
  return { message: 'Gasto eliminado correctamente' }
})
