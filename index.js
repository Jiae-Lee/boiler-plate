const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('리액트')
})

app.post("/api/user/register", (req, res) => {
  //회원가입 시 필요한 정보를 client에서 가져와 데이터베이스에 넣기
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({ 
      success: true 
    })
  })
})

//로그인
app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    //이메일이 db에 있는지 확인
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    //이메일이 db에 있다면, 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
      return res.json({ 
        loginSuccess: false, 
        message: "비밀번호가 틀렸습니다."
      })
      //비밀번호가 맞다면 토큰 생성
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        //토큰 저장은 쿠키, 로컬스토리지, 세션등에 가능 지금은 쿠키!

        res.cookie("x_auth", user.token)
        .status(200)
        .json({
          success: true,
          userId: user._id
        })
      })
    })
  })
})

app.get('/api/users/auth', auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 뜻
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id},
    { token: "" },
    (err, user) => {
      if(err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})