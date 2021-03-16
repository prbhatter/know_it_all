//Configuration of Local Strategy for authentication using Passport

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const passport = require('passport')
const userModel = require('../models/user.models')

//Serializing the user
passport.serializeUser( (userObj, done) => {
    return done(null, userObj)
})

//Deserializing the user
passport.deserializeUser( async (userObj, done) => {
    try {
            const user = await userModel.findById(userObj.id)
            return done(null, user)
        
    } catch(err) {
        return done(err)
    }
})

//Local Strategy for authentication
passport.use('signin', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'uname',
    passwordField: 'password',
} , async (req,uname,password,done) => {
    console.log('passport config')
    const user = await userModel.findOne({ uname: uname })
    console.log('passport config data recieved')
    if(user && user._id) {
        const match = await bcrypt.compare(password, user.password)
        if(match) {
            console.log('passport config password matched')
            return done(null, {
                id: user._id
            })
        } else {
            req.flash('error', 'Wrong Password')
            return done(null, false)
        }
    }
    req.flash('error', 'Wrong username');
    return done(null, false)
}))

module.exports = passport