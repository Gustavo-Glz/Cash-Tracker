<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import z from 'zod'

useSeoMeta({
  title: 'CashTracker - Recuperar contraseña'
})

definePageMeta({
  layout: 'auth-layout',
  middleware: ['not-authenticated']
})

const toast = useToast()
const { forgotPassword } = useAuthentication()

const fields = ref<AuthFormField[]>([
  {
    name: 'email',
    type: 'email',
    label: 'Correo electrónico',
    placeholder: 'Ingresa tu correo electrónico',
    required: true
  }
])

const forgotPasswordSchema = z.object({
  email: z.email({
    error: 'Correo electrónico no válido'
  })
})

type ForgotPasswordSchema = z.output<typeof forgotPasswordSchema>

async function onSubmit(payload: FormSubmitEvent<ForgotPasswordSchema>) {
  const { email } = payload.data
  const isSuccess = await forgotPassword(email)
  if (!isSuccess) {
    toast.add({
      color: 'error',
      title: 'Correo electrónico no encontrado',
      description: 'Verifica tus datos e intenta nuevamente.'
    })
    return
  }
  toast.add({
    color: 'success',
    title: 'Instrucciones enviadas',
    description: 'Revisa tu correo electrónico para recuperar tu contraseña.'
  })
}
</script>

<template>
  <UAuthForm
    :schema="forgotPasswordSchema"
    icon="i-lucide-user-key"
    title="Recuperar contraseña"
    description="Ingresa tu correo electrónico para recuperar tu contraseña."
    loading-auto
    class="max-w-xs md:w-96 md:max-w-md"
    :fields="fields"
    :submit="{ class: 'cursor-pointer', label: 'Enviar instrucciones' }"
    @submit="onSubmit"
  >
    <template #footer>
      <div>
        ¿Regresar a inicio de sesión?
        <ULink to="/login" class="text-primary font-medium">Iniciar sesión</ULink>
      </div>
    </template>
  </UAuthForm>
</template>
