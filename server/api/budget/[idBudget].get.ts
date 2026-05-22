export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  const idBudget = getRouterParam(event, 'idBudget')
  const { idBudget: validatedId } = paramsSchema
    .pick({ idBudget: true })
    .parse({ idBudget: idBudget })
  const budget = await budgetRepository.findById(validatedId, user!.id)
  if (!budget) {
    throw createError({ statusCode: 404, statusMessage: 'Budget not found' })
  }
  return budget
})
