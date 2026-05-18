export default defineEventHandler(async (event) => {
  const idBudget = getRouterParam(event, 'id')
  const idExpense = getRouterParam(event, 'idExpense')
  const { idBudget: validatedBudgetId } = paramsSchema
    .pick({ idBudget: true })
    .parse({ idBudget: idBudget })
  const { idExpense: validatedExpenseId } = paramsSchema
    .pick({ idExpense: true })
    .parse({ idExpense: idExpense })

  const budget = await budgetRepository.findById(validatedBudgetId)
  if (!budget) {
    throw createError({ statusCode: 404, statusMessage: 'Budget not found' })
  }

  const expense = await expenseRepository.findById(validatedExpenseId)
  if (!expense) {
    throw createError({ statusCode: 404, statusMessage: 'Expense not found' })
  }

  const body = await readValidatedBody(event, expenseSchema.parse)
  const updatedExpense = await expenseRepository.update(validatedExpenseId, body)
  return { message: 'Gasto actualizado correctamente', updatedExpense }
})
