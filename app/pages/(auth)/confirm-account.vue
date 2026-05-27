<script setup lang="ts">
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import z from 'zod'

useSeoMeta({
  title: 'Cash Tracker - Confirmar cuenta'
})

definePageMeta({
  layout: 'auth-layout',
  middleware: ['not-authenticated']
})

const toast = useToast()
const { confirmAccount } = useAuthentication()

const fields = ref<AuthFormField[]>([
  {
    name: 'otp',
    type: 'otp',
    label: 'Código de verificación',
    placeholder: 'o',
    length: 6,
    required: true
  }
])

const confirmAccountSchema = z.object({
  otp: z
    .array(z.string())
    .refine((val) => val.join('').length === 6, 'El código debe ser de 6 dígitos')
    .refine((val) => /^\d+$/.test(val.join('')), 'Solo se permiten números')
})

type ConfirmAccountSchema = z.output<typeof confirmAccountSchema>

async function onSubmit(payload: FormSubmitEvent<ConfirmAccountSchema>) {
  const otp = payload.data.otp.join('')

  const isSuccess = await confirmAccount(otp)

  if (!isSuccess) {
    toast.add({
      color: 'error',
      title: 'Error al confirmar cuenta',
      description: 'Código de verificación incorrecto.'
    })
    return
  }
  toast.add({
    color: 'success',
    title: 'Cuenta confirmada',
    description: 'Inicia sesión para continuar'
  })
}
</script>

<template>
  <UAuthForm
    icon="i-lucide-mail-check"
    title="Confirmar cuenta"
    description="Ingresa el código de verificación enviado a tu correo electrónico."
    loading-auto
    class="max-w-xs md:max-w-md md:w-96 [&_label]:text-center [&_label]:w-full"
    :ui="{ otp: 'justify-center' }"
    :schema="confirmAccountSchema"
    :fields="fields"
    :submit="{ class: 'cursor-pointer', label: 'Confirmar' }"
    @submit="onSubmit"
  >
    <template #footer>
      <div>
        ¿Correo incorrecto?
        <ULink to="/register" class="text-primary font-medium">Volver al registro</ULink>
      </div>
      <div>
        ¿Ya tienes una cuenta?
        <ULink to="/login" class="text-primary font-medium">Iniciar sesión</ULink>
      </div>
    </template>
  </UAuthForm>
</template>
