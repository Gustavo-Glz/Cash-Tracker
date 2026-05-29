export const useBudgets = async () => {
  const { data, refresh } = await useFetch('/api/budgets')
  return {
    budgets: computed(() => data.value || []),
    refresh
  }
}
