<script setup lang="ts">
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import z from 'zod'

useSeoMeta({
  title: 'CashTracker - Iniciar sesión'
})

definePageMeta({
  layout: 'auth-layout',
  middleware: ['not-authenticated']
})

const toast = useToast()
const { login } = useAuthentication()

const fields = ref<AuthFormField[]>([
  {
    name: 'email',
    type: 'email',
    label: 'Correo electrónico',
    placeholder: 'Ingresa tu correo electrónico',
    required: true
  },
  {
    name: 'password',
    type: 'password',
    label: 'Contraseña',
    placeholder: 'Ingresa tu contraseña',
    required: true
  }
])

const loginSchema = z.object({
  email: z.email({
    error: 'Correo electrónico no válido'
  }),
  password: z
    .string({ error: 'La contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
})

type LoginSchema = z.output<typeof loginSchema>

async function onSubmit(payload: FormSubmitEvent<LoginSchema>) {
  const { email, password } = payload.data

  const isSuccess = await login(email, password)

  if (!isSuccess) {
    toast.add({
      color: 'error',
      title: 'Error al iniciar sesión',
      description: 'Correo electrónico o contraseña incorrectos.'
    })
    return
  }
  toast.add({
    color: 'success',
    title: 'Bienvenido',
    description: 'Has iniciado sesión en Cash Tracker'
  })
}
</script>

<template>
  <UAuthForm
    icon="i-lucide-user"
    title="Iniciar sesión"
    description="Accede a tu cuenta para controlar tus finanzas."
    loading-auto
    class="max-w-xs md:w-96 md:max-w-md"
    :schema="loginSchema"
    :fields="fields"
    :submit="{ class: 'cursor-pointer', label: 'Entrar' }"
    @submit="onSubmit"
  >
    <template #footer>
      <div>
        ¿No tienes una cuenta?
        <ULink to="/register" class="text-primary font-medium">Regístrate</ULink>
      </div>
      <div>
        ¿Olvidaste tu contraseña?
        <ULink to="/forgot-password" class="text-primary font-medium">Recuperar Contraseña</ULink>
      </div>
    </template>
  </UAuthForm>
</template>
