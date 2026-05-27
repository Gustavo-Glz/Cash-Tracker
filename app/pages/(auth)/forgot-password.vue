<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'

useSeoMeta({
  title: 'Cash Tracker - Recuperar Contraseña'
})

definePageMeta({
  layout: 'auth-layout',
  middleware: ['not-authenticated']
})

const fields = ref<AuthFormField[]>([
  {
    name: 'email',
    type: 'email',
    label: 'Correo electrónico',
    placeholder: 'Ingresa tu correo electrónico',
    required: true
  }
])
</script>

<template>
  <UAuthForm
    icon="i-lucide-user-key"
    title="Recuperar contraseña"
    description="Ingresa tu correo electrónico para recuperar tu contraseña."
    loading-auto
    class="max-w-xs md:max-w-md md:w-96"
    :fields="fields"
    :submit="{ class: 'cursor-pointer', label: 'Enviar instrucciones' }"
  >
    <template #footer>
      <div>
        ¿Regresar a inicio de sesión?
        <ULink to="/login" class="text-primary font-medium">Iniciar sesión</ULink>
      </div>
    </template>
  </UAuthForm>
</template>
