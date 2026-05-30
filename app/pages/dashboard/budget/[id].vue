<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string
const { data: budget } = await useFetch(`/api/budget/${id}`)
</script>

<template>
  <h2>{{ budget?.name }}</h2>
</template>
