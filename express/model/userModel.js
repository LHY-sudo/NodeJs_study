const mongoose = require("mongoose");
const md5 = require('../util/crypto-md5')
const basemodel = require('./basempdel')
const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        set:value => md5(value),
        select:false
    },
    phone:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:null
    },
    cover:{
        type:String,
        default:null
    },
    channeldes:{
        type:String,
        default:null
    },
    ...basemodel

})

module.exports = userSchema