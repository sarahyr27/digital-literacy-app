<!-- Componente utilizado para la página principal de un curso -->
<script>
export default {
  props: {
    currentCourse: Object,
  },
  emits: ['toggle-modal'],
}
</script>

<template>
  <div v-if="currentCourse && currentCourse.imgSource" class="flex flex-col gap-6 text-slate-800">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="col-span-1 flex flex-col gap-4 items-center md:items-start text-center md:text-left"
      >
        <h1 class="text-3xl font-bold">{{ currentCourse.title }}</h1>
        <p class="text-xl">{{ currentCourse.description }}</p>
        <button
          class="bg-blue-900 text-white hover:bg-blue-950 text-lg sm:text-xl px-6 py-2 w-2/3 cursor-pointer rounded-xl hover:scale-102 hover:transform transition shadow-md shadow-slate-800/50"
          @click="$emit('toggle-modal')"
        >
          Empezar curso
        </button>
      </div>
      <figure class="col-span-2 flex justify-center md:justify-end">
        <img
          class="mask-radial-at-center rounded-xl h-9/10 w-5/6 object-cover"
          :src="currentCourse.imgSource"
          :alt="currentCourse.imgAlternativeText"
        />
      </figure>
    </div>
  </div>
</template>
