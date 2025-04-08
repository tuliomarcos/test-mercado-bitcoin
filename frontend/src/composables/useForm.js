import { reactive } from 'vue'

export function useForm() {
  const formData = reactive({
    email: '',
    password: '',
    name: '',
    document: '',
    accountType: 'PF',
    age: '',
    phone: '',
  })

  return { formData }
}
