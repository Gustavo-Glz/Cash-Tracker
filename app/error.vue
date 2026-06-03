<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const messages: Record<number, string> = {
  404: 'Página no encontrada',
  500: 'Error del servidor'
}
</script>

<template>
  <UError
    icon="i-lucide-file-x"
    :error="{
      statusCode: error.status,
      statusMessage: messages[error.status!] ?? 'Algo salió mal',
      message: error.message
    }"
    :clear="{ label: 'Volver al inicio', class: 'cursor-pointer' }"
  />
</template>
