<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const toast = useToast()
const { createBudget } = useBudget()
const { budgets, refresh } = await useBudgets()
const openModal = ref(false)
const state = reactive<Partial<BudgetSchema>>({
  name: undefined,
  amount: undefined
})

const budgetSchema = z.object({
  name: z
    .string({ error: 'El nombre es obligatorio' })
    .min(3, { error: 'El nombre debe tener al menos 3 caracteres' }),
  amount: z
    .number({ error: 'La cantidad es obligatoria' })
    .min(0, { error: 'La cantidad debe ser mayor o igual a 0' })
})

type BudgetSchema = z.output<typeof budgetSchema>

async function onSubmit(payload: FormSubmitEvent<BudgetSchema>) {
  const { name, amount } = payload.data
  const isSuccess = await createBudget(name, amount)

  if (!isSuccess) {
    toast.add({
      color: 'error',
      title: 'Error',
      description: 'No se pudo crear el presupuesto.'
    })
    return
  }
  toast.add({
    color: 'success',
    title: 'Presupuesto creado correctamente',
    description: 'Puedes verlo en la lista de presupuestos.'
  })
  openModal.value = false
  state.name = undefined
  state.amount = undefined
  await refresh()
}
</script>

<template>
  <UPageHeader
    title="Mis presupuestos"
    description="Organiza tus presupuestos y controla tus finanzas"
    headline="Finanzas"
    :ui="{
      description: 'hidden lg:block'
    }"
  >
    <template #links>
      <UButton
        class="cursor-pointer"
        icon="i-lucide-plus"
        label="Crear presupuesto"
        color="secondary"
        variant="subtle"
        @click="openModal = true"
      />
    </template>
  </UPageHeader>

  <!-- Mostrar presupuestos -->
  <BudgetsGrid v-if="budgets.length > 0" :budgets="budgets" />
  <p v-else class="text-muted mt-10">No hay presupuestos aún, comienza creando uno.</p>

  <!-- Modal para creacion del presupuesto -->
  <UModal
    v-model:open="openModal"
    title="Nuevo presupuesto"
    description="Ingresa los datos de tu nuevo presupuesto."
    :close="{ class: 'cursor-pointer' }"
  >
    <template #body>
      <UForm
        class="w-full space-y-4"
        loading-auto
        :schema="budgetSchema"
        :state="state"
        @submit="onSubmit"
      >
        <UFormField label="Nombre" name="name">
          <UInput v-model="state.name" class="w-full" placeholder="Nombre del presupuesto" />
        </UFormField>
        <UFormField label="Cantidad" name="amount">
          <UInput v-model="state.amount" class="w-full" type="number" placeholder="0.00" />
        </UFormField>
        <UButton block class="cursor-pointer" type="submit">Crear presupuesto</UButton>
      </UForm>
    </template>
  </UModal>
</template>
