<!-- Este componente se utiliza cuando, durante el curso, se quiere renderizar texto, opcionalmente con alguna imagen -->
<script>
export default {
  props: {
    page: Object,
  },
}
</script>

<template>
  <div class="flex flex-col lg:flex-row px-6 pb-4 gap-8">
    <p
      v-html="page.textContent"
      class="text-xl md:text-2xl justify-self-center lg:justify-self-start flex-1 text-justify"
    ></p>
    <div class="flex flex-1">
      <figure class="h-9/10 w-5/6 justify-self-center lg:justify-self-end h-full w-full">
        <img
          :src="page.imgSource"
          :alt="page.imgAlternativeText"
          class="rounded-xl shadow-md shadow-slate-800/50 h-full w-full object-cover"
        />
      </figure>
    </div>
  </div>
</template>
