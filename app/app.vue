<script setup lang="ts">
useSeoMeta({
  title: 'CashTrackr - Controla tu dinero, sin complicaciones',
  description:
    'Registra tus ingresos y gastos, crea presupuestos y visualiza en qué se va tu dinero. Gratis y fácil de usar.',

  ogTitle: 'CashTrackr - Controla tu dinero, sin complicaciones',
  ogDescription:
    'Registra tus ingresos y gastos, crea presupuestos y visualiza en qué se va tu dinero. Gratis y fácil de usar.',
  ogImage: '/og-image.png',
  ogImageAlt: 'Vista general de CashTrackr',
  ogUrl: '',
  ogType: 'website',
  ogSiteName: 'CashTrackr',
  ogLocale: 'es_MX',

  twitterCard: 'summary_large_image',
  twitterTitle: 'CashTrackr - Controla tu dinero, sin complicaciones',
  twitterDescription: 'Presupuestos, gastos e ingresos en un solo lugar. Simple y sin rodeos.',
  twitterImage: '/og-image.png',

  robots: 'index, follow'
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
