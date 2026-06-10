<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

interface Props {
  expense: IExpense
}
const props = defineProps<Props>()

const route = useRoute()
const idBudget = route.params.id as string
const { amountAvailable, refresh } = await useExpenses(idBudget)
const { updateExpense, deleteExpense } = await useExpense()

const toast = useToast()
const openModalEdit = ref(false)
const openModalDelete = ref(false)
const stateEdit = reactive<Partial<ExpenseSchemaEdit>>({
  name: props.expense.name,
  amount: +props.expense.amount
})

const expenseSchemaEdit = z.object({
  name: z
    .string({ error: 'El nombre es obligatorio' })
    .min(3, { error: 'El nombre debe tener al menos 3 caracteres' }),
  amount: z
    .number({ error: 'La cantidad es obligatoria' })
    .min(0, { error: 'La cantidad debe ser mayor o igual a 0' })
})

type ExpenseSchemaEdit = z.output<typeof expenseSchemaEdit>

async function onSubmitEdit(payload: FormSubmitEvent<ExpenseSchemaEdit>) {
  const { name, amount } = payload.data

  if (amount > +props.expense.amount && amountAvailable.value === 0) {
    toast.add({
      color: 'error',
      title: 'Sin presupuesto disponible',
      description: 'No tienes presupuesto disponible para actualizar este gasto'
    })
    return
  }

  if (amount > amountAvailable.value + Number(props.expense.amount)) {
    toast.add({
      color: 'error',
      title: 'Presupuesto insuficiente',
      description: `Estas superando el presupuesto disponible para actualizar este gasto`
    })
    return
  }

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

async function onSubmitDelete() {
  await deleteExpense(idBudget, props.expense.id)
  openModalDelete.value = false
  await refresh()
}

const onClose = () => {
  openModalDelete.value = false
}
</script>
<template>
  <UPageCard :title="expense.name" variant="subtle" :ui="{ title: 'text-primary' }">
    <template #description>
      <p class="text-secondary font-medium">{{ formatCurrency(expense.amount) }}</p>
      <span class="text-xs">Última actualización: {{ dayMonthYearFormat(expense.updatedAt) }}</span>
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
    description="Confirmar eliminación del gasto"
    :close="{ class: 'cursor-pointer' }"
    @update:open="onClose"
  >
    <template #body>
      <UForm class="w-full space-y-4" loading-auto @submit="onSubmitDelete">
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
