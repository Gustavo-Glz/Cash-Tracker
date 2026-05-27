<script setup lang="ts">
const { isLoggedIn, logout } = useAuthentication()
</script>

<template>
  <UHeader :toggle="false">
    <template #title>
      <IconLogoCash />
    </template>
    <template #right>
      <ClientOnly>
        <template v-if="isLoggedIn">
          <UNavigationMenu
            color="neutral"
            :items="[
              {
                label: 'Dashboard',
                to: '/dashboard',
                icon: 'i-lucide-layout-dashboard',
                ui: { linkLabel: 'hidden md:block' }
              }
            ]"
          />
          <UButton
            class="cursor-pointer"
            icon="i-lucide-log-out"
            label="Cerrar sesión"
            color="primary"
            variant="ghost"
            :ui="{ label: 'hidden md:block' }"
            @click="logout"
          />
        </template>
        <template v-else>
          <!-- Mobile: solo icono -->
          <UButton
            to="/login"
            icon="i-lucide-log-in"
            color="primary"
            variant="ghost"
            class="lg:hidden"
          />
          <!-- Desktop: con label -->
          <UButton
            to="/login"
            label="Iniciar sesión"
            icon="i-lucide-log-in"
            color="primary"
            variant="solid"
            class="hidden lg:flex cursor-pointer"
          />
        </template>
      </ClientOnly>
      <UColorModeButton class="cursor-pointer" />
    </template>
  </UHeader>
</template>
