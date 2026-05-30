<script setup lang="ts">
import * as z from 'zod'
import type { DropdownMenuItem, FormSubmitEvent } from '@nuxt/ui'

interface Props {
  budget: Budget
}
const props = defineProps<Props>()

const { update } = useBudget()
const { refresh } = await useBudgets()
const toast = useToast()
const openModal = ref(false)
const state = reactive<Partial<BudgetSchema>>({
  name: props.budget.name,
  amount: +props.budget.amount
})

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Ver presupuesto',
    to: `/dashboard/budget/${props.budget.id}`
  },
  {
    label: 'Editar presupuesto',
    class: 'cursor-pointer',
    onSelect: () => (openModal.value = true)
  },
  {
    label: 'Eliminar presupuesto',
    to: '#',
    color: 'error'
  }
])

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
  const isSuccess = await update(props.budget.id, name, amount)

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
  openModal.value = false
  state.name = undefined
  state.amount = undefined
  await refresh()
}
</script>
<template>
  <UPageCard variant="subtle" :ui="{ body: 'w-full' }">
    <template #title>
      <div class="flex items-center justify-between">
        <ULink :to="`/dashboard/budget/${budget.id}`" class="text-primary font-semibold">
          {{ budget.name }}
        </ULink>
        <UDropdownMenu
          :items="items"
          :content="{ align: 'end', side: 'bottom', sideOffset: 4 }"
          :ui="{ content: 'w-56 max-w-56' }"
        >
          <UButton
            class="flex cursor-pointer items-start justify-end"
            variant="link"
            color="neutral"
            size="lg"
            icon="i-lucide-ellipsis-vertical"
          />
        </UDropdownMenu>
      </div>
    </template>
    <template #description>
      <p class="text-secondary font-medium">{{ formatCurrency(budget.amount) }}</p>
      <span class="text-xs">Ultima actualización: {{ dayMonthYearFormat(budget.updatedAt) }}</span>
    </template>
  </UPageCard>
  <UModal
    v-model:open="openModal"
    title="Editar presupuesto"
    description="Actualiza el nombre o la cantidad de tu presupuesto"
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
        <UButton block class="cursor-pointer" type="submit">Actualizar presupuesto</UButton>
      </UForm>
    </template>
  </UModal>
</template>
