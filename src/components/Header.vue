<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      windowWidth: 0,
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    resizeHandler() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth >= 1024) this.isMenuOpen = false
    },
  },
  created() {
    window.addEventListener('resize', this.resizeHandler)
  },
  unmounted() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  mounted() {
    this.windowWidth = window.innerWidth
  },
}
</script>

<template>
  <nav>
    <div
      class="bg-sky-200 text-slate-800 text-2xl font-bold flex justify-between items-center h-24"
    >
      <!-- Menú escritorio: oculto en sm -->
      <div class="flex items-center mx-4 gap-4">
        <a href="#/" class="shrink-0 z-20"
          ><img src="/images/logo.png" alt="Logo" class="mt-12"
        /></a>
        <ul class="hidden lg:flex list-none flex p-0 gap-10">
          <li class="text-center">
            <a
              href="#/"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              >Página Principal</a
            >
          </li>
          <li class="text-center">
            <a
              href="#/cursos"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              >Cursos</a
            >
          </li>
          <li class="text-center">
            <a
              href="#/"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              >Ayuda</a
            >
          </li>
        </ul>
      </div>
      <!-- Links inicio sesión: ocultos en sm -->
      <div class="mx-6">
        <ul class="hidden lg:flex list-none flex p-0 gap-4">
          <li class="text-center">
            <a
              href="#/"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              >Registrarse</a
            >
          </li>
          <li class="text-center">|</li>
          <li class="text-center">
            <a
              href="#/"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              >Iniciar Sesión</a
            >
          </li>
        </ul>
      </div>
      <button
        aria-label="Abrir menú"
        :class="isMenuOpen ? 'icon-[whh--psx]' : 'icon-[whh--menu]'"
        class="lg:hidden mx-6 shrink-0 hover:scale-110 transition"
        @click="toggleMenu"
      >
        Menú
      </button>
    </div>
    <!-- Menú móvil -->
    <Transition>
      <div
        v-if="isMenuOpen && windowWidth < 1024"
        class="absolute left-1/2 -translate-x-1/2 font-bold flex z-10"
      >
        <ul
          class="bg-sky-100 rounded-b-xl text-slate-800 text-2xl flex flex-col justify-between gap-3 p-6 pt-10 w-screen h-[calc(100dvh-6rem)]"
        >
          <li class="text-center">
            <a
              href="#/"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              >Página Principal</a
            >
          </li>
          <li class="text-center">
            <a
              href="#/cursos"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              >Cursos</a
            >
          </li>
          <li class="text-center">
            <a
              href="#/"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              >Ayuda</a
            >
          </li>
          <li class="text-center">
            <a
              href="#/"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              >Registrarse</a
            >
          </li>
          <li class="text-center">
            <a
              href="#/"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              >Iniciar Sesión</a
            >
          </li>
        </ul>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
