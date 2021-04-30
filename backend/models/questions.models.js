//Schema for questions

const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        default: 'Private'
    },
    anonymous: {
        type: String,
        default: 'No'
    },
    isAnswered: {
        type: Boolean,
        required: true
    },
    creationTime: {
        type: Number,
        required: true
    },
    expirationTime: {   //Expiration time is 1 day after the creation of the question
        type: Number,
        required: true
    },
    stuname: {          //Student who  raised the question
        type: String,
        required: true
    },
    tutname: {          //Tutor to which the question is currently assigned
        type: String,
        required: true
    },
    solution: {
        type: [ String ] 
    },
    comments: {
        type: [ String ] 
    },
    expired: {
        type: String,
        required: true
    }
})

questionSchema.index({ creationTime: -1, subject: 1, _id: 1 })

module.exports = mongoose.model('question', questionSchema)