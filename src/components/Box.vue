<!-- Componente de contenedor tipo caja -->
<script>
export default {
  inheritAttrs: false,
  data() {
    return {
      variants: {
        // Versiones con fondo de color
        limeFull: 'bg-lime-500/50',
        standardFull: 'bg-sky-500/50',
        orangeFull: 'bg-orange-500/50',
        pinkFull: 'bg-pink-500/50',
        // Versiones ligeras (solo con borde, sin fondo)
        limeLight: 'bg-white border border-lime-500 border-4',
        standardLight: 'bg-white border border-sky-500 border-4',
        orangeLight: 'bg-white border border-orange-500 border-4',
        pinkLight: 'bg-white border border-pink-500 border-4',
      },
    }
  },
  props: {
    variant: String,
    hasCloseButton: { type: Boolean, required: false, default: false },
    isBoxVisible: { type: Boolean, required: false, default: true },
  },
  computed: {
    classes() {
      return this.variants[this.variant] ?? ''
    },
  },
  emits: ['updateBoxVisibility'],
}
</script>

<template>
  <section
    v-bind="$attrs"
    :class="[
      'flex flex-col items-center gap-4 rounded-xl p-6 text-center  text-slate-800 text-2xl shadow-md shadow-slate-800/50 ',
      classes,
      isBoxVisible ? 'block' : 'hidden',
    ]"
  >
    <slot name="image"></slot>
    <slot name="content"></slot>
    <slot name="button"></slot>
    <button
      v-if="hasCloseButton"
      class="text-md md:text-lg cursor-pointer bg-pink-500/50 rounded-xl p-2 px-4 font-bold flex items-center gap-1 shadow-md shadow-slate-800/50 hover:bg-pink-600/50 hover:text-white hover:scale-105 transition"
      @click="$emit('updateBoxVisibility', !this.isBoxVisible)"
    >
      Cerrar
    </button>
  </section>
</template>
