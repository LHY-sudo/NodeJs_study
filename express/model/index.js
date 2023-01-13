const mongoose = require("mongoose");

async function main() {
    await mongoose.connect('mongodb://localhost:27017/express-video')
}

main()
    .then(() => {
        console.log('Mongodb had connected')
    })
    .catch((err) => {
        console.log('Connection Error')
    })

module.exports = {
    User:mongoose.model('User',require('./userModel'))
}