<!-- Componente utilizado para la página principal de un curso -->
<script>
export default {
  props: {
    content: {
      type: Array,
      required: true,
    },
  },
  computed: {
    currentCourse() {
      return (
        this.content
          .flatMap((category) =>
            category.subcategories
              ? category.subcategories.flatMap((subcategory) => subcategory.courses ?? [])
              : (category.courses ?? []),
          )
          .find((course) => course.id === this.$route.params.curso) ?? null
      )
    },
  },
  emits: ['find-current-course', 'toggle-modal'],
}
</script>

<template>
  <div
    v-if="currentCourse && currentCourse.imgSource"
    class="flex flex-col justify-center lg:flex-row lg:justify-start gap-6 text-slate-800"
  >
    <figure
      class="col-span-2 flex justify-center lg:justify-start md:w-4/5 w-5/6 self-center lg:self-start"
    >
      <img
        class="mask-radial-at-center rounded-xl object-cover shadow-md shadow-slate-800/50"
        :src="currentCourse.imgSource"
        :alt="currentCourse.imgAlternativeText"
      />
    </figure>
    <div
      class="col-span-1 flex flex-col gap-4 items-center lg:items-start text-center lg:text-left"
    >
      <h1 class="text-4xl font-bold">Curso</h1>
      <h2 class="text-3xl font-bold">{{ currentCourse.title }}</h2>
      <p class="text-2xl">{{ currentCourse.description }}</p>
      <button
        class="bg-blue-900 text-white hover:bg-blue-950 text-2xl sm:text-xl px-6 py-2 w-2/3 cursor-pointer rounded-xl hover:scale-102 hover:transform transition shadow-md shadow-slate-800/50 mt-4 self-center"
        @click="($emit('find-current-course', currentCourse), $emit('toggle-modal'))"
      >
        Empezar curso
      </button>
    </div>
  </div>
  <div v-else>
    {{ currentCourse }}
  </div>
</template>
