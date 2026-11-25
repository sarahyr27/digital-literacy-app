<script>
import Box from './Box.vue'

export default {
  data() {
    return {
      boxText: null,
      boxVisibility: false,
      clickedAreas: 0,
      currentClickedArea: null,
    }
  },
  props: {
    page: Object,
  },
  components: {
    Box,
  },
  methods: {
    toggleBoxVisibility(value) {
      this.boxVisibility = value
      console.log(this.clickableAreas)
    },
    showInformationBox(value) {
      console.log(value)
      for (const area of this.clickableAreas) {
        if (area.id == value) area.clicked = true
      }
      document.getElementById(value).classList.add('clicked')
      document.getElementById(value).classList.remove('notClicked')
      this.clickedAreas++
      if(this.clickedAreas == this.page.clickableAreas){
        this.$emit('is-simulation-completed', true)
      }
      this.boxVisibility = true
      this.currentClickedArea = value
      this.boxText = this.page[`${value}Text`]
    },
  },
  computed: {
    clickableAreas() {
      if (this.page.clickableAreasIds) {
        return this.page.clickableAreasIds.map((element) => ({
          id: element,
          clicked: false,
        }))
      }
    },
  },
  emits: ['is-simulation-completed']
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-full w-full px-6">
    <p
      v-if="page.textContent"
      v-html="page.textContent"
      :class="
        page.svgContent ? 'text-md md:text-lg text-center' : 'text-xl md:text-2xl text-center'
      "
    ></p>
    <div v-if="page.svgContent" class="relative flex justify-center items-center w-full h-full">
      <svg
        class="h-full w-full"
        :viewBox="`0 0 ${page.svgWidth} ${page.svgHeight}`"
        version="1.1"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
      >
        <image
          :width="page.svgWidth"
          :height="page.svgHeight"
          :href="page.imgSource"
          class="rounded-xl shadow-md shadow-slate-800/50 h-full w-full object-cover"
        />
        <g
          v-html="page.svgContent"
          @click="
            (event) => {
              !page.clickableAreas ? $emit('next-page') : showInformationBox(event.target.id)
            }
          "
        ></g>
      </svg>
      <div
        v-if="boxVisibility"
        class="absolute inset-0 flex items-center justify-center bg-slate-800/50 w-full h-full rounded-lg"
      >
      <figure v-if="currentClickedArea == 'rect2'">
<img :src="page.imgSource2" :width="page.svgWidth" :height="page.svgHeight"></img>
      </figure>
        <Box
          :class="currentClickedArea == 'rect2' ? 'w-3/4 absolute bottom-4 right-4' : 'w-3/4 absolute'"
          variant="orangeLight"
          hasCloseButton
          :is-box-visible="boxVisibility"
          @update-box-visibility="toggleBoxVisibility"
        >
          <template #content> {{ boxText }} </template>
        </Box>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.notClicked) {
  stroke: #ff6900 !important;
}

:deep(.clicked) {
  stroke: #7ccf00 !important;
}

:deep(.notClicked:hover) {
  fill: #ff6900 !important;
  fill-opacity: 0.5;
  cursor: pointer;
}

:deep(.clicked:hover) {
  fill: #7ccf00 !important;
  fill-opacity: 0.5;
  cursor: pointer;
}
</style>
