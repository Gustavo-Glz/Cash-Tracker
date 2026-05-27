<template>
  <UContainer>
    <div class="min-h-screen flex items-center justify-center">
      <div
        class="bg-muted grid grid-rows-4 lg:grid-rows-1 lg:grid-cols-2 place-items-center gap-10 w-full lg:max-w-5xl shadow-lg rounded-lg"
      >
        <div
          class="dark:bg-slate-950 bg-slate-800 w-full rounded-tl-lg rounded-tr-lg lg:rounded-tr-none lg:rounded-br-none lg:rounded-bl-lg lg:rounded-tl-lg place-self-start lg:place-self-auto"
        >
          <IconLogoCash class="mx-auto" />
          <NuxtImg
            class="object-cover rounded-bl-lg hidden lg:block"
            src="/grafico.svg"
            alt="grafico"
          />
        </div>
        <div class="row-span-3 lg:row-span-1 pb-10 lg:pb-0">
          <slot />
        </div>
      </div>
    </div>
  </UContainer>
</template>
