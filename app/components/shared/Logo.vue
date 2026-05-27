<script setup lang="ts">
interface Props {
  width?: number
  height?: number
}
defineProps<Props>()
</script>
<template>
  <NuxtImg :width="width" :height="height" src="/logo.svg" alt="logo" />
</template>
