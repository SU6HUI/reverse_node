let mongoose = require('mongoose')

let schema = new mongoose.Schema({
    username:String,
    studentId:String,
})

let Users = mongoose.model('users',schema)

module.exports = Users