const {body,validationResult} = require('express-validator')
const validate = require('./errorBack')
const {User} = require("../../model/index")

registerValidator = [
    body('username')
        .notEmpty().withMessage('用户名不能为空').bail()
        .isLength({min:2}).withMessage('用户名长度不能小于2').bail()
        .custom(async (value) => {
            let result = await User.findOne({username:value})
            if (result) {
                return Promise.reject('用户名已经被注册')
            }
        }),
    body('email')
        .notEmpty().withMessage('邮箱不能为空').bail()
        .isEmail().withMessage('邮箱格式错误').bail()
        .custom(async (value) => {
            let result = await User.findOne({email:value})
            if (result) {
                return Promise.reject('邮箱已经被注册')
            }
        }).bail(),
    body('phone')
        .notEmpty().withMessage("手机号为空").bail()
        .isLength({min:11,max:11}).withMessage('手机号长度错误').bail()
        .custom(async (value) => {
            let result = await User.findOne({phone:value})
            if (result) {
                return Promise.reject('手机号已经被注册')
            }
        }).bail()
        .custom(async (value) => {
            let regx = /^1[3|4|5|7|8][0-9]{9}/
            let result = regx.test(value)
            if (!result) {
                return Promise.reject('手机号格式错误')
            }
        }).bail(),
    body('password')
        .notEmpty().withMessage('密码不能为空').bail()
        .isLength({min:8,max:12}).withMessage('密码长度需在：8-12位').bail()
    ]

loginValidator = [
    body('email')
        .notEmpty().withMessage('邮箱不能为空').bail()
        .isEmail().withMessage('邮箱格式错误'),
    body('password')
        .notEmpty().withMessage('密码不能为空').bail()
        .isLength({min:8,max:12}).withMessage('密码长度需在：8-12位').bail()
]

updateValidator = [
    body('username')
        .if(body('username').exists())
        .isLength({min:2}).withMessage('用户名长度不能小于2').bail()
        .custom(async (value) => {
            let result = await User.findOne({username:value})
            if (result) {
                return Promise.reject('用户名已经被注册')
            }
}).bail(),
    body('email')
        .if(body('email').exists())
        .isEmail().withMessage('邮箱格式错误').bail()
        .custom(async (value) => {
            let result = await User.findOne({email:value})
            if (result) {
                return Promise.reject('邮箱已经被注册')
            }
        }).bail(),
    body('phone')
        .if(body('phone').exists())
        .isLength({min:11,max:11}).withMessage('手机号长度错误').bail()
        .custom(async (value) => {
            let result = await User.findOne({phone:value})
            if (result) {
                return Promise.reject('手机号已经被注册')
            }
        }).bail()
        .custom(async (value) => {
            let regx = /^1[3|4|5|7|8][0-9]{9}/
            let result = regx.test(value)
            if (!result) {
                return Promise.reject('手机号格式错误')
            }
        }).bail(),
    body('password')
        .notEmpty().withMessage('请输入密码').bail()
        .isLength({min:8,max:12}).withMessage('密码长度需在：8-12位').bail(),
    body('newpassword')
        .if(body('newpassword').exists())
        .isLength({min:8,max:12}).withMessage('密码长度需在：8-12位').bail()
]

module.exports.register = validate(registerValidator)
module.exports.login = validate(loginValidator)
module.exports.update = validate(updateValidator)