<template>
  <div class="container">
    <div class="step-info">
      <p>Etapa <span class="current-step">{{ currentStep + 1 }}</span> de {{ totalSteps }}</p>
      <h2>Pessoa Física</h2>
    </div>

    <Input v-model="formData.name" label="Nome" type="text" :error="errors.name" />
    <Input v-model="formData.document" label="CPF" type="text" :error="errors.document" />
    <Input v-model="formData.age" label="Data de nascimento" type="date" :error="errors.age" />
    <Input v-model="formData.phone" label="Telefone" type="text" :error="errors.phone" />
  </div>
</template>

<script setup>
import { inject, reactive } from 'vue'
import Input from '../Input.vue'
import { isCpf, isPhone, isRequired, minLength } from '../../../utils/validator'

const { currentStep, totalSteps } = inject('stepInfo')
const formData = inject('formData')
const errors = reactive({
  name: '',
  document: '',
  age: '',
  phone: '',
})

function validate() {
  let valid = true
  Object.keys(errors).forEach(key => (errors[key] = ''))

  errors.name = isRequired(formData.name, 'Nome') || minLength(formData.name, 3, 'Nome')
  errors.document = isRequired(formData.document, 'CPF') || isCpf(formData.document)
  errors.age = isRequired(formData.age, 'Data de nascimento')
  errors.phone = isRequired(formData.phone, 'Telefone') || isPhone(formData.phone)

  for (const key in errors) {
    if (errors[key]) valid = false
  }

  return valid
}

defineExpose({ validate })
</script>

<style scoped>
.container {
  animation: sliderRight .5s;
}
</style>
