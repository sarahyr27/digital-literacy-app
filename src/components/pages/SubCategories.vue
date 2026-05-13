<!-- Componente que renderiza los cursos que se encuentren dentro de la categoría principal seleccionada. A partir de 
 este componente, se puede acceder a los cursos dentro de dicha sub-categoría -->
<script>
import AnchorTagButton from '@/components/AnchorTagButton.vue'

export default {
  data() {
    return {
      colorMap: {
        pink: 'decoration-pink-500/50',
        lime: 'decoration-lime-500/50',
        orange: 'decoration-orange-500/50',
      },
      // Es
      colors: ['pink', 'lime', 'orange'],
    }
  },
  components: {
    AnchorTagButton,
  },
  props: {
    content: Object,
    currentPath: String,
  },
  computed: {
    // Devuelve el objeto que contenga el url en el que nos encontramos
    currentCategory() {
      return this.content.find((element) => element.url === this.currentPath)
    },
  },
  emits: ['find-current-course'],
}
</script>

<template>
  <div class="flex flex-col gap-6 text-slate-800">
    <h1 class="text-3xl font-bold">Cursos</h1>
    <h2 class="text-2xl font-bold">{{ currentCategory.category }}</h2>
    <p class="text-xl">
      Estás dentro de la categoría de cursos de {{ currentCategory.category }}. Selecciona un
      recuadro para entrar en el curso.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Category: Móviles y tablets -->
      <div
        v-for="(category, index) in currentCategory.subcategories"
        class="flex flex-col gap-6 mt-8"
      >
        <h3
          :class="['text-center font-bold text-xl underline decoration-4', colorMap[colors[index]]]"
        >
          {{ category.name }}
        </h3>
        <div class="flex overflow-x-scroll p-2 md:p-0 md:overflow-visible md:flex-col gap-6">
          <AnchorTagButton
            v-for="course in category.courses"
            :msg="course.title"
            :page="course.url"
            :variants="[`${colors[index]}Light`]"
            class="py-6 min-w-48 h-9/10"
            @click="$emit('find-current-course', course)"
          >
            <a :href="course.url" class="block w-full h-full no-underline text-inherit"></a
          ></AnchorTagButton>
        </div>
      </div>
    </div>
  </div>
</template>
