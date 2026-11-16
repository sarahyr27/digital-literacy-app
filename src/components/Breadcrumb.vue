<!-- Component that shows the breadcrumb navigation -->
<script>
export default {
  props: {
    content: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getName(route) {
      let contentElement
      if (route === this.$route.params.subcategoria) {
        contentElement = this.content.find((element) => element.id === route)
        return contentElement.category
      } else if (route === this.$route.params.curso) {
        contentElement = this.content
          .flatMap((category) =>
            category.subcategories
              ? category.subcategories.flatMap((subcategory) => subcategory.courses ?? [])
              : (category.courses ?? []),
          )
          .find((course) => course.id === route)
        return contentElement.title
      }
    },
  },
}
</script>

<template>
  <nav class="hidden lg:flex items-center gap-2 text-blue-900 text-xl mb-8 font-semibold">
    <RouterLink
      to="/"
      class="hover:underline hover:decoration-2 hover:decoration-blue-950 hover:text-blue-950 transition"
      >Página Principal</RouterLink
    >
    <span class="text-slate-500">/</span>
    <RouterLink
      to="/categorias-cursos"
      class="hover:underline hover:decoration-2 hover:decoration-blue-950 hover:text-blue-950 transition"
      >Cursos</RouterLink
    >
    <span v-if="$route.params.subcategoria" class="text-slate-500">/</span>
    <RouterLink
      v-if="$route.params.subcategoria"
      :to="`/categorias-cursos/subcategoria/${$route.params.subcategoria}`"
      class="hover:underline hover:decoration-2 hover:decoration-blue-950 hover:text-blue-950 transition"
      >{{ getName($route.params.subcategoria) }}</RouterLink
    >
    <span v-if="$route.params.curso" class="text-slate-500">/</span>
    <RouterLink
      v-if="$route.params.curso"
      :to="`/categorias-cursos/subcategoria/${$route.params.subcategoria}/curso/${$route.params.curso}`"
      class="hover:underline hover:decoration-2 hover:decoration-blue-950 hover:text-blue-950 transition"
      >{{ getName($route.params.curso) }}</RouterLink
    >
  </nav>
</template>

<style scoped></style>
