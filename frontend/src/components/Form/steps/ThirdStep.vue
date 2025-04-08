<template>
  <div class="container">
    <div class="step-info">
      <p>Etapa <span class="current-step">{{ currentStep + 1 }}</span> de {{ totalSteps }}</p>
      <h2>Senha de acesso</h2>
    </div>

    <Input v-model="formData.password" label="Sua senha" type="password" :error="errors.password" />
  </div>
</template>

<script setup>
import { inject, reactive } from 'vue'
import Input from '../Input.vue'
import { isPassword, isRequired } from '../../../utils/validator'

const { currentStep, totalSteps } = inject('stepInfo')
const formData = inject('formData')

const errors = reactive({
  password: '',
})

function validate() {
  let valid = true
  Object.keys(errors).forEach(key => errors[key] = '')

  errors.password = isRequired(formData.password, 'Senha') || isPassword(formData.password)

  for (const key in errors) {
    if (errors[key]) valid = false
  }

  return valid
}

defineExpose({ validate })
</script>

<style scoped>
.container {
  animation: swiperUp .5s;
}
</style>
