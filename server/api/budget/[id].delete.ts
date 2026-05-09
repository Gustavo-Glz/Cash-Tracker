export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { id: validatedId } = paramsSchema.parse({ id })
  const budget = await budgetRepository.findById(validatedId)
  if (!budget) {
    setResponseStatus(event, 404)
    return {
      message: 'Budget not found'
    }
  }
  await budgetRepository.delete(validatedId)
  return {
    message: 'Budget deleted successfully'
  }
})
