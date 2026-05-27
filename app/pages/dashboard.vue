<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout',
  middleware: ['authenticated']
})
</script>

<template>
  <NuxtPage />
</template>
