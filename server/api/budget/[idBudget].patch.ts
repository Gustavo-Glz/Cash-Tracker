export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'idBudget')
  const { idBudget: validatedId } = paramsSchema.pick({ idBudget: true }).parse({ idBudget: id })
  const body = await readValidatedBody(event, budgetSchema.parse)
  const budget = await budgetRepository.findById(validatedId)
  if (!budget) {
    throw createError({ statusCode: 404, statusMessage: 'Expense not found' })
  }
  const updatedBudget = await budgetRepository.update(validatedId, body)
  return {
    message: 'Budget updated successfully',
    budget: updatedBudget
  }
})
