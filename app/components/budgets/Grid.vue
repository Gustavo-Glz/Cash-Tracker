<script setup lang="ts">
interface Props {
  budgets: Budget[]
}
defineProps<Props>()
</script>

<template>
  <UPageGrid class="mt-10">
    <BudgetCard v-for="budget in budgets" :key="budget.id" :budget="budget" />
  </UPageGrid>
</template>
