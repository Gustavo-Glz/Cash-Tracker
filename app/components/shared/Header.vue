<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
const { isLoggedIn, logout, user } = useAuthentication()

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: user.value?.name,
      description: user.value?.email,
      type: 'label'
    }
  ],
  [
    {
      label: 'Mi perfil',
      icon: 'i-lucide-user',
      to: '/dashboard/profile'
    },
    {
      label: 'Mis presupuestos',
      icon: 'i-lucide-wallet',
      to: '/dashboard',
      exact: true
    }
  ],
  [
    {
      label: 'Cerrar sesión',
      icon: 'i-lucide-log-out',
      color: 'primary',
      onSelect: logout,
      class: 'cursor-pointer'
    }
  ]
])
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
                label: 'Mis presupuestos',
                to: '/dashboard',
                exact: true,
                icon: 'i-lucide-wallet',
                ui: { linkLabel: 'hidden md:block' }
              }
            ]"
          />
          <UDropdownMenu
            :items="items"
            :content="{ align: 'end', side: 'bottom', sideOffset: 8 }"
            :ui="{ content: 'w-56 max-w-56' }"
          >
            <UAvatar class="cursor-pointer" color="primary" :alt="user?.name" />
          </UDropdownMenu>
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
