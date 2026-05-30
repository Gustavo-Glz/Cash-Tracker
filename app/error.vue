<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <UError
    icon="i-lucide-file-x"
    :error="{
      statusCode: 404,
      statusMessage: 'Página no encontrada',
      message: 'La página que buscas no existe'
    }"
    :clear="{ label: 'Volver al inicio', class: 'cursor-pointer' }"
  />
</template>
