<template>
  <div class="input-wrapper">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :class="['input-field', { 'input-error': error }]"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
    <p v-if="error" class="input-error-message">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue', 'blur', 'focus'])
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.input-label {
  margin-bottom: 0.4rem;
  font-size: 1rem;
  color: #000;
}

.input-field {
  padding: 0.5rem;
  border: 1px solid #000000;
  border-radius: 5px;
  font-size: 1rem;
}

.input-field:focus {
  outline: none;
  border-color: #007bff;
}

.input-error {
  border-color: #dc3545;
}

.input-error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  margin-bottom: 0rem;
}
</style>
