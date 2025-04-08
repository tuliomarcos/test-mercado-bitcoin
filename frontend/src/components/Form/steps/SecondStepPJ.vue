<template>
  <div class="container">
    <div class="step-info">
      <p>Etapa <span class="current-step">{{ currentStep + 1 }}</span> de {{ totalSteps }}</p>
      <h2>Pessoa Jurídica</h2>
    </div>

    <Input v-model="formData.companyName" label="Razão social" type="text" :error="errors.companyName" />
    <Input v-model="formData.document" label="CNPJ" type="text" :error="errors.document" />
    <Input v-model="formData.openDate" label="Data de abertura" type="date" :error="errors.openDate" />
    <Input v-model="formData.phone" label="Telefone" type="text" :error="errors.phone" />
  </div>
</template>

<script setup>
import { inject, reactive } from 'vue'
import Input from '../Input.vue'
import { isCNPJ, isPhone, isRequired, minLength } from '../../../utils/validator'

const { currentStep, totalSteps } = inject('stepInfo')
const formData = inject('formData')
const errors = reactive({
  companyName: '',
  document: '',
  openDate: '',
  phone: '',
})

function validate() {
  let valid = true
  Object.keys(errors).forEach(key => (errors[key] = ''))

  errors.companyName = isRequired(formData.companyName, 'Razão social') || minLength(formData.companyName, 5, 'Razão social')
  errors.document = isRequired(formData.document, 'CNPJ') || isCNPJ(formData.document)
  errors.openDate = isRequired(formData.openDate, 'Data de abertura')
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
