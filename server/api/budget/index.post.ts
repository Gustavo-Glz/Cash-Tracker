export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, budgetSchema.parse)
  const budget = await prisma.budget.create({ data: body })
  setResponseStatus(event, 201)
  return {
    message: 'Presupuesto creado correctamente',
    budget
  }
})
