const router = require('express').Router()
const passport = require('passport')
const userModel = require('../models/user.models')
const questionModel = require('../models/questions.models')
const commentModel = require('../models/comments.models')
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth')
const flash = require('express-flash')

router.use(flash())

//Successful login
router.get('/recent-questions', async (req, res) => {

    const questions = await questionModel.find({visibility: 'Public'}).sort({ creationTime: -1 }).limit(15)
    let i,comments
    for(i=0; i<questions.length; i++) {
        comments = await commentModel.find({ questionId: questions[i]._id }).sort({ creationTime: -1 }).limit(3)
        questions[i].coms = comments
    }
    // console.log('backend', questions)
    return res.status(200).json({type: 'RECENT_QUESTIONS', questions: questions})
})

//My Questions page for Tutor and Student
router.get('/:uname/my-questions', checkAuthenticated, async (req, res) => {
    
    const uname = req.params.uname

    let user = await userModel.findOne({ uname: uname })
    // let questions = await questionModel.find({ stuname: uname }).sort({ creationTime: -1 })

    let i,j,question
    let comments
    let questions = []
    for(i=0; i<user.questions.length; i++) {
        question = await questionModel.find({ _id: (user.questions)[i] })
        comments = []
        for(j=0; j<question.comments.length; j++) {
            comments.push(await commentModel.find({ _id: question.comments[j] }))
        }
        question.comments = comments
        questions.push(question)
    }
    
    return res.json(questions)
})

router.post('/:uname/my-questions', async (req, res) => {
    
    const uname = req.params.uname
    console.log('uname profile home',uname)
    const content = req.body.content
    const subject = req.body.subject
    const isAnswered = false
    const creationTime = Math.floor(Date.now()/1000)                        //unix timestamp in seconds
    const expirationTime = Math.floor(Date.now()/1000) + 200              // 1 day = 86400 seconds
    const visibility = req.body.visibility
    const anonymous = req.body.anonymous

    let question = {
        content: content,
        subject: subject,
        isAnswered: isAnswered,
        creationTime: creationTime,
        expirationTime: expirationTime,
        stuname: uname,
        visibility: visibility,
        anonymous: anonymous
    }

        let tut = await userModel.find({ subjects: subject })
        console.log(tut)
        let i,pos
        if(tut.length) {
            let low = (tut[0].questions).length
            pos = 0
            for(i=1; i<tut.length; i++) {
                if(tut.uname !== uname && (tut[i].questions).length < low) {
                    low = (tut[i].questions).length
                    pos = i
                }
            }
            question.tutname = tut[pos].uname
        } else {
            question.tutname = 'None'
        }

    let model = new questionModel(question);
    await model.save()

    if(tut.length) {
        await userModel.updateOne(
            { uname: tut[pos].uname },
            { $addToSet: { questions: [ model._id ] } },
            { new: true })
    }

    await userModel.updateOne(
            { uname: uname },
            { $addToSet: { questions: [ model._id ] } },
            { new: true })
    console.log('question model', model)
    return res.status(200).json({type: 'RAISE_QUESTION', question: model})
})

router.post('/tutor/:uname/my-questions/:id', checkAuthenticated, async (req, res) => {

    const uname = req.params.uname
    const id = req.params.id
    const solution = req.body.solution

    await questionModel.updateOne({ _id: id }, { solution: solution , isAnswered: true})

    res.redirect(`/tutor/${uname}/my-questions`)
})

router.post('/:type/:uname/my-questions/:id/comment', checkAuthenticated, async (req, res) => {

    const uname = req.params.uname
    const id = req.params.id
    const comment = req.body.comment
    const creationTime = Math.floor(Date.now()/1000)
    const type = req.params.type

    let newcomment = {
        content: comment,
        creationTime: creationTime,
        uname: uname,
        questionId: id
    }
    let model = new commentModel(newcomment);
    await model.save()

    await questionModel.updateOne({ _id: id }, { $addToSet: { comments: [ model._id ] } }, { new: true } )

    res.redirect(`/${type}/${uname}/my-questions`)
})

module.exports = router