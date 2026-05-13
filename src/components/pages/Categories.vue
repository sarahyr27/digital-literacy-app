<!-- Componente para acceder a las categorías principales de los cursos -->
<script>
import Box from '@/components/Box.vue'

export default {
  data() {
    return {
      // Controla los colores de las cajas de categorías, en una futura versión habría que hacer esta utilidad más escalable. Utiliza los nombres de los estilos
      // definidos en el componente Box.vue
      boxVariants: ['limeFull', 'standardFull', 'orangeFull', 'pinkFull'],
    }
  },
  components: {
    Box,
  },
  props: {
    content: Object,
  },
}
</script>

<template>
  <div class="flex flex-col gap-6 text-slate-800">
    <h1 class="text-3xl font-bold">Cursos</h1>
    <p class="text-xl">
      Aquí puedes ver los diferentes temas sobre los que puedes aprender. Selecciona un recuadro
      para ver los cursos disponibles dentro de esa categoría.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-2 gap-6">
      <Box
        v-for="(element, index) in content"
        :key="element.category"
        :variant="boxVariants[index]"
        class="hover:scale-105 transition"
      >
        <template #content>
          <a
            :href="element.url"
            class="block w-full h-full no-underline text-inherit flex flex-col gap-4"
          >
            <h2 class="text-2xl font-bold">{{ element.category }}</h2>
            <p class="text-lg">{{ element.description }}</p>
          </a>
        </template>
      </Box>
    </div>
  </div>
</template>
