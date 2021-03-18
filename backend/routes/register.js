const router = require('express').Router()
const bcrypt = require('bcrypt')
const userModel = require('../models/user.models')
const questionModel = require('../models/questions.models')
const flash = require('express-flash')
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth')

router.use(flash())     //flash is used to print certain informative messages like errors

//GET request to register for Tutor and Student
router.get('/register', checkNotAuthenticated, (req,res) => {
    res.render(`join.ejs`, { message: req.flash('error'), type: type })
})

//POST request to register for Tutor and Student
router.post('/register', checkNotAuthenticated, async (req,res) => {
    if(!req.body) {
        return res.status(400).send('Request body is empty')
    }
    // console.log('registered', req.body)
    // return res.status(200).json({"data": "Server"})
    
    const firstname = req.body.firstName
    const lastname = req.body.lastName
    const uname = req.body.uname
    const type = req.body.type
    const subjects = req.body.subjects
    const email = req.body.email
    const password = req.body.password
    const contact = req.body.contact
    const whatsapp = req.body.whatsapp

    await userModel.findOne({
        uname: uname
    }, async (err,doc) => {
        try{
            if(doc) {                                                               //Username already in use
                req.flash('error', 'Username already exists. Please use some other username')
                return res.status(200).json({type: 'USER_EXISTS'})
            } else {
                const isEmail = await userModel.findOne({ email: email })
                if(isEmail) {                                                       //Email already in use
                    req.flash('error', 'Email already exists. Please use some other email')
                    return res.status(200).json({type: 'EMAIL_EXISTS'})
                }
                const hashedPassword = await bcrypt.hash(password, 10)     //Hashing the password
                let user = {
                    firstname: firstname,
                    lastname: lastname,
                    uname: uname,
                    email: email,
                    contact : contact,
                    password: hashedPassword,
                    type: type,
                    subjects: subjects,
                    whatsapp: whatsapp
                }
                if(type == 'Tutor') {
                    //console.log(typeof(subjects))
                    let len
                    let ques = []
                    if(typeof(subjects) == 'string') {
                        len = 1;
                    } else {
                        len = subjects.length
                    }
                    //console.log(len)

                    for(let i=0; i<len; i++) {
                        let sub
                        if(len == 1) {
                            sub = subjects
                        }
                        else {
                            sub = subjects[i]
                        }
                        // console.log(sub)
                        await questionModel.updateMany({
                            subject: sub, tutname: 'None'
                        }, { tutname: uname })

                        const questions = await questionModel.find({
                            subject: sub, tutname: uname
                        })
                        // console.log('After update', questions)
                        if(questions && questions.length) {
                            for(let j=0; j<questions.length; j++) {
                                ques.push(questions[j]._id)
                            }
                        }
                    }
                    // console.log('questions: ', ques)

                    if(ques.length){
                        user.questions = ques
                    }
                }
                // console.log(user)
                let model = new userModel(user);
                await model.save()
                return res.status(200).json({type: 'REGISTER_SUCCESS', user: model})                //Successful registration, redirect to respective login page
                
            }
        } catch(err) {
            return res.status(500).json(err)                                      //Some error is encountered
        }
    })
})


module.exports = router