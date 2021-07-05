const { User } = require('../models/User');

//인증처리 하는곳
let auth = ( req, res, next) => {
    //쿠키에서 토큰 가져오기
    let token = req.cookies.x_auth;

    //토큰 복호화해서 유저 찾기
    //유저 있으면 인증o 없으면 인증x
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth } ;