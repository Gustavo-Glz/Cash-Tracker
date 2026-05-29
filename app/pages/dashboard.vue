<script setup lang="ts">
useSeoMeta({
  title: 'CashTracker - Panel de Administración',
  description: 'Panel de administración para CashTracker'
})
definePageMeta({
  layout: 'dashboard-layout',
  middleware: ['authenticated']
})
</script>

<template>
  <NuxtPage />
</template>
