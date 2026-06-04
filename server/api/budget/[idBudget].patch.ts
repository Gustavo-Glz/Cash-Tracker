export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  const id = getRouterParam(event, 'idBudget')
  const { idBudget: validatedId } = paramsSchema.pick({ idBudget: true }).parse({ idBudget: id })
  const body = await readValidatedBody(event, budgetSchema.parse)
  const budget = await budgetRepository.findById(validatedId, user!.id)
  if (!budget) {
    throw createError({ statusCode: 404, statusMessage: 'Expense not found' })
  }
  const updatedBudget = await budgetRepository.update(validatedId, body)
  return {
    message: 'Presupuesto actualizado correctamente',
    budget: updatedBudget
  }
})
