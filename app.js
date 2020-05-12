const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Todo = require('./models/todo')
const app = express()
const port = 3000
const db = mongoose.connection
// 設定 use 每筆資料都經過 body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// handlebars 樣板設定
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// mongoose 資料庫連線設定
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', () => {
  console.log('MongoDB error!')
})
db.once('open', () => {
  console.log('MongoDB connected!')
})
// listening port
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})

// route setting 首頁路由設定，將 Todo 資料傳入樣板
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

// 新增一筆資料
app.post('/todos', (req, res) => {
  const name = req.body.name
  // 1.產生物件實例 > 將實例存入資料庫
  // const todo = new Todo({ name })
  // return todo.save()
  // 2.直接操作資料庫
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽特定資料頁面
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

// 修改特定資料
// 1. 指定路由到編輯頁面
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})
// 2. 編輯頁面修改後 post 送出資料
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})