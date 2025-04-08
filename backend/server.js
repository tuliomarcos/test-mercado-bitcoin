const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: "*"
}))

app.get('/registration', (req, res) => {
  res.redirect('http://localhost:5173')
})

app.post('/registration', (req, res) => {
  const data = req.body
  
  if (!data.accountType || (data.accountType !== 'pf' && data.accountType !== 'pj')) {
    return res.status(400).json({ message: 'Tipo de conta inválido ou ausente (pf ou pj)' })
  }

  let requiredFields = ['email', 'password', 'name', 'document', 'age', 'phone', 'accountType']

  if (data.accountType === 'pj') {
    requiredFields = ['email', 'password', 'document', 'accountType', 'phone', 'companyName', 'openDate']
  }

  const missingFields = requiredFields.filter(field => !data[field])

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: 'Campos obrigatórios ausentes',
      missingFields,
    })
  }

  res.status(200).json({
    message: 'Cadastro recebido com sucesso!',
    receivedData: data,
  })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})