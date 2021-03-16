//Schema for comments

const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    creationTime: {
        type: Number,
        required: true
    },
    uname: {
        type: String
    },
    questionId: {
        type: String
    }
})

commentSchema.index({ creationTime: -1, _id: 1 })

module.exports = mongoose.model('comment', commentSchema)