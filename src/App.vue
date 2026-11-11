<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import CourseBoxModal from './components/CourseBoxModal.vue'
import courses from './data/courses.json'

export default {
  components: {
    Header,
    Footer,
    CourseBoxModal,
  },
  computed: {
    firstPage() {
      return this.currentPage == 0
    },
    lastPage() {
      return this.currentPage == this.coursePages - 1
    },
  },
  // Arrglarlo, ya no funciona
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
      window.scrollTo(0, 0)
    })
  },
  methods: {
    // Activa o desactiva el modal
    toggleModal() {
      this.modalActive = !this.modalActive
      this.resetCourse()
    },
    // Encontrar el curso actual
    findCurrentCourse(course) {
      this.currentCourse = course
      this.currentPage = 0
      this.coursePages = this.currentCourse.pages.length
    },
    // Resetar curso actual
    resetCurrentCourse() {
      this.currentCourse = null
      this.currentPage = null
      this.coursePages = null
      this.userAnswers = []
    },
    // Hace que la página del curso actual  vuelva a ser la primera, y resetamos las respuestas guardadas
    resetCourse() {
      this.currentPage = 0
      this.userAnswers = []
    },
    // Hace que la página actual sea la de la primera pregunta del test, y resetamos las respuestas guardadas
    resetTest() {
      this.currentPage = this.currentCourse.pages.findIndex((page) => page.type === 'test')
      this.userAnswers = []
    },
    // Manejar paginación dentro del modal
    prevPage() {
      if (this.currentPage != 0) this.currentPage--
    },
    nextPage(data) {
      if (this.currentPage < this.coursePages - 1) this.currentPage++
      if (this.currentPage == this.coursePages - 1) {
        this.userAnswers = data.flat()
        this.areAnswersCorrect = this.checkAnswers()
      }
    },
    // Rellenar el array de preguntas contestadas
    saveAnswer(event) {
      this.userAnswers.push(event)
    },
    // Verificar si hay respuestas y, si las hay, si todas son correctas
    checkAnswers() {
      if (this.userAnswers.length < 1 || this.userAnswers.some((el) => !el)) {
        return false
      } else if (this.userAnswers.length > 0 && this.userAnswers.every((el) => el)) {
        return true
      }
    },
  },
  watch: {
    // Impide que se pueda hacer scroll en la página principal cuando el modal está abierto
    modalActive(newVal) {
      document.body.style.overflow = newVal ? 'hidden' : ''
    },
    //Resetea el curso actual cuando no estemo en la página de un curso
  },
  data() {
    return {
      // ********************* CONTROL DE ESTADO ******************************
      // Control del modal (contenedor de curso)
      modalActive: false,
      // Control del curso actual y su paginación
      currentCourse: null,
      coursePages: null,
      currentPage: null,
      // Recoge las respuestas del usuario para evaluar si ha respondido algo, o si ha respondido todas las preguntas correctamente
      userAnswers: [],
      areAnswersCorrect: null,
      content: courses,
    }
  },
}
</script>

<template>
  <header><Header /></header>
  <main class="my-16 mx-12 sm:mx-26">
    <RouterView
      :content="content"
      @toggle-modal="toggleModal"
      @find-current-course="findCurrentCourse"
    />
  </main>
  <CourseBoxModal
    v-if="this.modalActive"
    :currentCourse="currentCourse"
    :currentPage="currentPage"
    :coursePages="coursePages"
    :firstPage="firstPage"
    :lastPage="lastPage"
    :areAnswersCorrect="areAnswersCorrect"
    @toggle-modal="toggleModal"
    @prev-page="prevPage"
    @next-page="nextPage"
    @reset-test="resetTest"
    @reset-course="resetCourse"
  />
  <footer><Footer /></footer>
</template>

<style scoped></style>
