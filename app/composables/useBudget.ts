export const useBudget = () => {
  const { fetch } = useUserSession()

  const create = async (name: string, amount: number) => {
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

  const update = async (id: string, name: string, amount: number) => {
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

  return {
    create,
    update
  }
}
