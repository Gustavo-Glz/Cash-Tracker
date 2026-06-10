<template>
  <UContainer>
    <div class="flex min-h-screen items-center justify-center">
      <div
        class="bg-muted grid w-full grid-rows-4 place-items-center gap-10 rounded-lg shadow-lg lg:max-w-5xl lg:grid-cols-2 lg:grid-rows-1"
      >
        <div
          class="w-full place-self-start rounded-tl-lg rounded-tr-lg bg-slate-800 lg:place-self-auto lg:rounded-tl-lg lg:rounded-tr-none lg:rounded-br-none lg:rounded-bl-lg dark:bg-slate-950"
        >
          <NuxtLink to="/">
            <IconLogoCash class="mx-auto h-16 lg:mt-4" />
          </NuxtLink>
          <NuxtImg
            class="hidden rounded-bl-lg object-cover lg:block"
            src="/grafico.svg"
            alt="grafico"
          />
        </div>
        <div class="row-span-3 pb-10 lg:row-span-1 lg:pb-0">
          <slot />
        </div>
      </div>
    </div>
  </UContainer>
</template>
