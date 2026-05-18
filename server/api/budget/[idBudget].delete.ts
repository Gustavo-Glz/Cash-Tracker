export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'idBudget')
  const { idBudget: validatedId } = paramsSchema.pick({ idBudget: true }).parse({ idBudget: id })
  const budget = await budgetRepository.findById(validatedId)
  if (!budget) {
    throw createError({ statusCode: 404, statusMessage: 'Budget not found' })
  }
  await budgetRepository.delete(validatedId)
  return {
    message: 'Presupuesto eliminado correctamente'
  }
})
