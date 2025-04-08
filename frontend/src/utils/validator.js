export function isRequired(value, fieldName = 'Este campo') {
  return value ? '' : `${fieldName} é obrigatório.`
}

export function minLength(value, length, fieldName = 'Este campo') {
  return value.length >= length ? '' : `${fieldName} deve ter pelo menos ${length} caracteres.`
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'E-mail inválido.'
}

export function isCpf(value) {
  return /^\d{11}$/.test(value) ? '' : 'CPF inválido.'
}

export function isCNPJ(value) {
  return /^\d{14}$/.test(value) ? '' : 'CNPJ inválido'
}

export function isPhone(value) {
  return /^\d{10,11}$/.test(value) ? '' : 'Telefone inválido.'
}

export function isPassword(value) {
  return /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(value)
    ? ''
    : 'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um caractere especial.'
}
