const {User} = require('../model/index')
const md5 = require('./crypto-md5')
const jwt = require("jsonwebtoken")
const {promisify} = require('util')
let verity = promisify(jwt.verify)


module.exports =  async (req,res,next) => {
    let token = req.headers.authorization
    token = token?token.split(' ')[1]:null
    userInfo =await verity(token,process.env.PUBLICKEY)
    userInfo.password = req.body.password
    userInfo= await User.findOne(userInfo)
    console.log(userInfo)
    if (!userInfo) {
        res.status(200).json({msg: '密码错误'})
    }  else {
        rawBody = JSON.parse(JSON.stringify(req.body))
        req.body.username = req.body.username ? req.body.username : userInfo.username
        req.body.email = req.body.email ? req.body.email: userInfo.email
        req.body.phone = req.body.phone? req.body.phone: userInfo.phone
        req.body.rawBody = rawBody
        next()
    }

}