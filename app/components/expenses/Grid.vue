<script setup lang="ts">
interface Props {
  expenses: IExpense[]
}
defineProps<Props>()
</script>

<template>
  <UPageGrid class="mt-10">
    <ExpenseCard v-for="expense in expenses" :key="expense.id" :expense="expense" />
  </UPageGrid>
</template>
