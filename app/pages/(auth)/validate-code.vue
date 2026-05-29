<script setup lang="ts">
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import * as z from 'zod'

useSeoMeta({
  title: 'CashTracker - Confirmar código'
})

definePageMeta({
  layout: 'auth-layout',
  middleware: ['not-authenticated']
})

const toast = useToast()
const { validateCode } = useAuthentication()

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

const validateCodeSchema = z.object({
  otp: z
    .array(z.string())
    .refine((val) => val.join('').length === 6, 'El código debe ser de 6 dígitos')
    .refine((val) => /^\d+$/.test(val.join('')), 'Solo se permiten números')
})

type ValidateCodeSchema = z.output<typeof validateCodeSchema>

async function onSubmit(payload: FormSubmitEvent<ValidateCodeSchema>) {
  const otp = payload.data.otp.join('')

  const isSuccess = await validateCode(otp)

  if (!isSuccess) {
    toast.add({
      color: 'error',
      title: 'Error al validar código',
      description: 'Código de verificación incorrecto.'
    })
    return
  }
  toast.add({
    color: 'success',
    title: 'Código validado',
    description: 'Tu código ha sido validado.'
  })
}
</script>

<template>
  <UAuthForm
    icon="i-lucide-mail-check"
    title="Confirmar código"
    description="Ingresa el código de confirmación enviado a tu correo electrónico."
    loading-auto
    class="max-w-xs md:w-96 md:max-w-md [&_label]:w-full [&_label]:text-center"
    :ui="{ otp: 'justify-center' }"
    :schema="validateCodeSchema"
    :fields="fields"
    :submit="{ class: 'cursor-pointer', label: 'Confirmar' }"
    @submit="onSubmit"
  >
    <template #footer>
      <div>
        ¿Correo incorrecto?
        <ULink to="/forgot-password" class="text-primary font-medium">
          Volver a recuperar contraseña
        </ULink>
      </div>
      <div>
        ¿Ya tienes una cuenta?
        <ULink to="/login" class="text-primary font-medium">Iniciar sesión</ULink>
      </div>
    </template>
  </UAuthForm>
</template>
