const express = require('express')
const router = express.Router()
const videoController = require('../controller/videocontroller')
router
    .get('/lists',videoController.list)
    .get('/users',videoController.users)

module.exports = router