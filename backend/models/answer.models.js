const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    quesid: {
        type: String,
      //  required: true 
    },
    
})

//answerSchema.index({ creationTime: -1, subject: 1, _id: 1 })

module.exports = mongoose.model('answer', answerSchema)