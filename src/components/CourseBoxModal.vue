<!-- Componente tipo modal para los test, cuando se abre sabré que curso recibirá por la url en la que se encuentra. Esta
 información se maneja en App.vue y este componente la recibe como una propiedad -->
<script>
import CourseTheory from './CourseTheory.vue'
import CourseResult from './CourseResult.vue'
import CourseTest from './CourseTest.vue'
import CourseSimulation from './CourseSimulation.vue'

export default {
  data() {
    return {
      /* Declaramos este estado para guardar la respuesta recibida desde CourseTest.vue, lo hago así porque
      la acción que desencadenará el almacenamiento o borrado de datos en el array inputAnswers es el click
      en los botones de paginación */
      receivedAnswer: null,
      // Este es el array principal, que enviaremos a App para evaluar las respuestas
      inputAnswers: [],
      simulationCompleted: false,
    }
  },
  components: {
    CourseTheory,
    CourseTest,
    CourseResult,
    CourseSimulation,
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
    updateSimulationCompletionStatus(value) {
      this.simulationCompleted = value
    },
  },
  computed: {
    testStartIndex() {
      return this.currentCourse.pages.findIndex((page) => page.type === 'test')
    },
    currentPageComponent() {
      const page = this.currentCourse.pages[this.currentPage]
      const components = {
        theory: CourseTheory,
        test: CourseTest,
        simulationFirst: CourseSimulation,
        simulation: CourseSimulation,
        simulationLast: CourseSimulation,
        result: CourseResult,
      }
      const component = components[page.type]

      if (!component) {
        throw new Error(`Unsupported course page type: ${page.type}`)
      }

      return component
    },
    currentCourseSection() {
      const page = this.currentCourse.pages[this.currentPage]
      const types = {
        theory: 'Teoría',
        test: 'Prueba',
        simulationFirst: 'Simulación',
        simulation: 'Simulación',
        simulationLast: 'Simulación',
        result: 'Resultado',
      }
      const courseSection = types[page.type]

      if (!courseSection) {
        throw new Error(`Unsupported course section type: ${page.type}`)
      }

      return courseSection
    },
    pageType() {
      return this.currentCourse.pages[this.currentPage].type
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
        class="relative overflow-scroll bg-white rounded-xl shadow-md shadow-slate-800/50 w-9/10 h-9/10 p-8 flex flex-col justify-between gap-4"
      >
        <!-- Botón de cerrar -->
        <button
          class="absolute top-6 right-6 md:text-2xl cursor-pointer bg-pink-500/50 rounded-xl p-2 px-4 font-bold flex items-center gap-1 shadow-md shadow-slate-800/50 hover:bg-pink-600/50 hover:text-white hover:scale-105 transition"
          @click="$emit('toggle-modal')"
        >
          Cerrar <span class="text-2xl">&#10799;</span>
        </button>
        <!-- Título curso -->
        <header class="text-2xl md:text-3xl text-slate-900 font-bold text-left max-w-3/4 pl-6">
          <h1>Curso: {{ currentCourse.title }}</h1>
          <h2 class="text-xl md:text-2xl text-slate-700 font-semibold text-left mt-2">
            Sección - {{ currentCourseSection }}
          </h2>
        </header>
        <!-- Contenido de la página -->
        <div class="w-[100%] h-[72%] overflow-y-scroll flex justify-center align-center">
          <section>
            <component
              :is="currentPageComponent"
              :key="currentPage"
              :page="currentCourse.pages[currentPage]"
              :areAnswersCorrect="areAnswersCorrect"
              @update-received-answer="updateReceivedAnswer"
              @is-simulation-completed="updateSimulationCompletionStatus"
              @toggle-modal="$emit('toggle-modal')"
              @reset-test="$emit('reset-test')"
              @reset-course="$emit('reset-course')"
              @next-page="$emit('next-page')"
            />
          </section>
        </div>

        <!-- Botones de paginación -->
        <div class="flex justify-between w-full">
          <button
            id="prev-page"
            :disabled="firstPage"
            class="text-lg md:text-2xl cursor-pointer self-end bg-pink-500/50 rounded-xl p-2 px-4 font-bold flex items-center gap-1 shadow-md shadow-slate-800/50 hover:bg-pink-600/50 hover:text-white hover:scale-105 transition disabled:bg-slate-800/50 disabled:text-white disabled:cursor-not-allowed disabled:hover:scale-100"
            @click="($emit('prev-page'), deleteReceivedAnswer())"
          >
            <span class="text-xl">🡨</span> Anterior
          </button>
          <button
            id="next-page"
            :disabled="lastPage || (pageType === 'simulation' && !simulationCompleted)"
            class="text-lg md:text-2xl cursor-pointer self-end bg-pink-500/50 rounded-xl p-2 px-4 font-bold flex items-center gap-1 shadow-md shadow-slate-800/50 hover:bg-pink-600/50 hover:text-white hover:scale-105 transition disabled:bg-slate-800/50 disabled:text-white disabled:cursor-not-allowed disabled:hover:scale-100"
            @click="(saveReceivedAnswer(), $emit('next-page', inputAnswers))"
          >
            Siguiente <span class="text-2xl">🡪</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
