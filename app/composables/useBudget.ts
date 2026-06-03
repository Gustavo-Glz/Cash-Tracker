export const useBudget = () => {
  const { fetch } = useUserSession()

  const createBudget = async (name: string, amount: number) => {
    try {
      await $fetch('/api/budget', {
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

  const updateBudget = async (id: string, name: string, amount: number) => {
    try {
      await $fetch(`/api/budget/${id}`, {
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

  const deleteBudget = async (id: string) => {
    try {
      await $fetch(`/api/budget/${id}`, { method: 'DELETE' })
      await fetch()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  return {
    createBudget,
    updateBudget,
    deleteBudget
  }
}
