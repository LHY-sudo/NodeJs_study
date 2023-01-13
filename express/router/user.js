const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const Validator = require('../middleware/validator/userValidator')
const {jwtVertify} =require('../util/jwt')
//const messageCheck = require('../util/updateCheck')
const multer = require('multer')
let upload = multer({dest:"public/avatar"})
router
    .get('/lists',jwtVertify,userController.list)
    .delete('/delete',userController.delete)
    .post('/registers', Validator.register, userController.register)
    .post('/logins', Validator.login,userController.login)
    .post('/avatar', jwtVertify,upload.single('avatar'),userController.avatar)
    .put('/update',jwtVertify,Validator.update, userController.update)


 module.exports = router