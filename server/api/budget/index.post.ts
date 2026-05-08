export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, budgetSquema.parse)
  const budget = await prisma.budget.create({ data: body })
  setResponseStatus(event, 201)
  return {
    message: 'Budget created successfully',
    budget
  }
})
