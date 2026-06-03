export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, budgetSchema.parse)
  const { user } = await getUserSession(event)
  const budget = await budgetRepository.create(body, user!.id)
  setResponseStatus(event, 201)
  return {
    message: 'Presupuesto creado correctamente',
    budget
  }
})
