//Connect to MongoDb(Name of database - "my_database")  (Local for now for easier checking; will be changed to online database)

const mongoose = require('mongoose')

module.exports = {
    connectDb : function() {
        const url = "mongodb://localhost/my_database"
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: false
        }, () => {
            console.log('connected to db')
        })
    }
}