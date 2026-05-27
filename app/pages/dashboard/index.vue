<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const links = ref<ButtonProps[]>([
  {
    icon: 'i-lucide-plus',
    label: 'Crear presupuesto',
    to: '/dashboard/new-budget',
    color: 'secondary',
    variant: 'subtle'
  }
])
</script>

<template>
  <UPage>
    <UPageHeader
      title="Mis presupuestos"
      description="Mantén tus presupuestos organizados y controla tus finanzas."
      :links="links"
      :ui="{
        description: 'hidden lg:block'
      }"
    />
  </UPage>
</template>
