<!-- Componente de contenedor tipo caja -->
<script>
export default {
  data() {
    return {
      variants: {
        // Versiones con fondo de color
        limeFull: 'bg-lime-500/50',
        standardFull: 'bg-sky-500/50',
        orangeFull: 'bg-orange-500/50',
        pinkFull: 'bg-pink-500/50',
        // Versiones ligeras (solo con borde, sin fondo)
        limeLight: 'border border-lime-500/50 border-4',
        standardLight: 'border border-sky-500/50 border-4',
        orangeLight: 'border border-orange-500/50 border-4',
        pinkLight: 'border border-pink-500/50 border-4',
      },
    }
  },
  props: {
    variant: String,
  },
  computed: {
    classes() {
      return this.variants[this.variant] ?? ''
    },
  },
}
</script>

<template>
  <section
    :class="[
      'flex flex-col items-center gap-4 rounded-xl p-6 text-center text-balance text-slate-800 text-2xl shadow-md shadow-slate-800/50 ',
      classes,
    ]"
  >
    <slot name="image"></slot>
    <slot name="content"></slot>
    <slot name="button"></slot>
  </section>
</template>
