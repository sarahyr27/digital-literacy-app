<!-- Este componente debe estar presente al final de cada array "pages" dentor de curso, ya que muestra el resultado del test -->
<script>
import AnchorTagButton from './AnchorTagButton.vue'

export default {
  props: {
    areAnswersCorrect: Boolean,
  },
  components: {
    AnchorTagButton,
  },
  emits: ['toggle-modal', 'reset-test', 'reset-course'],
}
</script>

<template>
  <div>
    <div
      v-if="areAnswersCorrect"
      class="flex flex-col p-6 gap-4 items-center w-2/3 text-center mx-auto"
    >
      <h2 class="text-2xl md:text-3xl font-medium font-bold text-pink-500">¡Felicidades!</h2>
      <p class="text-lg md:text-xl">Has completado el curso con éxito.</p>
      <p class="text-lg md:text-xl">
        Si lo deseas, puedes volver a la página de cursos para empezar uno nuevo y seguir ampliando
        tus conocimientos.
      </p>
      <AnchorTagButton
        msg="ir a cursos"
        page="#/cursos"
        :variants="['dark', 'small']"
        @click="$emit('toggle-modal')"
      />
    </div>
    <div v-else class="flex flex-col p-6 gap-4 items-center w-2/3 text-center mx-auto">
      <h2 class="text-2xl md:text-3xl font-medium font-bold text-pink-500">Vuélvelo a intentar</h2>
      <p class="text-lg md:text-xl">
        Parece que necesitas repasar la información. Te recomendamos que vuelvas a empezar el curso
        desde el comienzo o, si lo prefieres, puedes simplemente repetir el test.
      </p>
      <div class="flex gap-4">
        <button
          class="bg-blue-900 text-white hover:bg-blue-950 text-base sm:text-lg px-2 py-1 cursor-pointer rounded-xl text-center flex items-center justify-center hover:scale-102 hover:transform transition shadow-md shadow-slate-800/50"
          @click="$emit('reset-course')"
        >
          Repetir curso
        </button>
        <button
          class="bg-blue-900 text-white hover:bg-blue-950 text-base sm:text-lg px-2 py-1 cursor-pointer rounded-xl text-center flex items-center justify-center hover:scale-102 hover:transform transition shadow-md shadow-slate-800/50"
          @click="$emit('reset-test')"
        >
          Repetir test
        </button>
      </div>
    </div>
  </div>
</template>
