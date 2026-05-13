<!-- Componente tipo modal para los test, cuando se abre sabré que curso recibirá por la url en la que se encuentra. Esta
 información se maneja en App.vue y este componente la recibe como una propiedad -->
<script>
import CourseContent from './CourseContent.vue'
import CourseResult from './CourseResult.vue'
import CourseTest from './CourseTest.vue'

export default {
  data() {
    return {
      /* Declaramos este estado para guardar la respuesta recibida desde CourseTest.vue, lo hago así porque
      la acción que desencadenará el almacenamiento o borrado de datos en el array inputAnswers es el click
      en los botones de paginación */
      receivedAnswer: null,
      // Este es el array principal, que enviaremos a App para evaluar las respuestas
      inputAnswers: [],
    }
  },
  components: {
    CourseContent,
    CourseTest,
    CourseResult,
  },
  props: {
    currentCourse: Object,
    coursePages: Number,
    currentPage: Number,
    firstPage: Boolean,
    lastPage: Boolean,
    areAnswersCorrect: Boolean,
  },
  emits: ['toggle-modal', 'prev-page', 'next-page', 'reset-test', 'reset-course'],
  methods: {
    updateReceivedAnswer(value) {
      this.receivedAnswer = value
    },
    saveReceivedAnswer() {
      if (this.receivedAnswer != null) {
        this.inputAnswers.push(this.receivedAnswer)
        this.receivedAnswer = null
      }
    },
    deleteReceivedAnswer() {
      this.inputAnswers.pop()
    },
  },
  computed: {
    testStartIndex() {
      return this.currentCourse.pages.findIndex((pageObj) => pageObj.component === CourseTest)
    },
  },
  watch: {
    currentPage(newVal) {
      if (newVal <= this.testStartIndex) {
        this.inputAnswers = []
      }
    },
  },
}
</script>

<template>
  <Teleport to="body">
    <!-- Contenedor del modal -->
    <div
      class="fixed top-0 right-0 left-0 bottom-0 z-30 bg-white/30 backdrop-blur-xs flex items-center justify-center h-dvh w-screen"
    >
      <!-- Caja curso -->
      <div
        class="relative overflow-scroll bg-white rounded-xl shadow-md shadow-slate-800/50 w-9/10 h-9/10 p-6 flex flex-col"
      >
        <!-- Botón de cerrar -->
        <button
          class="absolute right-6 text-sm md:text-base cursor-pointer self-end bg-pink-500/50 rounded-xl px-2 font-bold flex items-center gap-1 shadow-md shadow-slate-800/50 hover:bg-pink-600/50 hover:text-white hover:scale-105 transition"
          @click="$emit('toggle-modal')"
        >
          Cerrar <span class="text-2xl">&#10799;</span>
        </button>
        <!-- Título curso -->
        <header
          class="text-left md:text-center text-2xl md:text-3xl text-slate-900 font-bold self-start md:self-center max-w-1/2 md:max-width-4/5"
        >
          <h1>{{ currentCourse.title }}</h1>
        </header>
        <!-- Espacio para el uso de otro componente, maneja la paginación y contenido de la página -->
        <section class="flex items-center justify-center h-full">
          <component
            :is="currentCourse.pages[currentPage].component"
            :key="currentCourse.pages[currentPage].title"
            :page="currentCourse.pages[currentPage]"
            :areAnswersCorrect="areAnswersCorrect"
            @update-received-answer="updateReceivedAnswer"
            @toggle-modal="$emit('toggle-modal')"
            @reset-test="$emit('reset-test')"
            @reset-course="$emit('reset-course')"
          />
        </section>
        <!-- Botones de paginación -->
        <div class="flex justify-between w-full">
          <button
            id="prev-page"
            :disabled="firstPage"
            class="text-sm md:text-base cursor-pointer self-end bg-pink-500/50 rounded-xl px-2 font-bold flex items-center gap-1 shadow-md shadow-slate-800/50 hover:bg-pink-600/50 hover:text-white hover:scale-105 transition disabled:bg-slate-800/50 disabled:text-white disabled:cursor-not-allowed disabled:hover:scale-100"
            @click="($emit('prev-page'), deleteReceivedAnswer())"
          >
            <span class="text-xl">🡨</span> Anterior
          </button>
          <button
            id="next-page"
            :disabled="lastPage"
            class="text-sm md:text-base cursor-pointer self-end bg-pink-500/50 rounded-xl px-2 font-bold flex items-center gap-1 shadow-md shadow-slate-800/50 hover:bg-pink-600/50 hover:text-white hover:scale-105 transition disabled:bg-slate-800/50 disabled:text-white disabled:cursor-not-allowed disabled:hover:scale-100"
            @click="(saveReceivedAnswer(), $emit('next-page', inputAnswers))"
          >
            Siguiente <span class="text-2xl">🡪</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
