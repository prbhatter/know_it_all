//Schema for Users

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    uname: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    subjects: {
        type: [ String ],
    },
    contact: {
        type: Number
    },
    whatsapp: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    questions: {
        type: [ String ]
    }
})

userSchema.index({ uname: 1 })

module.exports = mongoose.model('user', userSchema)