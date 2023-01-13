##express-video 接口文档
### 接口说明
* 基于RESTful API 接口规范
* 基于JWT身份认证
* 使用CORS跨域
* 接口基础请求地址：http://127.0.0.1/api/v1
* 使用JSON格式进行数据通信

### 用户注册
path:`/users/registers`

method:`POST`

是否认证：否

| 字段名      | 字段类型   | 是否必须 |
|----------|--------|------|
| username | string | 是    |
| age      |string|是|
| password |string|是|
| email    |string|是|
| phone    |string|是|

请求示例：
```json
{
    "username":"name=string",
    "password":"password-sting",
    "age":"age-number",
    "email":"email-string",
    "phone":"phone-number"
}
```