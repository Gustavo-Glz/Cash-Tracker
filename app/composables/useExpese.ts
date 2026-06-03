export const useExpense = async () => {
  const { fetch } = useUserSession()

  const createExpense = async (name: string, amount: number, budgetId: string) => {
    try {
      await $fetch(`/api/budget/${budgetId}/expense`, {
        method: 'POST',
        body: {
          name,
          amount
        }
      })
      await fetch()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const updateExpense = async (
    idBudget: string,
    idExpense: string,
    name: string,
    amount: number
  ) => {
    try {
      await $fetch(`/api/budget/${idBudget}/expense/${idExpense}`, {
        method: 'PATCH',
        body: {
          name,
          amount
        }
      })
      await fetch()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const deleteExpense = async (idBudget: string, idExpense: string) => {
    try {
      await $fetch(`/api/budget/${idBudget}/expense/${idExpense}`, {
        method: 'DELETE'
      })
      await fetch()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
  return { createExpense, updateExpense, deleteExpense }
}
