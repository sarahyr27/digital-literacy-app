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
  // Previene hacer scroll si el modal del menu está abierto
  watch: {
    isMenuOpen(newValue) {
      document.body.style.overflow = newValue ? 'hidden' : ''
    },
  },
}
</script>

<template>
  <nav>
    <div
      class="bg-sky-500/50 text-slate-800 text-2xl font-bold flex justify-between items-center h-24"
    >
      <!-- Menú escritorio: oculto en sm -->
      <div class="flex items-center mx-4 gap-4 menu-desktop">
        <RouterLink to="/" class="shrink-0 z-20"
          ><div class="bg-sky-300 rounded-2xl mt-10">
            <img src="/images/logo.svg" alt="Logo" class="p-4" /></div
        ></RouterLink>
        <ul class="hidden lg:flex list-none flex p-0 gap-10">
          <li class="text-center">
            <RouterLink
              to="/"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              >Página Principal</RouterLink
            >
          </li>
          <li class="text-center">
            <RouterLink
              to="/categorias-cursos"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              >Cursos</RouterLink
            >
          </li>
          <li class="text-center">
            <RouterLink
              to="/"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              >Ayuda</RouterLink
            >
          </li>
        </ul>
      </div>
      <!-- Links inicio sesión: ocultos en sm -->
      <div class="mx-6 menu-desktop">
        <ul class="hidden lg:flex list-none flex p-0 gap-4">
          <li class="text-center">
            <RouterLink
              to="/"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              >Registrarse</RouterLink
            >
          </li>
          <li class="text-center">|</li>
          <li class="text-center">
            <RouterLink
              to="/"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              >Iniciar Sesión</RouterLink
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
          class="bg-sky-100 rounded-b-xl text-slate-800 text-2xl flex flex-col justify-around p-6 pt-10 w-screen h-[calc(100dvh-6rem)]"
        >
          <li class="text-center">
            <RouterLink
              to="/"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              @click="toggleMenu"
              >Página Principal</RouterLink
            >
          </li>
          <li class="text-center">
            <RouterLink
              to="/categorias-cursos"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              @click="toggleMenu"
              >Cursos</RouterLink
            >
          </li>
          <li class="text-center">
            <RouterLink
              to="/"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              @click="toggleMenu"
              >Ayuda</RouterLink
            >
          </li>
          <li class="text-center">
            <RouterLink
              to="/"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              @click="toggleMenu"
              >Registrarse</RouterLink
            >
          </li>
          <li class="text-center">
            <RouterLink
              to="/"
              class="inline-block hover:scale-105 hover:transform transition no-underline"
              @click="toggleMenu"
              >Iniciar Sesión</RouterLink
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

.menu-desktop li {
  display: flex;
  align-items: center;
}
</style>
