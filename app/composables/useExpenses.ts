export const useExpenses = async (id: string) => {
  const { data, refresh } = await useFetch(`/api/budget/${id}`)
  return { expenses: computed(() => data.value?.expenses || []), refresh }
}
