<template>
  <div class="container">
    <div class="step-info">
      <p>Etapa <span class="current-step">{{ currentStep + 1 }}</span> de {{ totalSteps }}</p>
      <h2>Seja bem-vindo(a)</h2>
    </div>

    <Input v-model="formData.email" label="Endereço de e-mail" type="email" :error="errors.email" />

    <div class="input-group account-type">
      <div class="input-group-radio">
        <input type="radio" id="individual" value="pf" v-model="formData.accountType" :checked="formData.accountType !== 'pj'" />
        <label for="individual">Pessoa física</label>
      </div>
      <div class="input-group-radio">
        <input type="radio" id="company" value="pj" v-model="formData.accountType" />
        <label for="company">Pessoa jurídica</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive } from 'vue'
import Input from '../Input.vue';
import { isEmail, isRequired } from '../../../utils/validator';

const { currentStep, totalSteps } = inject('stepInfo')
const formData = inject('formData')
const errors = reactive({
  email: '',
})

function validate() {
  let valid = true
  Object.keys(errors).forEach(key => errors[key] = '')

  errors.email = isRequired(formData.email, 'E-mail') || isEmail(formData.email)

  for (const key in errors) {
    if (errors[key]) valid = false
  }

  return valid
}

defineExpose({ validate })
</script>

<style scoped>
.input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.container {
  animation: sliderLeft .5s ease;
}
</style>
