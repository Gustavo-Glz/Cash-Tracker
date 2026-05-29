<script setup lang="ts">
interface Props {
  budget: Budget
}
defineProps<Props>()
</script>
<template>
  <UPageCard :title="budget.name">
    <template #description>
      <p class="text-secondary">{{ formatCurrency(budget.amount) }}</p>
      <span class="text-sm">Ultima actualización: {{ dayMonthYearFormat(budget.updatedAt) }}</span>
    </template>
  </UPageCard>
</template>
