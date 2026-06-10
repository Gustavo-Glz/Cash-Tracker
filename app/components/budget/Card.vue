<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

interface Props {
  budget: IBudget
}
const props = defineProps<Props>()

const { checkPassword } = useAuthentication()
const { updateBudget, deleteBudget } = useBudget()
const { refresh } = await useBudgets()

const toast = useToast()
const openModalEdit = ref(false)
const openModalDelete = ref(false)
const stateEdit = reactive<Partial<BudgetSchemaEdit>>({
  name: props.budget.name,
  amount: +props.budget.amount
})
const stateDelete = reactive({ password: undefined })
const showPassword = ref(false)

const budgetSchemaEdit = z.object({
  name: z
    .string({ error: 'El nombre es obligatorio' })
    .min(3, { error: 'El nombre debe tener al menos 3 caracteres' }),
  amount: z
    .number({ error: 'La cantidad es obligatoria' })
    .min(0, { error: 'La cantidad debe ser mayor o igual a 0' })
})

const budgetSchemaDelete = z.object({
  password: z
    .string({ error: 'La contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
})

type BudgetSchemaEdit = z.output<typeof budgetSchemaEdit>
type BudgetSchemaDelet = z.output<typeof budgetSchemaDelete>

async function onSubmitEdit(payload: FormSubmitEvent<BudgetSchemaEdit>) {
  const { name, amount } = payload.data
  const isSuccess = await updateBudget(props.budget.id, name, amount)

  if (!isSuccess) {
    toast.add({
      color: 'error',
      title: 'Error',
      description: 'No se pudo actualizar el presupuesto'
    })
    return
  }
  toast.add({
    color: 'success',
    title: 'Presupuesto actualizado correctamente',
    description: 'Puedes verlo en el panel de presupuestos'
  })
  openModalEdit.value = false
  await refresh()
}

async function onSubmitDelete(payload: FormSubmitEvent<BudgetSchemaDelet>) {
  const { password } = payload.data
  const isValidPassword = await checkPassword(password)
  if (!isValidPassword) {
    toast.add({
      color: 'error',
      title: 'Contraseña incorrecta',
      description: 'Verifica tu contraseña en intenta de nuevo'
    })
    return
  }
  toast.add({
    color: 'success',
    title: 'Presupuesto eliminado',
    description: 'El presupuesto y sus gastos han sido eliminados correctamente'
  })
  await deleteBudget(props.budget.id)
  openModalDelete.value = false
  await refresh()
}

const onClose = () => {
  openModalDelete.value = false
  stateDelete.password = undefined
}
</script>
<template>
  <UPageCard :title="budget.name" variant="subtle" :ui="{ title: 'text-primary' }">
    <template #description>
      <p class="text-secondary font-medium">{{ formatCurrency(budget.amount) }}</p>
      <span class="text-xs">Ultima actualización: {{ dayMonthYearFormat(budget.updatedAt) }}</span>
    </template>
    <template #footer>
      <div class="space-x-2">
        <UButton
          class="cursor-pointer"
          icon="i-lucide-eye"
          color="neutral"
          size="xs"
          variant="subtle"
          :to="`/dashboard/budget/${budget.id}`"
        >
          Ver
        </UButton>
        <UButton
          class="cursor-pointer"
          icon="i-lucide-edit"
          color="primary"
          size="xs"
          variant="subtle"
          @click="openModalEdit = true"
        >
          Editar
        </UButton>
        <UButton
          class="cursor-pointer"
          icon="i-lucide-trash"
          color="error"
          size="xs"
          variant="subtle"
          @click="openModalDelete = true"
        >
          Eliminar
        </UButton>
      </div>
    </template>
  </UPageCard>
  <!-- Modal para editar -->
  <UModal
    v-model:open="openModalEdit"
    title="Editar presupuesto"
    description="Actualiza el nombre o la cantidad de tu presupuesto"
    :close="{ class: 'cursor-pointer' }"
  >
    <template #body>
      <UForm
        class="w-full space-y-4"
        loading-auto
        :schema="budgetSchemaEdit"
        :state="stateEdit"
        @submit="onSubmitEdit"
      >
        <UFormField label="Nombre" name="name">
          <UInput v-model="stateEdit.name" class="w-full" placeholder="Nombre del presupuesto" />
        </UFormField>
        <UFormField label="Cantidad" name="amount">
          <UInput v-model="stateEdit.amount" class="w-full" type="number" placeholder="0.00" />
        </UFormField>
        <UButton block class="cursor-pointer" type="submit">Actualizar presupuesto</UButton>
      </UForm>
    </template>
  </UModal>
  <!-- Modal para eliminar -->
  <UModal
    v-model:open="openModalDelete"
    title="Eliminar presupuesto"
    description="Ingresa tu contraseña para eliminar el presupuesto"
    :close="{ class: 'cursor-pointer' }"
    @update:open="onClose"
  >
    <template #body>
      <UForm
        class="w-full space-y-4"
        loading-auto
        :schema="budgetSchemaDelete"
        :state="stateDelete"
        @submit="onSubmitDelete"
      >
        <UFormField label="Contraseña" name="password" required>
          <UInput
            v-model="stateDelete.password"
            class="w-full"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Ingresa tu contraseña"
          >
            <template #trailing>
              <UButton
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                size="sm"
                color="neutral"
                variant="link"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>
        <div class="flex w-full justify-between gap-4">
          <UButton
            block
            color="neutral"
            variant="subtle"
            class="w-1/2 cursor-pointer text-center"
            @click="onClose"
          >
            Cancelar
          </UButton>
          <UButton block class="w-1/2 cursor-pointer text-center" color="error" type="submit">
            Eliminar presupuesto
          </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>
