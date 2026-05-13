<!-- Componente de enlace, estilado como un botón -->

<script>
const variants = {
  // Dark versions
  dark: 'bg-blue-900 text-white hover:bg-blue-950',
  // Light version (just border)
  light:
    'bg-white text-slate-800 border-4 border-blue-800 hover:text-slate-900 hover:border-sky-950',
  limeLight:
    'bg-white text-slate-800 border border-lime-500/50 border-4 hover:text-slate-900 hover:border-lime-500',
  standardLight:
    'bg-white text-slate-800 border border-sky-500/50 border-4 hover:text-slate-900 hover:border-sky-500',
  orangeLight:
    'bg-white text-slate-800 border border-orange-500/50 border-4 hover:text-slate-900 hover:border-orange-500',
  pinkLight:
    'bg-white text-slate-800 border border-pink-500/50 border-4 hover:text-slate-900 hover:border-pink-500',
  // Sizes
  large: 'text-xl sm:text-2xl px-6 py-4 w-5/6',
  medium: 'text-lg sm:text-xl px-6 py-2 w-2/3',
  small: 'text-base sm:text-lg px-2 py-1 w-1/5',
}

export default {
  props: {
    msg: String,
    page: String,
    variants: {
      type: Array,
      default: () => ['dark'],
    },
  },
  computed: {
    classes() {
      return this.variants.map((v) => variants[v] ?? '').join(' ')
    },
  },
}
</script>

<template>
  <a
    :href="page"
    :class="[
      'cursor-pointer rounded-xl text-center flex items-center justify-center hover:scale-102 hover:transform transition shadow-md shadow-slate-800/50',
      classes,
    ]"
  >
    {{ msg }}
  </a>
</template>

<style scoped></style>
