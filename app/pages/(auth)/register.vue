<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import z from 'zod'

useSeoMeta({
  title: 'Cash Tracker - Crear Cuenta'
})

definePageMeta({
  layout: 'auth-layout',
  middleware: ['not-authenticated']
})

const toast = useToast()
const { register } = useAuthentication()

const fields = ref<AuthFormField[]>([
  {
    name: 'name',
    type: 'text',
    label: 'Nombre',
    placeholder: 'Ingresa tu nombre',
    required: true
  },
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

const registerSchema = z.object({
  name: z.string({ error: 'El nombre es obligatorio' }),
  email: z.email({
    error: 'Correo electrónico no válido'
  }),
  password: z
    .string({ error: 'La contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
})

type RegisterSchema = z.output<typeof registerSchema>

async function onSubmit(payload: FormSubmitEvent<RegisterSchema>) {
  const { name, email, password } = payload.data

  const isSuccess = await register(name, email, password)

  if (!isSuccess) {
    toast.add({
      color: 'error',
      title: 'Error al crear cuenta',
      description: 'Verifica tus datos e intenta nuevamente.'
    })
    return
  }
  toast.add({
    color: 'success',
    title: 'Cuenta creada correctamente',
    description: 'Verifica tu correo electrónico para confirmar tu cuenta.'
  })
}
</script>

<template>
  <UAuthForm
    icon="i-lucide-user-plus"
    title="Crear cuenta"
    description="Ingresa tus datos para crear tu cuenta"
    loading-auto
    class="max-w-xs md:max-w-md md:w-96"
    :schema="registerSchema"
    :fields="fields"
    :submit="{ class: 'cursor-pointer', label: 'Registrarme' }"
    @submit="onSubmit"
  >
    <template #footer>
      ¿Ya tienes una cuenta?
      <ULink to="/login" class="text-primary font-medium">Inicia sesión</ULink>
    </template>
  </UAuthForm>
</template>
