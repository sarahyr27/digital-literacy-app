<!-- Página principal -->
<script>
import AnchorTagButton from '@/components/AnchorTagButton.vue'
import Box from '@/components/Box.vue'

export default {
  components: { AnchorTagButton, Box },
}
</script>

<template>
  <div>
    <!-- Container -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
      <!-- Section one -->
      <section class="relative flex flex-col items-center h-9/10 sm:min-h-120">
        <h1 class="text-2xl lg:text-3xl text-slate-800 text-balance text-center font-bold">
          Te acompañamos a hacer de la Internet un lugar más cómodo y seguro para ti
        </h1>
        <figure class="w-full">
          <img
            src="/images/img1.webp"
            alt="mujer con portátil"
            class="relative inset-0 -z-10 h-9/10 w-full -mt-4 object-cover mask-radial-at-center mask-radial-from-50% mask-radial-to-70% animate-fade animate-once animate-duration-1200 animate-ease-in-out"
          />
        </figure>
      </section>
      <section class="flex flex-col gap-6 items-center justify-center">
        <AnchorTagButton msg="Regístrate gratis" :variants="['dark', 'large']" />
        <AnchorTagButton page="#/cursos" msg="Accede a los cursos" :variants="['dark', 'large']" />
        <AnchorTagButton msg="¿Necesitas Ayuda?" :variants="['light', 'medium']" class="mt-4" />
      </section>
    </div>
    <!-- Section two -->
    <div class="mt-12">
      <section>
        <hr class="w-76 h-1 mx-auto my-4 bg-slate-300 border-0 rounded-sm md:my-4" />
        <h1 class="text-2xl lg:text-3xl text-slate-800 text-center font-bold">
          Nos adaptamos a tus necesidades
        </h1>
        <div
          class="flex flex-col items-center md:flex-row md:justify-evenly md:items-stretch my-10 gap-4"
        >
          <Box variant="standardFull" class="justify-between">
            <template #image
              ><figure class="w-full">
                <img
                  class="h-44 w-full rounded-xl object-cover"
                  src="/images/img2.webp"
                  alt="dos mujeres con un móvil"
                /></figure
            ></template>
            <template #content>
              <p>
                ¿Te interesa aprender lo básico de cómo usar tu dispositivo o cómo navegar en
                Internet?
              </p>
            </template>
            <template #button>
              <AnchorTagButton
                page="#/cursos"
                msg="ver los cursos"
                :variants="['dark', 'medium']"
              />
            </template>
          </Box>
          <Box variant="standardFull" class="justify-between">
            <template #image
              ><figure class="w-full">
                <img
                  class="h-44 w-full rounded-xl object-cover"
                  src="/images/img3.webp"
                  alt="hombre con portátil"
                /></figure
            ></template>
            <template #content>
              <p>
                ¿Quieres saber cómo usar las redes sociales o cómo mantenerte seguro dentro del
                mundo digital?
              </p>
            </template>
            <template #button>
              <AnchorTagButton
                page="#/cursos"
                msg="ver los cursos"
                :variants="['dark', 'medium']"
              />
            </template>
          </Box>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
