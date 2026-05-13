<!-- Este componente se utiliza para gestionar el renderizado de un objeto tipo pregunta dentro de un curso y los input del usuario -->
<script>
export default {
  data() {
    return {
      inputAnswer: [],
    }
  },
  props: {
    page: {
      type: Object,
      required: true,
      validator(value) {
        // Confirmar que el contendio dentro de las propiedades sean del tipo correcto
        if (
          typeof value.title !== 'string' ||
          typeof value.fullQuestion !== 'string' ||
          !Array.isArray(value.options)
        )
          return false
        return true
      },
    },
  },
  computed: {
    // Propiedad computada que confirma si hay más de una respuesta correcta, de haberlo, imprime el mensaje "Respuesta múltiple"
    isQuestionMultipleChoice() {
      let correctAnswers = this.page.options.filter((element) => element.isCorrect)
      return correctAnswers.length > 1
    },
  },
  methods: {
    /* Gestiona el mantener la variable inputAnswer actualizada con la selección o deselección de inputs, en caso de que 
    estos sean checkboxes */
    handleCheckboxAnswers(element, event) {
      if (event.target.checked) {
        this.inputAnswer.push(element.isCorrect)
      } else {
        let index = this.inputAnswer.indexOf(element.isCorrect)
        this.inputAnswer.splice(index, 1)
      }
    },
  },
  emits: ['update-received-answer'],
}
</script>

<template>
  <div class="p-6 flex flex-col items-center text-center gap-6">
    <!-- Encabezado: Pregunta e información sobre tipo de pregunta -->
    <div>
      <h2 class="text-xl md:text-2xl font-medium">{{ this.page.fullQuestion }}</h2>
      <div class="text-sm md:text-base">
        <p v-if="isQuestionMultipleChoice">
          Pregunta de selección múltiple: Selecciona todas las respuestas correctas
        </p>
        <p v-else>Pregunta de selección simple: Selecciona la respuesta correcta</p>
      </div>
    </div>
    <!-- Formulario con preguntas -->
    <form action="" class="flex flex-col items-start text-left gap-2 text-base md:text-lg">
      <label
        v-for="element in this.page.options"
        class="w-full h-12 border border-lime-500/50 border-4 rounded-xl p-4 hover:border-lime-500 flex items-center"
      >
        <!-- Si la pregunta es de respuesta múltiple, los inputs serán checkboxes, sino serán de tipo radio (para una única elección) -->
        <input
          :type="isQuestionMultipleChoice ? 'checkbox' : 'radio'"
          :name="isQuestionMultipleChoice ? element.id : this.page.title"
          :id="element.id"
          class="w-5 h-5 cursor-pointer accent-lime-500"
          @change="
            (isQuestionMultipleChoice
              ? handleCheckboxAnswers(element, $event)
              : (inputAnswer = element.isCorrect),
            $emit('update-received-answer', this.inputAnswer))
          "
        />
        <span :for="element.id" class="ml-4">{{ element.answer }}</span>
      </label>
    </form>
  </div>
</template>
