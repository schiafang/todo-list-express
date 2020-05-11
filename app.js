const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const db = mongoose.connection
// mongoose 資料庫連線設定
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', () => {
  console.log('MongoDB error!')
})
db.once('open', () => {
  console.log('MongoDB connected!')
})
// handlebars 樣板設定
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// listening port
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})

// route setting 路由設定
app.get('/', (req, res) => {
  res.render('index')
})

