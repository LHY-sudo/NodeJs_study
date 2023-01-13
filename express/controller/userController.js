const {User} = require('../model/index')
//const md5 = require('../util/crypto-md5')
const jwt = require("jsonwebtoken")
const {jwtSign} = require('../util/jwt')
const fs = require('fs')
const {promisify} = require('util')
let rename = promisify(fs.rename)
exports.list = async (req,res) => {
    let result = await User.find().select('username')
    res.status(200).send(result)
}

exports.delete = async (req,res) => {
    res.status(200).json({
        msg:'Delete Success'
    })
}

exports.register = async (req,res) => {
    let userModel = new User(req.body)
    let dbBack = await userModel.save()
    dbBack = dbBack.toJSON()
    delete dbBack.password
    res.status(200).json({
        msg:dbBack
    })
}
exports.login = async (req,res) => {
    //客户端数据验证
    //链接数据库查询
    let result = await User.findOne(req.body)
    console.log(result)
    if (result) {
        result = result.toJSON()
        result.token = await jwtSign(result)
        console.log(result)
        res.status(200).json({
            msg:result
        })
    } else {
        res.status(402).json({
            msg:"邮箱或者密码错误"
        })
    }
}

exports.update = async (req,res) => {
    let id = req.user.message._id
    change = req.body
    console.log(req.body)
    let result = await User.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json({
        msg:result
    })
}


exports.avatar = async (req,res) => {
    let fileArr = req.file.originalname.split('.')
    let fileType = fileArr[fileArr.length-1]
    try {
        await rename(
            './public/avatar/'+req.file.filename,
            './public/avatar/'+req.file.filename+'.'+fileType)
        let userInfo = await User.findByIdAndUpdate(
            req.user.message._id,
            {image:req.file.filename+'.'+fileType},
            {new:true})
        res.status(201).json({
            path:userInfo
        })
    } catch (error) {
        res.status(500).json({err:error})
    }

}