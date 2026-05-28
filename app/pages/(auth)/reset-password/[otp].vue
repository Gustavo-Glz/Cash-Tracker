<script setup lang="ts">
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import z from 'zod'

useSeoMeta({
  title: 'CashTracker - Nueva contraseña'
})

definePageMeta({
  layout: 'auth-layout',
  middleware: ['not-authenticated']
})

const route = useRoute()
const toast = useToast()
const { resetPassword } = useAuthentication()

const fields = ref<AuthFormField[]>([
  {
    name: 'password',
    type: 'password',
    label: 'Contraseña',
    placeholder: 'Ingresa tu contraseña',
    required: true
  }
])

const resetPasswordSchema = z.object({
  password: z
    .string({ error: 'La contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
})

type ResetPasswordSchema = z.output<typeof resetPasswordSchema>

async function onSubmit(payload: FormSubmitEvent<ResetPasswordSchema>) {
  const { password } = payload.data

  const isSuccess = await resetPassword(route.params.otp as string, password)

  if (!isSuccess) {
    toast.add({
      color: 'error',
      title: 'Error',
      description: 'Intenta nuevamente.'
    })
    return
  }
  toast.add({
    color: 'success',
    title: 'Contraseña actualizada',
    description: 'Inicia sesión con tu nueva contraseña.'
  })
}
</script>

<template>
  <UAuthForm
    icon="i-lucide-user-key"
    title="Nueva contraseña"
    description="Actualiza tu contraseña con una nueva."
    loading-auto
    class="max-w-xs md:w-96 md:max-w-md"
    :schema="resetPasswordSchema"
    :fields="fields"
    :submit="{ class: 'cursor-pointer', label: 'Actualizar' }"
    @submit="onSubmit"
  >
  </UAuthForm>
</template>
