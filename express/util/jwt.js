const jwt = require("jsonwebtoken")
const {promisify} = require('util')
let toJwt = promisify(jwt.sign)
let verity = promisify(jwt.verify)
exports.jwtSign = async (message) => {
    return await toJwt({message},process.env.PUBLICKEY,{expiresIn: 60*60*24})
}

exports.jwtVertify = async (req,res,next) => {
    let token = req.headers.authorization
    token = token?token.split(' ')[1]:null
    if (!token) {
        res.status(402).json({err:'请登陆后再做尝试'})
    }else {
        try {
            let userInfo =await verity(token,process.env.PUBLICKEY)
            req.user = userInfo
            next()
        } catch (error) {

            res.status(402).json({err:'无效登录'})
        }
    }

}