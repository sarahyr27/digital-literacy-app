<!-- Este componente se utiliza cuando, durante el curso, se quiere renderizar texto, opcionalmente con alguna imagen -->
<script>
export default {
  props: {
    page: Object,
  },
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 p-6 gap-4">
    <p
      v-html="page.textContent"
      class="text-base md:text-lg justify-self-center md:justify-self-start"
    ></p>
    <figure class="h-9/10 w-5/6 justify-self-center md:justify-self-end">
      <img :src="page.imgSource" :alt="page.imgAlternativeText" class="rounded-xl" />
    </figure>
  </div>
</template>
