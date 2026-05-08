export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { id: validatedId } = paramsSquema.parse({ id })
  const budget = await prisma.budget.findUnique({ where: { id: validatedId } })
  if (!budget) {
    setResponseStatus(event, 404)
    return {
      message: 'Budget not found'
    }
  }
  return budget
})
