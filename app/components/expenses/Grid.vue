<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string

const { amountBudget, expenses, amountAvailable } = await useExpenses(id)

const amountSpent = computed(() => {
  return expenses.value.reduce((acc, expense) => acc + parseFloat(expense.amount), 0)
})

const percentageSpent = computed(() => {
  const raw = (amountSpent.value / Number(amountBudget.value)) * 100
  return +raw.toFixed(2)
})

const color = computed(() => {
  if (percentageSpent.value >= 90) return 'error'
  if (percentageSpent.value >= 70 && percentageSpent.value < 90) return 'warning'
  return 'info'
})
</script>

<template>
  <div class="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
    <SharedCircleProgress
      :model-value="percentageSpent"
      :color="color"
      label="Gastado"
      :size="160"
    />
    <div class="space-y-2">
      <p class="text-muted text-lg font-medium">
        Presupuesto: <span class="text-primary">{{ formatCurrency(amountBudget) }}</span>
      </p>
      <p class="text-muted text-lg font-medium">
        Disponible: <span class="text-success">{{ formatCurrency(amountAvailable) }}</span>
      </p>
      <p class="text-muted text-lg font-medium">
        Gastado:
        <span
          :class="{
            'text-error': percentageSpent >= 90,
            'text-warning': percentageSpent >= 70 && percentageSpent < 90,
            'text-info': percentageSpent < 70
          }"
          >{{ formatCurrency(amountSpent) }}</span
        >
      </p>
    </div>
  </div>
  <UPageGrid class="mt-10">
    <ExpenseCard v-for="expense in expenses" :key="expense.id" :expense="expense" />
  </UPageGrid>
</template>
