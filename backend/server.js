if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const flash = require('express-flash')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')

const http = require('http').createServer(app)
const io = require('socket.io')(http)

const { connectDb } = require('./config/connectDb')
connectDb()

const clients = {};

io.on('connection', function(socket) {
        console.log((new Date()) + ' Recieved a new connection');

        // if (interval) {
        //     clearInterval(interval);
        // }
        // interval = setInterval(() => getApiAndEmit(socket), 1000);

        socket.emit('connection', null);

        socket.on('message', function(message){

            console.log('Recieved Message: ', message.type);
            const { type, user } = message
            // console.log('User: ', user);
            // console.log('Type: ', type);
            const uname = user.uname;
            clients[uname] = socket;
            console.log('connected: ' + user.uname + ' in ' + Object.getOwnPropertyNames(clients));

        })

        socket.on("disconnect", () => {
            console.log("Client disconnected");
            // clearInterval(interval);
        });

    });

const initializePassport = require('./config/passport-config')      //To know how to initialize passport

app.set('view-engine', 'ejs')                                       //To be able to use ejs files
app.use(express.static('views'))
app.use(express.static(__dirname + '/views'));
app.use(express.json())                                             //To be able to use json-type docs
app.use(express.urlencoded({ extended: true }))                    //To be able to use data encoded in url
app.use(flash())
app.use(session({                                                   //Create a session
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
    // saveUninitialized: false
}))
app.use(passport.initialize())                                      //Initialize passport
app.use(passport.session())
app.use(methodOverride('_method'))                                  //To be able to send request by DELETE method

app.get('/' , (req, res) => {                                       //GET request to Home Page
    res.render('index.ejs')
})

const registerRoute = require('./routes/register')                  //Register route
app.use(registerRoute)

const loginRoute = require('./routes/login')                        //Login route
app.use(loginRoute)

const profileHomeRoute = require('./routes/profile-home')
// Make wsServer accessible to our router
app.use(function(req,res,next){
    req.clients = clients;
    next();
});
app.use(profileHomeRoute)

const PORT = process.env.PORT
http.listen( PORT || 8000, () => {                                           //Server started locally on PORT (currently 3000)
    console.log(`Server started on PORT ${PORT || 8000}`)
})