const express = require('express')  //express框架
const logger = require('morgan')  //日志记录
const dotenv = require('dotenv')  //设置env
const cors = require('cors')  //跨域请求
const router = require('./router/index')

/*
 * {dotenv} 设置process.env
 *
 * {express} 创建express--APP
 *
 * {app.listen()} 配置监听端口
 */
dotenv.config('./env')
const PORT = process.env.PORT || 3000
const app = express()
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})


/**
 * 中间件配置
 */
app.use(express.static('public' + '' + ''))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(logger('dev'))
app.use(cors())

/**
 * 路由挂载
 */
app.use('/api/v1',router)

