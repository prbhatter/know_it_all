//Schema for messages

const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    creationTime: {
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
    quesId: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    }
})

// messageSchema.index({ creationTime: -1, subject: 1, _id: 1 })

module.exports = mongoose.model('message', messageSchema)