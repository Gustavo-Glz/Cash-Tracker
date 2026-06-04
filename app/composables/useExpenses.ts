export const useExpenses = async (id: string) => {
  const { data, refresh } = await useFetch(`/api/budget/${id}`)

  const amountAvailable = computed(
    () =>
      Number(data.value?.amount) -
      (data.value?.expenses || []).reduce((acc, expense) => acc + parseFloat(expense.amount), 0)
  )

  return {
    amountBudget: computed(() => Number(data.value?.amount)),
    expenses: computed(() => data.value?.expenses || []),
    amountAvailable,
    refresh
  }
}
