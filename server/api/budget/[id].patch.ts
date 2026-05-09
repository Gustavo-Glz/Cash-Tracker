export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { id: validatedId } = paramsSchema.parse({ id })
  const body = await readValidatedBody(event, budgetSchema.parse)
  const budget = await budgetRepository.findById(validatedId)
  if (!budget) {
    setResponseStatus(event, 404)
    return {
      message: 'Budget not found'
    }
  }
  const updatedBudget = await budgetRepository.update(validatedId, body)
  return {
    message: 'Budget updated successfully',
    budget: updatedBudget
  }
})
