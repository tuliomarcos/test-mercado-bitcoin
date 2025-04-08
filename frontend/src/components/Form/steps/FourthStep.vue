<template>
  <div class="container">
    <div class="step-info">
      <p>Etapa <span class="current-step">{{ currentStep + 1 }}</span> de {{ totalSteps }}</p>
      <h2>Revise suas informações</h2>
    </div>
    
    <Input v-model="formData.email" label="Endereço de e-mail" type="text" :error="errors.email" />

    <template v-if="formData.accountType === 'PF'">
      <Input v-model="formData.name" label="Nome" type="text" :error="errors.name" />
      <Input v-model="formData.document" label="CPF" type="text" :error="errors.document" />
      <Input v-model="formData.age" label="Data de nascimento" type="date" :error="errors.age" />
    </template>
    <template v-else>
      <Input v-model="formData.name" label="Razão social" type="text" :error="errors.nome" />
      <Input v-model="formData.document" label="CNPJ" type="text" :error="errors.document" />
      <Input v-model="formData.age" label="Data de abertura" type="date" :error="errors.age" />
    </template>

    <Input v-model="formData.phone" label="Telefone" type="text" :error="errors.phone" maxlength="15" />
    <Input v-model="formData.password" label="Senha" type="text" :error="errors.password" />
  </div>
</template>

<script setup>
import { inject, reactive, watch } from 'vue'
import Input from '../Input.vue'
import { isCNPJ, isCpf, isEmail, isPassword, isPhone, isRequired, minLength } from '../../../utils/validator'
import { formatCnpj, formatCpf, formatPhone } from '../../../utils/formatter'

const { currentStep, totalSteps } = inject('stepInfo')
const formData = inject('formData')

const errors = reactive({
  email: '',
  name: '',
  document: '',
  age: '',
  phone: '',
  password: '',
})

function validate() {
  let valid = true
  Object.keys(errors).forEach(key => (errors[key] = ''))

  if (formData.accountType === "PF") {
    errors.name = isRequired(formData.name, 'Nome') || minLength(formData.name, 6, 'Nome')
    errors.document = isRequired(formData.document, 'CPF') || isCpf(formData.document)
    errors.age = isRequired(formData.age, 'Data de nascimento')
  } else {
    errors.name = isRequired(formData.name, 'Razão social') || minLength(formData.name, 6, 'Razão social')
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
    formData.document = formData.accountType === 'PF' ? formatCpf(val) : formatCnpj(val);
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