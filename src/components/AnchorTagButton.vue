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
  unavailable: 'bg-slate-400 text-slate-800 border-4 border-slate-500 cursor-not-allowed',
  // Sizes
  large: 'text-xl sm:text-2xl px-6 py-4 w-5/6',
  medium: 'text-lg sm:text-xl px-6 py-2 w-2/3',
  small: 'text-base sm:text-lg px-2 py-1 w-1/5',
}

export default {
  props: {
    msg: String,
    url: String,
    variants: {
      type: Array,
      default: () => ['dark'],
    },
  },
  computed: {
    classes() {
      return this.variants.map((v) => variants[v] ?? '').join(' ')
    },
    isUnavailable() {
      return this.variants.includes('unavailable')
    },
    baseClasses() {
      const classes =
        'rounded-xl text-center flex items-center justify-center transition shadow-md shadow-slate-800/50'

      return this.isUnavailable
        ? `${classes} cursor-not-allowed`
        : `${classes} cursor-pointer hover:scale-102 hover:transform`
    },
  },
}
</script>

<template>
  <RouterLink v-if="!isUnavailable" :to="url" :class="[baseClasses, classes]">
    {{ msg }}
  </RouterLink>
  <span v-else :class="[baseClasses, classes]">
    {{ msg }}
  </span>
</template>

<style scoped></style>
