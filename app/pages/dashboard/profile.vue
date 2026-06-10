<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { user, updatePassword, updateUser } = useAuthentication()
const items = [
  {
    label: 'Mi cuenta',
    icon: 'i-lucide-user',
    slot: 'account'
  },
  {
    label: 'Cambiar contraseña',
    icon: 'i-lucide-lock',
    slot: 'password'
  }
]

const toast = useToast()
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const stateUser = reactive({
  name: user.value?.name,
  email: user.value?.email
})
const statePassword = reactive({
  currentPassword: undefined,
  newPassword: undefined
})

const userSchema = z.object({
  name: z.string({ error: 'El nombre es obligatorio' }),
  email: z.email({
    error: 'Correo electrónico no válido'
  })
})

const passwordSchema = z.object({
  currentPassword: z
    .string({ error: 'La contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
  newPassword: z
    .string({ error: 'La contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
})

type UserSchema = z.output<typeof userSchema>
type PasswordSchema = z.output<typeof passwordSchema>

async function onSubmitUser(payload: FormSubmitEvent<UserSchema>) {
  const { name, email } = payload.data
  const { success, message } = await updateUser(name, email)
  if (!success) {
    toast.add({
      color: 'error',
      title: 'Error al actualizar el perfil',
      description: message
    })
    return
  }
  toast.add({
    color: 'success',
    title: 'Perfil actualizado',
    description: 'Tu perfil ha sido actualizado correctamente'
  })
}

async function onSubmitPassword(payload: FormSubmitEvent<PasswordSchema>) {
  const { currentPassword, newPassword } = payload.data
  const isSuccess = await updatePassword(currentPassword, newPassword)
  if (!isSuccess) {
    toast.add({
      color: 'error',
      title: 'Error al actualizar la contraseña',
      description: 'Verifica tus datos e intenta de nuevo'
    })
    return
  }
  toast.add({
    color: 'success',
    title: 'Contraseña actualizada',
    description: 'Tu contraseña ha sido actualizada correctamente'
  })
  statePassword.currentPassword = undefined
  statePassword.newPassword = undefined
}
</script>

<template>
  <UPageHeader
    class="mt-10"
    :title="user?.name"
    description="Administra tu información personal y mantén tus datos actualizados"
    headline="Perfil"
  />
  <UCard class="mx-auto mt-10 w-full max-w-lg">
    <UTabs :items="items">
      <template #account>
        <p class="text-highlighted my-4 text-base font-semibold">Información personal</p>
        <UForm
          class="flex flex-col gap-4"
          :schema="userSchema"
          :state="stateUser"
          @submit="onSubmitUser"
        >
          <UFormField label="Nombre" name="name">
            <UInput v-model="stateUser.name" class="w-full" />
          </UFormField>
          <UFormField label="Correo" name="email">
            <UInput v-model="stateUser.email" class="w-full" />
          </UFormField>
          <UButton class="cursor-pointer" block type="submit">Guardar cambios</UButton>
        </UForm>
      </template>

      <template #password>
        <p class="text-highlighted my-4 text-base font-semibold">Cambiar contraseña</p>
        <UForm
          class="flex flex-col gap-4"
          :schema="passwordSchema"
          :state="statePassword"
          @submit="onSubmitPassword"
        >
          <UFormField label="Contraseña actual" name="currentPassword" required>
            <UInput
              v-model="statePassword.currentPassword"
              :type="showCurrentPassword ? 'text' : 'password'"
              class="w-full"
            >
              <template #trailing>
                <UButton
                  :icon="showCurrentPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  size="sm"
                  color="neutral"
                  variant="link"
                  class="cursor-pointer"
                  @click="showCurrentPassword = !showCurrentPassword"
                />
              </template>
            </UInput>
          </UFormField>
          <UFormField label="Nueva contraseña" name="newPassword" required>
            <UInput
              v-model="statePassword.newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              class="w-full"
            >
              <template #trailing>
                <UButton
                  :icon="showNewPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  size="sm"
                  color="neutral"
                  variant="link"
                  class="cursor-pointer"
                  @click="showNewPassword = !showNewPassword"
                />
              </template>
            </UInput>
          </UFormField>
          <UButton class="cursor-pointer" block type="submit">Cambiar contraseña</UButton>
        </UForm>
      </template>
    </UTabs>
  </UCard>
</template>
