//Schema for notifications

const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    creationTime: {
        type: Number,
        required: true
    },
    expirationTime: {   //Expiration time is 1 day after the creation of the question
        type: Number,
    },
    stuname: {          //Student who raised the question
        type: String,
        required: true
    },
    tutname: {          //Tutor to which the question is currently assigned
        type: String,
        required: true
    },
    subject: {
        type: String
    },
    questionId: {
        type: String
    }
})

notificationSchema.index({ creationTime: -1, _id: 1 })

module.exports = mongoose.model('notification', notificationSchema)