<script>
import { markRaw } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Home from './components/pages/Home.vue'
import Categories from './components/pages/Categories.vue'
import SubCategories from './components/pages/SubCategories.vue'
import CourseMainPage from './components/pages/CourseMainPage.vue'
import CourseBoxModal from './components/CourseBoxModal.vue'
import CourseContent from './components/CourseContent.vue'
import CourseTest from './components/CourseTest.vue'
import CourseResult from './components/CourseResult.vue'

const routes = {
  '/': Home,
  '/cursos': Categories,
  '/cursos/alfabetizacion_digital': SubCategories,
  '/cursos/alfabetizacion_digital/ordenadores/encendido_y_apagado': CourseMainPage,
  '/cursos/alfabetizacion_digital/ordenadores/usar_el_raton': CourseMainPage,
}

export default {
  components: {
    Header,
    Footer,
    Home,
    Categories,
    SubCategories,
    CourseMainPage,
    CourseBoxModal,
    CourseContent,
    CourseTest,
    CourseResult,
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/']
    },
    firstPage() {
      return this.currentPage == 0
    },
    lastPage() {
      return this.currentPage == this.coursePages - 1
    },
  },
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
    // Hace que la página del curso acutal vuelva a ser la primera, y resetamos las respuestas guardadas
    resetCourse() {
      this.currentPage = 0
      this.userAnswers = []
    },
    // Hace que la página actual sea la de la primera pregunta del test, y resetamos las respuestas guardadas
    resetTest() {
      this.currentPage = this.currentCourse.pages.findIndex(
        (pageObj) => pageObj.component === CourseTest,
      )
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
      // Trabaja junto con la propiedad computada currentView, la constante routes y el eventListener en el window para
      // hacer posible el enrutamiento (navegación entre "páginas" o vistas)
      currentPath: window.location.hash,
      // Control del modal (contenedor de curso)
      modalActive: false,
      // Control del curso actual y su paginación
      currentCourse: null,
      coursePages: null,
      currentPage: null,
      // Recoge las respuestas del usuario para evaluar si ha respondido algo, o si ha respondido todas las preguntas correctamente
      userAnswers: [],
      areAnswersCorrect: null,
      // ********************** DATOS CURSOS *********************************
      /* El contenido es un array de objetos, donde cada elemento es una categoría de curso, con información de sus sub-categorías
      los cursos dentro de cada sub-categoría, y la información dentro de dichos cursos */
      content: [
        {
          category: 'Alfabetización Digital',
          description: 'Aprende a sentirte cómodo usando tu móvil, tablet u ordenador',
          url: '#/cursos/alfabetizacion_digital',
          subcategories: [
            {
              name: 'Ordenadores',
              courses: [
                {
                  title: 'Encendido y apagado',
                  description: 'En este curso podrás aprender cómo encender y apagar tu ordenador.',
                  imgSource: 'images/img4.webp',
                  imgAlternativeText: 'ordenador de mesa',
                  url: '#/cursos/alfabetizacion_digital/ordenadores/encendido_y_apagado',
                  pages: [
                    {
                      component: markRaw(CourseContent),
                      textContent:
                        'Apagar el ordenador correctamente no solo es una buena práctica, sino también algo esencial para garantizar un buen rendimiento y evitar causarle daños al sistema. En este curso, aprenderás cómo apagar tu ordenador de la manera correcta, garantizando un apagado completo y eficiente.',
                      imgSource: 'images/img4.webp',
                      imgAlternativeText: 'ordenador de mesa',
                    },
                    {
                      component: markRaw(CourseContent),
                      textContent:
                        'Para encender el ordenador correctamente, primero asegúrate de que esté conectado a la corriente. Después, localiza el botón de encendido, normalmente identificado con un símbolo circular con una línea vertical. Presiona el botón una sola vez y espera unos segundos mientras el sistema inicia. Durante el encendido, es normal que la pantalla tarde un poco en mostrar información. Evita presionar varias veces el botón, ya que esto puede causar errores o impedir que el ordenador arranque correctamente.',
                      imgSource: 'images/img4.webp',
                      imgAlternativeText: 'ordenador de mesa',
                    },
                    {
                      component: markRaw(CourseContent),
                      textContent:
                        'Para apagar el ordenador de forma segura, primero guarda cualquier documento o trabajo que tengas abierto. Después, busca el menú de inicio en la parte inferior de la pantalla y selecciona la opción “Apagar”. El ordenador comenzará el proceso de cierre automáticamente. Espera unos segundos hasta que la pantalla se apague por completo antes de desconectar el equipo de la corriente. Apagar el ordenador correctamente ayuda a proteger tus archivos y mantener el sistema funcionando correctamente.',
                      imgSource: 'images/img4.webp',
                      imgAlternativeText: 'ordenador de mesa',
                    },
                    {
                      component: markRaw(CourseContent),
                      textContent:
                        'Aunque pueda parecer más rápido, no es recomendable apagar el ordenador manteniendo presionado el botón de encendido. Hacer esto puede provocar pérdida de información, daños en archivos o errores en el sistema. El botón de encendido solo debe utilizarse de esta manera cuando el ordenador no responde o se encuentra bloqueado. Siempre que sea posible, utiliza la opción “Apagar” desde el menú del sistema para realizar un cierre seguro y completo. <span class="font-bold text-pink-500">En la siguiente página encontrarás una pequeña prueba para comprobar lo aprendido en esta lección.</span>',
                      imgSource: 'images/img4.webp',
                      imgAlternativeText: 'ordenador de mesa',
                    },
                    {
                      component: markRaw(CourseTest),
                      title: 'como encender ordenador',
                      fullQuestion: '¿Qué debes hacer antes de encender el ordenador?',
                      options: [
                        {
                          id: 0,
                          answer: 'Desconectarlo de la corriente',
                          isCorrect: false,
                        },
                        {
                          id: 1,
                          answer: 'Asegurarte de que está conectado a la corriente',
                          isCorrect: true,
                        },
                        {
                          id: 2,
                          answer:
                            'Mantener presionado el botón de encendido durante varios segundos',
                          isCorrect: false,
                        },
                      ],
                    },
                    {
                      component: markRaw(CourseTest),
                      title: 'como apagar odenador',
                      fullQuestion: '¿Cuál es la forma correcta de apagar tu ordenador?',
                      options: [
                        { id: 0, answer: 'Desconectarlo de la corriente', isCorrect: false },
                        { id: 1, answer: 'Apretar el botón de apagado', isCorrect: false },
                        {
                          id: 2,
                          answer: "Seleccionar la opción \'Apagar\' desde inicio",
                          isCorrect: true,
                        },
                        {
                          id: 3,
                          answer:
                            'Si el botón de apagado está correctamente configurado, lo puedes apagar desde ahí',
                          isCorrect: true,
                        },
                      ],
                    },
                    {
                      component: markRaw(CourseTest),
                      title: 'boton de encendido',
                      fullQuestion:
                        '¿Cuándo se recomienda mantener presionado el botón de encendido?',
                      options: [
                        {
                          id: 0,
                          answer: 'Siempre que quieras apagar el ordenador rápidamente',
                          isCorrect: false,
                        },
                        {
                          id: 1,
                          answer: 'Cuando quieras ahorrar electricidad',
                          isCorrect: false,
                        },
                        {
                          id: 2,
                          answer: 'Solo cuando el ordenador no responde o está bloqueado',
                          isCorrect: true,
                        },
                        {
                          id: 3,
                          answer: 'Cada vez que termines de usar el ordenador',
                          isCorrect: false,
                        },
                      ],
                    },
                    {
                      component: markRaw(CourseResult),
                    },
                  ],
                },
                {
                  title: 'Usar el ratón',
                  description:
                    'En este curso aprenderás las funciones básicas del ratón y cómo utilizarlo para interactuar con tu ordenador.',
                  imgSource: 'images/img4.webp',
                  imgAlternativeText: 'ordenador de mesa',
                  url: '#/cursos/alfabetizacion_digital/ordenadores/usar_el_raton',
                  pages: [
                    {
                      component: markRaw(CourseContent),
                      textContent:
                        'El ratón es una de las herramientas principales para utilizar un ordenador. Permite mover el cursor por la pantalla y seleccionar diferentes elementos, como botones, carpetas o programas. Aprender a usar el ratón correctamente hará que navegar por el ordenador sea mucho más sencillo y cómodo.',
                      imgSource: 'images/img4.webp',
                      imgAlternativeText: 'ordenador de mesa',
                    },
                    {
                      component: markRaw(CourseContent),
                      textContent:
                        'Para mover el cursor, simplemente desliza el ratón suavemente sobre una superficie plana. El cursor se moverá en la misma dirección que el ratón. Intenta hacer movimientos lentos y controlados hasta sentirte cómodo manejándolo.',
                      imgSource: 'images/img4.webp',
                      imgAlternativeText: 'ordenador de mesa',
                    },
                    {
                      component: markRaw(CourseContent),
                      textContent:
                        'El botón izquierdo del ratón se utiliza para seleccionar elementos. Un solo clic sirve para seleccionar algo, mientras que un doble clic suele utilizarse para abrir carpetas o programas. Es importante hacer los clics de manera suave y rápida.',
                      imgSource: 'images/img4.webp',
                      imgAlternativeText: 'ordenador de mesa',
                    },
                    {
                      component: markRaw(CourseContent),
                      textContent:
                        'El botón derecho del ratón permite abrir menús con opciones adicionales. Cuando haces clic derecho sobre un elemento, aparecerá un pequeño menú con distintas acciones disponibles. También puedes usar la rueda central del ratón para desplazarte hacia arriba y abajo en páginas o documentos. <span class="font-bold text-pink-500">En la siguiente página encontrarás una pequeña prueba para comprobar lo aprendido en esta lección.</span>',
                      imgSource: 'images/img4.webp',
                      imgAlternativeText: 'ordenador de mesa',
                    },
                    {
                      component: markRaw(CourseTest),
                      title: 'mover cursor',
                      fullQuestion: '¿Qué debes hacer para mover el cursor por la pantalla?',
                      options: [
                        {
                          id: 0,
                          answer: 'Presionar varias veces el teclado',
                          isCorrect: false,
                        },
                        {
                          id: 1,
                          answer: 'Mover el ratón sobre una superficie plana',
                          isCorrect: true,
                        },
                        {
                          id: 2,
                          answer: 'Apagar y encender el ordenador',
                          isCorrect: false,
                        },
                      ],
                    },
                    {
                      component: markRaw(CourseTest),
                      title: 'clic izquierdo',
                      fullQuestion:
                        '¿Para qué se utiliza normalmente el botón izquierdo del ratón?',
                      options: [
                        {
                          id: 0,
                          answer: 'Para apagar el ordenador',
                          isCorrect: false,
                        },
                        {
                          id: 1,
                          answer: 'Para seleccionar y abrir elementos',
                          isCorrect: true,
                        },
                        {
                          id: 2,
                          answer: 'Para subir el volumen',
                          isCorrect: false,
                        },
                      ],
                    },
                    {
                      component: markRaw(CourseTest),
                      title: 'clic derecho',
                      fullQuestion:
                        '¿Qué ocurre normalmente al hacer clic derecho sobre un elemento?',
                      options: [
                        {
                          id: 0,
                          answer: 'Se apaga la pantalla',
                          isCorrect: false,
                        },
                        {
                          id: 1,
                          answer: 'Se abre automáticamente Internet',
                          isCorrect: false,
                        },
                        {
                          id: 2,
                          answer: 'Aparece un menú con opciones adicionales',
                          isCorrect: true,
                        },
                      ],
                    },
                    {
                      component: markRaw(CourseResult),
                    },
                  ],
                },
                {
                  title: 'Usar el teclado',
                  url: '#/cursos/alfabetizacion_digital',
                },
                {
                  title: 'Partes de un ordenador',
                  url: '#/cursos/alfabetizacion_digital',
                },
                {
                  title: 'Conectarse a Internet',
                  url: '#/cursos/alfabetizacion_digital',
                },
              ],
            },
            {
              name: 'Móviles y Tablets',
              courses: [
                {
                  title: 'Encendido y apagado',
                  url: '#/cursos/alfabetizacion_digital',
                },
                {
                  title: 'Usar una pantalla táctil',
                  url: '#/cursos/alfabetizacion_digital',
                },
                {
                  title: 'Gestos táctiles avanzados',
                  url: '#/cursos/alfabetizacion_digital',
                },
                {
                  title: 'Configuraciones básicas',
                  url: '#/cursos/alfabetizacion_digital',
                },
                {
                  title: 'Conectarse a Internet',
                  url: '#/cursos/alfabetizacion_digital',
                },
              ],
            },
            {
              name: 'General',
              courses: [
                {
                  title: 'Buscar y gestionar documentos y archivos',
                  url: '#/cursos/alfabetizacion_digital',
                },
                {
                  title: 'Tomar y editar fotos',
                  url: '#/cursos/alfabetizacion_digital',
                },
                {
                  title: 'Usar el correo electrónico',
                  url: '#/cursos/alfabetizacion_digital',
                },
                {
                  title: 'Descargar aplicaciones o programas',
                  url: '#/cursos/alfabetizacion_digital',
                },
                {
                  title: 'Realizar búsquedas en Internet',
                  url: '#/cursos/alfabetizacion_digital',
                },
              ],
            },
          ],
        },
        // Por definir en futuras versiones
        {
          category: 'Higiene Digital',
          description:
            'Adquiere buenos hábitos para manejar y proteger tu identidad y tus datos en medios digitales',
          url: '#/cursos',
          subcategories: [],
        },
        {
          category: 'Ciberseguridad',
          description:
            'Conoce cuáles son las estrategias que te ayudarán a mantenerte seguro al usar internet',
          url: '#/cursos',
          subcategories: [],
        },
        {
          category: 'Desinformación e I.A.',
          description:
            'Aprender a identificar noticias falsas o imágenes generadas por Inteligencia Artificial',
          url: '#/cursos',
          subcategories: [],
        },
      ],
    }
  },
}
</script>

<template>
  <header><Header /></header>
  <main class="my-16 mx-12 sm:mx-26">
    <component
      :is="currentView"
      :content="content"
      :currentPath="currentPath"
      :currentCourse="currentCourse"
      @toggle-modal="toggleModal"
      @find-current-course="findCurrentCourse"
    />
  </main>
  <footer><Footer /></footer>
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
</template>

<style scoped></style>
