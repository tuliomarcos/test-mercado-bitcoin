<template>
  <div class="card">
    <p class="success" v-if="successMessage">{{ successMessage }}</p>
    <Button @click="refresh" styleType="secondary" class="full-width" v-if="successMessage">Voltar</Button>
    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>

    <Stepper ref="stepper" :steps="steps" @submit="handleSubmit" v-if="!successMessage" />
  </div>
</template>

<script setup>
import Stepper from '../components/Form/Stepper.vue'
import FirstStep from './Form/steps/FirstStep.vue'
import SecondStep from './Form/steps/SecondStep.vue'
import ThirdStep from './Form/steps/ThirdStep.vue'
import FourthStep from './Form/steps/FourthStep.vue'
import { provide, ref, shallowRef, watch } from 'vue'
import { useForm } from '../composables/useForm'
import { ApiClient } from '../utils/ApiClient'
import Button from './Form/Button.vue'

const steps  = shallowRef([FirstStep, SecondStep, ThirdStep, FourthStep])
const { formData } = useForm()
const stepper = ref()
const successMessage = ref('')
const errorMessage = ref('')

provide('formData', formData)

async function handleSubmit() {
  const apiClient = new ApiClient()
  
  try {
    const response = await apiClient.post('/registration', formData)

    successMessage.value = 'Cadastro realizado com sucesso!'
    console.log('Resposta da API:', response)
  } catch (error) {
    errorMessage.value = `Erro ao realizar o cadastro: ${error.message}`
  }
}

function refresh() {
  window.location.reload()
}

</script>

<style scoped>
.card {
  padding: 20px;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.success {
  margin-bottom: 20px;
  color: #28a745;
  font-weight: bold;
  text-align: center;
}

.error {
  margin-bottom: 20px;
  color: #dc3545;
  font-weight: bold;
  text-align: center;
}
</style>
