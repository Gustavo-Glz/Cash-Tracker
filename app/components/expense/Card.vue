<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

interface Props {
  expense: IExpense
}
const props = defineProps<Props>()

const route = useRoute()
const idBudget = route.params.id as string
const { checkPassword } = useAuthentication()
const { refresh } = await useExpenses(idBudget)
const { updateExpense, deleteExpense } = await useExpense()

const toast = useToast()
const openModalEdit = ref(false)
const openModalDelete = ref(false)
const stateEdit = reactive<Partial<ExpenseSchemaEdit>>({
  name: props.expense.name,
  amount: +props.expense.amount
})
const stateDelete = reactive({ password: undefined })
const showPassword = ref(false)

const expenseSchemaEdit = z.object({
  name: z
    .string({ error: 'El nombre es obligatorio' })
    .min(3, { error: 'El nombre debe tener al menos 3 caracteres' }),
  amount: z
    .number({ error: 'La cantidad es obligatoria' })
    .min(0, { error: 'La cantidad debe ser mayor o igual a 0' })
})

const expenseSchemaDelete = z.object({
  password: z
    .string({ error: 'La contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
})

type ExpenseSchemaEdit = z.output<typeof expenseSchemaEdit>
type ExpenseSchemaDelete = z.output<typeof expenseSchemaDelete>

async function onSubmitEdit(payload: FormSubmitEvent<ExpenseSchemaEdit>) {
  const { name, amount } = payload.data
  const isSuccess = await updateExpense(idBudget, props.expense.id, name, amount)

  if (!isSuccess) {
    toast.add({
      color: 'error',
      title: 'Error',
      description: 'No se pudo actualizar el gasto'
    })
    return
  }
  toast.add({
    color: 'success',
    title: 'Gasto actualizado correctamente',
    description: 'Puedes verlo en el panel de gastos'
  })
  openModalEdit.value = false
  await refresh()
}

async function onSubmitDelete(payload: FormSubmitEvent<ExpenseSchemaDelete>) {
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
    title: 'Gasto eliminado',
    description: 'El gasto a sido eliminado de tu presupuesto'
  })
  await deleteExpense(idBudget, props.expense.id)
  openModalDelete.value = false
  stateDelete.password = undefined
  await refresh()
}

const onClose = () => {
  openModalDelete.value = false
  stateDelete.password = undefined
}
</script>
<template>
  <UPageCard :title="expense.name" variant="subtle" :ui="{ title: 'text-primary' }">
    <template #description>
      <p class="text-secondary font-medium">{{ formatCurrency(expense.amount) }}</p>
      <span class="text-xs">Ultima actualización: {{ dayMonthYearFormat(expense.updatedAt) }}</span>
    </template>
    <template #footer>
      <div class="space-x-2">
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
    title="Editar gasto"
    description="Actualiza el nombre o la cantidad de tu gasto"
    :close="{ class: 'cursor-pointer' }"
  >
    <template #body>
      <UForm
        class="w-full space-y-4"
        loading-auto
        :schema="expenseSchemaEdit"
        :state="stateEdit"
        @submit="onSubmitEdit"
      >
        <UFormField label="Nombre" name="name">
          <UInput v-model="stateEdit.name" class="w-full" placeholder="Nombre del presupuesto" />
        </UFormField>
        <UFormField label="Cantidad" name="amount">
          <UInput v-model="stateEdit.amount" class="w-full" type="number" placeholder="0.00" />
        </UFormField>
        <UButton block class="cursor-pointer" type="submit">Actualizar gasto</UButton>
      </UForm>
    </template>
  </UModal>
  <!-- Modal para eliminar -->
  <UModal
    v-model:open="openModalDelete"
    title="Eliminar gasto"
    description="Ingresa tu contraseña para eliminar el gasto"
    :close="{ class: 'cursor-pointer' }"
    @update:open="onClose"
  >
    <template #body>
      <UForm
        class="w-full space-y-4"
        loading-auto
        :schema="expenseSchemaDelete"
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
            Eliminar gasto
          </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>
