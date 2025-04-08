<template>
  <div class="container">
    <div class="step-info">
      <p>Etapa <span class="current-step">{{ currentStep + 1 }}</span> de {{ totalSteps }}</p>
      <h2 v-if="accountType === 'PF'">Pessoa Física</h2>
      <h2 v-else>Pessoa Jurídica</h2>
    </div>

    <template v-if="accountType === 'PF'">
      <Input v-model="formData.name" label="Nome" type="text" :error="errors.name" />
      <Input v-model="formData.document" label="CPF" type="text" :error="errors.document" />
      <Input v-model="formData.age" label="Data de nascimento" type="date" :error="errors.age" />
    </template>

    <template v-else>
      <Input v-model="formData.companyName" label="Razão social" type="text" :error="errors.companyName" />
      <Input v-model="formData.document" label="CNPJ" type="text" :error="errors.document" />
      <Input v-model="formData.openDate" label="Data de abertura" type="date" :error="errors.openDate" />
    </template>

    <Input v-model="formData.phone" label="Telefone" type="text" :error="errors.phone" />
  </div>
</template>

<script setup>
import { inject, reactive, watch } from 'vue'
import Input from '../Input.vue'
import { isCNPJ, isCpf, isPhone, isRequired, minLength } from '../../../utils/validator'
import { formatCnpj, formatCpf, formatPhone } from '../../../utils/formatter'

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

  if (formData.accountType === "PF") {
    errors.name = isRequired(formData.name, 'Nome') || minLength(formData.name, 3, 'Nome')
    errors.document = isRequired(formData.document, 'CPF') || isCpf(formData.document)
    errors.age = isRequired(formData.age, 'Data de nascimento')
  } else {
    errors.name = isRequired(formData.name, 'Razão social') || minLength(formData.name, 3, 'Razão social')
    errors.document = isRequired(formData.document, 'CNPJ') || isCNPJ(formData.document)
    errors.age = isRequired(formData.age, 'Data de abertura')  
  }

  errors.phone = isRequired(formData.phone, 'Telefone') || isPhone(formData.phone)

  for (const key in errors) {
    if (errors[key]) valid = false
  }

  return valid
}

watch(
  () => formData.document,
  (val) => {
    formData.document = formData.accountType === 'pf' ? formatCpf(val) : formatCnpj(val);
  }
);

watch(
  () => formData.phone,
  (val) => {
    formData.phone = formatPhone(val);
  }
);

defineExpose({ validate })
</script>

<style scoped>
.container {
  animation: sliderRight .5s;
}
</style>
