<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const toast = useToast()
const route = useRoute()
const id = route.params.id as string
const { createExpense } = await useExpense()
const { expenses, refresh } = await useExpenses(id)

const openModalExpense = ref(false)
const stateExpense = reactive<Partial<ExpenseSchema>>({
  name: undefined,
  amount: undefined
})

const { data: budget } = await useFetch(`/api/budget/${id}`)
useSeoMeta({
  title: `CashTrackr - ${budget.value?.name}`
})

if (!budget.value)
  throw createError({ statusCode: 404, statusMessage: 'Página no encontrada', fatal: true })

const expenseSchema = z.object({
  name: z
    .string({ error: 'El nombre es obligatorio' })
    .min(3, { error: 'El nombre debe tener al menos 3 caracteres' }),
  amount: z
    .number({ error: 'La cantidad es obligatoria' })
    .min(0, { error: 'La cantidad debe ser mayor o igual a 0' })
})

type ExpenseSchema = z.output<typeof expenseSchema>

async function onSubmit(payload: FormSubmitEvent<ExpenseSchema>) {
  const { name, amount } = payload.data
  const isSuccess = await createExpense(name, amount, id)
  if (!isSuccess) {
    toast.add({
      color: 'error',
      title: 'Error al crear gasto',
      description: 'Verifica tus datos e intenta nuevamente.'
    })
    return
  }
  toast.add({
    color: 'success',
    title: 'Gasto creado correctamente',
    description: 'Puedes verlo en el panel de gastos.'
  })
  openModalExpense.value = false
  stateExpense.name = undefined
  stateExpense.amount = undefined
  await refresh()
}
</script>

<template>
  <UPageHeader
    :title="budget?.name"
    description="Agrega y administra los gastos de este presupuesto"
    headline="Presupuesto"
    :ui="{
      description: 'hidden lg:block'
    }"
  >
    <template #links>
      <UButton
        class="cursor-pointer"
        icon="i-lucide-plus"
        label="Crear gasto"
        color="secondary"
        variant="subtle"
        @click="openModalExpense = true"
      />
    </template>
  </UPageHeader>

  <!-- Mostrar gastos -->
  <ExpensesGrid v-if="expenses.length > 0" :expenses="expenses" />
  <p v-else class="text-muted mt-10">No hay gastos aun, comienza creando uno.</p>

  <UModal
    v-model:open="openModalExpense"
    title="Nuevo gasto"
    description="Ingresa los datos de tu nuevo gasto"
    :close="{ class: 'cursor-pointer' }"
  >
    <template #body>
      <UForm
        class="w-full space-y-4"
        loading-auto
        :schema="expenseSchema"
        :state="stateExpense"
        @submit="onSubmit"
      >
        <UFormField label="Nombre" name="name">
          <UInput v-model="stateExpense.name" class="w-full" placeholder="Nombre del gasto" />
        </UFormField>
        <UFormField label="Cantidad" name="amount">
          <UInput v-model="stateExpense.amount" class="w-full" type="number" placeholder="0.00" />
        </UFormField>
        <UButton block class="cursor-pointer" type="submit">Crear gasto</UButton>
      </UForm>
    </template>
  </UModal>
</template>
