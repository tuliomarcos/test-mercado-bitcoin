<template>
  <div>
    <component :is="steps[currentStep]" ref="stepRef" />

    <div class="btn-card full-width" v-if="currentStep === 0">
      <Button @click="handleNext" styleType="primary">Continuar</Button>
    </div>

    <div class="btn-card" v-else-if="isLastStep">
      <Button @click="prev" styleType="secondary">Voltar</Button>
      <Button @click="submit" styleType="primary">Cadastrar</Button>
    </div>

    <div class="btn-card" v-else>
      <Button @click="prev" styleType="secondary">Voltar</Button>
      <Button @click="handleNext" styleType="primary">Continuar</Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue'
import Button from './Button.vue'

const emit = defineEmits(['submit'])
const props = defineProps({
  steps: {
    type: Array,
    required: true,
  },
})

const currentStep = ref(0)
const stepRef = ref(null)
const totalSteps = computed(() => props.steps.length)
const isLastStep = computed(() => currentStep.value === totalSteps.value - 1)

provide('stepInfo', {
  currentStep,
  totalSteps,
})

function next() {
  if (!isLastStep.value) currentStep.value++
}

function prev() {
  if (currentStep.value > 0) currentStep.value--
}

function handleNext() {
  const current = stepRef.value

  if (current?.validate && typeof current.validate === 'function') {
    const isValid = current.validate()
    if (!isValid) return
  }

  next()
}

function submit() {
  const current = stepRef.value

  if (current?.validate && typeof current.validate === 'function') {
    const isValid = current.validate()
    if (!isValid) return
  }

  emit('submit')
}

defineExpose({ currentStep, next, prev })
</script>

<style scoped>
.btn-card {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.full-width button {
  width: 100%;
}
</style>
