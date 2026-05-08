export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { id: validatedId } = paramsSquema.parse({ id })
  const body = await readValidatedBody(event, budgetSquema.parse)
  const budget = await prisma.budget.findUnique({ where: { id: validatedId } })
  if (!budget) {
    setResponseStatus(event, 404)
    return {
      message: 'Budget not found'
    }
  }
  const updatedBudget = await prisma.budget.update({
    where: { id: validatedId },
    data: body
  })
  return {
    message: 'Budget updated successfully',
    budget: updatedBudget
  }
})
