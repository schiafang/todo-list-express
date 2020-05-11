const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const db = mongoose.connection

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('MongoDB error!')
})
db.once('open', () => {
  console.log('MongoDB connected!')
})

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.send('hello world!')
})

