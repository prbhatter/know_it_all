const router = require('express').Router()
const passport = require('passport')
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth')
const flash = require('express-flash')
const userModel = require('../models/user.models')

router.use(flash())

//Prevent caching or else Log Out problem in nodejs
router.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
})

//GET request to Login for Tutor and Student
// router.get('/login/:type', checkNotAuthenticated, (req, res) => {
//     res.render('join.ejs' ,{ message: req.flash('error'), type: req.params.type})
// })

//POST request to login Student using Passport
router.post('/login', checkNotAuthenticated ,passport.authenticate('signin', {
    failureRedirect: '/login/failed',
    failureFlash: true
}), async (req, res) => {
    // console.log('login before model')
    await userModel.findOne({
        uname: req.body.uname
    }, async (err,doc) => {
        console.log('login.js',doc) 
        try{
            if(doc) {
                return res.status(200).json({type: 'LOGIN_SUCCESS', user: doc})
            } else {
                console.log('login failed login js')
                return res.status(500).json({type: 'LOGIN_FAILED'})
            }
        } catch(err) {
            console.log('login failed')
            return res.status(500).json({type: 'LOGIN_FAILED', err: err})
        }
    })
    // return res.status(200).json({type: 'LOGIN_SUCCESS'})
})

router.get('/login/failed', (req, res) => { 
    console.log('/login/failed')
    return res.status(500).json({type: 'LOGIN_FAILED'})
})

//To Log Out of session
router.delete('/logout', (req, res) => {
    // const type = req.params.type
    // const uname = req.user.uname
    // req.clients[uname] = null
    // console.log('client ', req.clients[uname])

    req.logOut()    // logOut function by Passport
    // console.log('logout req', req.user)
    req.session.destroy()
    console.log('logout')
    return res.status(200).json({type: 'LOGOUT_SUCCESS'})
})

module.exports = router