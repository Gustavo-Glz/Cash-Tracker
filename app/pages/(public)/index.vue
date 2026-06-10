<script setup lang="ts">
import type { PageCardProps } from '@nuxt/ui'

useSeoMeta({
  // --- Básico ---
  title: 'CashTrackr - Controla tu dinero, sin complicaciones',
  description:
    'Registra tus ingresos y gastos, crea presupuestos y visualiza en qué se va tu dinero. Gratis y fácil de usar.',

  // --- Open Graph (Facebook, WhatsApp, etc.) ---
  ogTitle: 'CashTrackr - Controla tu dinero, sin complicaciones',
  ogDescription:
    'Registra tus ingresos y gastos, crea presupuestos y visualiza en qué se va tu dinero. Gratis y fácil de usar.',
  ogImage: '/og-image.png', // 1200×630 px recomendado
  ogImageAlt: 'Vista general de CashTrackr',
  ogUrl: '',
  ogType: 'website',
  ogSiteName: 'CashTrackr',
  ogLocale: 'es_MX',

  // --- Twitter / X ---
  twitterCard: 'summary_large_image',
  twitterTitle: 'CashTrackr - Controla tu dinero, sin complicaciones',
  twitterDescription: 'Presupuestos, gastos e ingresos en un solo lugar. Simple y sin rodeos.',
  twitterImage: '/og-image.png',

  // --- Indexación ---
  robots: 'index, follow'
})

const colorMode = useColorMode()
const { isLoggedIn } = useAuthentication()

const features = ref<PageCardProps[]>([
  {
    title: 'Organización sin esfuerzo',
    description:
      'Todo en orden y a la vista. Nuestro panel te da una imagen clara de en qué va tu dinero, sin esfuerzo.',
    icon: 'i-lucide-wallet'
  },
  {
    title: 'Presupuesto inteligente',
    description:
      'Define tus metas financieras y lleva un control claro de tus gastos en un solo lugar.',
    icon: 'i-lucide-brain'
  },
  {
    title: 'Acceso en cualquier lugar',
    description:
      'Nuestra plataforma está disponible para que puedas gestionar tus finanzas desde donde te encuentres.',
    icon: 'i-lucide-globe'
  },
  {
    title: 'Seguridad',
    description:
      'Protegemos tus datos con los más altos estándares de seguridad, para que puedas utilizar nuestra plataforma con total tranquilidad.',
    icon: 'i-lucide-shield-check'
  }
])
</script>

<template>
  <ClientOnly>
    <UPageHero
      :ui="{
        title: 'max-w-4xl mx-auto',
        description: 'max-w-4xl mx-auto',
        headline: 'max-w-xs mx-auto'
      }"
    >
      <template #title>
        <h1 class="text-5xl font-semibold tracking-wide">
          Administra tus <span class="text-primary">presupuestos</span> con claridad
        </h1>
      </template>
      <template #description>
        <p class="text-xl">
          Crea presupuestos, registra gastos y mantén el control de tus finanzas personales desde un
          solo lugar.
        </p>
      </template>
      <template #headline>
        <div
          class="bg-primary/10 text-primary flex items-center justify-center gap-1 rounded-md px-2 py-1"
        >
          <UIcon name="i-lucide-stars" />
          <p class="text-sm">Control financiero simple y efectivo</p>
        </div>
      </template>
      <template #links>
        <UButton v-if="isLoggedIn" class="cursor-pointer" icon="i-lucide-wallet" to="/dashboard">
          Mis presupuestos
        </UButton>
        <UButton v-else class="cursor-pointer" icon="i-lucide-arrow-right" to="/register">
          Empieza gratis
        </UButton>
        <UButton class="cursor-pointer" icon="i-lucide-arrow-down" to="#features" color="neutral">
          Saber más
        </UButton>
      </template>
      <div
        class="ring-default bg-default mx-auto w-full max-w-6xl overflow-hidden rounded-2xl shadow-2xl ring-2"
      >
        <div class="border-default flex items-center gap-1.5 border-b px-4 py-3">
          <span class="size-3 rounded-full bg-red-400" />
          <span class="size-3 rounded-full bg-yellow-400" />
          <span class="size-3 rounded-full bg-green-400" />
        </div>
        <NuxtImg
          :src="colorMode.value === 'dark' ? '/budget-panel-dark.png' : '/budget-panel-light.png'"
          class="w-full"
          alt="Imagen del dashboard"
        />
      </div>
    </UPageHero>
    <UPageSection
      id="features"
      title="Todo lo que necesitas"
      description="Simple de usar, poderoso cuando lo necesitas"
    >
      <UPageGrid>
        <UPageCard
          v-for="{ title, description, icon } in features"
          :key="title"
          :title="title"
          :description="description"
          :icon="icon"
          variant="subtle"
          spotlight
          spotlight-color="primary"
        />
      </UPageGrid>
    </UPageSection>
    <UPageCTA
      title="Empieza a controlar tus finanzas hoy"
      description="Únete y toma el control de tu dinero desde el primer día"
    >
      <template #links>
        <UButton v-if="isLoggedIn" class="cursor-pointer" icon="i-lucide-wallet" to="/dashboard">
          Mis presupuestos
        </UButton>
        <UButton v-else class="cursor-pointer" icon="i-lucide-user-plus" to="/register">
          Crear cuenta
        </UButton>
      </template>
    </UPageCTA>
  </ClientOnly>
</template>
