<script setup lang="ts">
const COLOR_MAP: Record<string, string> = {
  primary: 'var(--ui-primary)',
  secondary: 'var(--ui-secondary)',
  success: 'var(--ui-success)',
  warning: 'var(--ui-warning)',
  error: 'var(--ui-error)',
  info: 'var(--ui-info)',
  neutral: 'var(--ui-text-muted)'
}

interface Props {
  modelValue: number // 0–100
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
  showLabel?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 120,
  strokeWidth: 10,
  color: 'primary',
  trackColor: undefined,
  showLabel: true,
  label: undefined
})

const center = computed(() => props.size / 2)
const radius = computed(() => center.value - props.strokeWidth / 2 - 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(
  () =>
    circumference.value - (Math.min(Math.max(props.modelValue, 0), 100) / 100) * circumference.value
)
const fontSize = computed(() => Math.max(11, Math.round(props.size * 0.17)))
const resolvedColor = computed(() => COLOR_MAP[props.color] ?? props.color)
</script>

<template>
  <div
    :style="{ width: `${size}px`, height: `${size}px` }"
    class="relative inline-flex items-center justify-center"
  >
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" class="-rotate-90">
      <!-- Track -->
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        class="text-(--ui-border-accented)"
        stroke="currentColor"
        :stroke-width="strokeWidth"
      />
      <!-- Progress -->
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke="resolvedColor"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        class="transition-[stroke-dashoffset] duration-500 ease-out"
      />
    </svg>

    <!-- Label slot -->
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <slot>
        <span
          v-if="showLabel"
          class="font-medium"
          :style="{ fontSize: `${fontSize}px`, color: resolvedColor }"
        >
          {{ modelValue }}%
        </span>
        <span
          v-if="label"
          class="font-medium"
          :style="{ fontSize: `${Math.max(9, fontSize - 10)}px`, color: resolvedColor }"
        >
          {{ label }}
        </span>
      </slot>
    </div>
  </div>
</template>
