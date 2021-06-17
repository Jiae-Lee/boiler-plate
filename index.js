const express = require('express')
const app = express()
const port = 5000
const config = require('./config/key');

const { User } = require("./models/User");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('리액트')
})

app.post("/register", (req, res) => {
  //회원가입 시 필요한 정보를 client에서 가져와 데이터베이스에 넣기

  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({ 
      success: true 
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})