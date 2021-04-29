const router = require('express').Router()
const passport = require('passport')
const userModel = require('../models/user.models')
const questionModel = require('../models/questions.models')
const commentModel = require('../models/comments.models')
const notificationModel = require('../models/notifications.models')
const answerModel = require('../models/answer.models')
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
router.get('/:uname/assigned-questions',checkAuthenticated, async (req, res) => {
    const uname = req.params.uname
    console.log(uname)
    let user = await userModel.findOne({ uname: uname })
    let questions = []
    for(i=user.merekodiyaquestions.length-1; i>=0; i--) {
        question = await questionModel.findOne({ _id: (user.merekodiyaquestions)[i] })
        console.log('profile home',question)
        
        questions.push(question)
    }
    return res.status(200).json({type: 'ASSIGNED_QUESTIONS', assignquestions: questions})
})
router.get('/check-answer/:id',checkAuthenticated, async (req, res) => {
   
       const id=req.params.id;
       let checkquestion=await questionModel.findOne({_id: id });
       console.log('CHECK ANSWER', checkquestion)
       let checkanswer=await answerModel.find({quesid: id });
       return res.status(200).json({type: 'CHECK_ANSWER', checkquestion: checkquestion,checkanswer: checkanswer})       

})
//My Questions page for Tutor and Student
router.get('/:uname/my-questions',checkAuthenticated, async (req, res) => {
    
    const uname = req.params.uname
    console.log(uname)
    
    let user = await userModel.findOne({ uname: uname })
    // let questions = await questionModel.find({ stuname: uname }).sort({ creationTime: -1 })
    console.log('QUEE',user)

    let i,j,question
    let comments
    let questions = []
    for(i=user.meraquestions.length-1; i>=0; i--) {
       // console.log('BC',(user.meraquestions)[i])    
        question = await questionModel.findOne({ _id: ((user.meraquestions)[i]) })
         

        // comments = []
        // for(j=question.comments.length-1; j>=0; j--) {
        //     comments.push(await commentModel.find({ _id: question.comments[j] }))
        // }
        // question.comments = comments
        questions.push(question)
    }
    
    return res.status(200).json({type: 'MY_QUESTIONS', myquestions: questions})
})

router.post('/answer-questions/:id', checkAuthenticated,async (req, res) =>
{
    const answer=req.body.content;
    const quesid=req.params.id;
    console.log('PROFILE HOME',answer);
    let sol={
         content : answer,
         quesid : quesid
    } 
    let model = new answerModel(sol);
    console.log('QUESTION ID',quesid);
    await model.save()
    await questionModel.updateOne( 
        { _id: quesid },
        { $addToSet: { solution: [answer] } }, 
        { new: true })
    await questionModel.updateOne({ _id: quesid }, {
            isAnswered: true
    });
    let question = await questionModel.findOne({ _id: quesid });
    console.log('question answered', question)
    const creationTime = Math.floor(Date.now()/1000)                        //unix timestamp in seconds
    let notification = {
        type: "ANSWER_QUESTION",
        creationTime: creationTime,
        stuname: question.stuname,
        tutname: question.tutname,
        subject: question.subject,
        questionId: question._id
    }
    let newNotificationModel = new notificationModel(notification)
    await newNotificationModel.save();

    console.log('newNotificationModel ', newNotificationModel)

    const clients = req.clients;
    console.log('profile home req.clients', clients)

    let socket = clients[question.stuname]
    if(socket){
        socket.emit('notify', newNotificationModel);
    }
    socket = clients[question.tutname]
    if(socket){
        socket.emit('notify', newNotificationModel);
    }
    return res.status(200).json({type: 'ANSWER_QUESTION', solution: sol})
})

  

router.post('/:uname/my-questions',checkAuthenticated, async (req, res) => 
{
    
    const uname = req.params.uname
    const content = req.body.content
    const subject = req.body.subject
    const isAnswered = false
    const creationTime = Math.floor(Date.now()/1000)                        //unix timestamp in seconds
    const expirationTime = Math.floor(Date.now()/1000) + 15              // 1 day = 86400 seconds
    const visibility = req.body.visibility
    const anonymous = req.body.anonymous
    const expired = 'false'

    let question = {
        content: content,
        subject: subject,
        isAnswered: isAnswered,
        creationTime: creationTime,
        expirationTime: expirationTime,
        stuname: uname,
        visibility: visibility,
        anonymous: anonymous,
        expired: expired
    }

        let tut = await userModel.find({ subjects: subject })
       // console.log('profile home',tut)
        let i,pos
        if(tut.length) {
            let low = (tut[0].meraquestions).length
            pos = 0
            for(i=1; i<tut.length; i++) {
                if(tut.uname !== uname && (tut[i].meraquestions).length < low) {
                    low = (tut[i].meraquestions).length
                    pos = i
                }
            }
            question.tutname = tut[pos].uname 
        } else {
            question.tutname = 'None'
        }
 
    let model = new questionModel(question);

    question = await model.save()

    if(tut.length) {
        await userModel.updateOne(
            { uname: tut[pos].uname },
            { $addToSet: { merekodiyaquestions: [ model._id ] } },
            { new: true })

    }
    
    await userModel.updateOne(
            { uname: uname },
            { $addToSet: { meraquestions: [ model._id ] } },
            { new: true })
    console.log('question model', model)

    let notification = {
        type: "RAISE_QUESTION",
        creationTime: creationTime,
        expirationTime: expirationTime,
        stuname: question.stuname,
        tutname: question.tutname,
        subject: subject,
        questionId: question._id
    }
    let newNotificationModel = new notificationModel(notification)
    await newNotificationModel.save();

    console.log('newNotificationModel ', newNotificationModel)

    const clients = req.clients;
    console.log('profile home req.clients', clients)

    let socket = clients[question.stuname]
    if(socket){
        socket.emit('notify', newNotificationModel);
    }
    socket = clients[question.tutname]
    if(socket){
        socket.emit('notify', newNotificationModel);
    }
    return res.status(200).json({type: 'RAISE_QUESTION', question: model})
})

router.post('/tutor/:uname/my-questions/:id', checkAuthenticated, async (req, res) => {

    const uname = req.params.uname
    const id = req.params.id
    const solution = req.body.solution

    await questionModel.updateOne({ _id: id }, { solution: solution , isAnswered: true})

    res.redirect(`/tutor/${uname}/my-questions`)
})

router.post('/:uname/my-questions/:id/comment', checkAuthenticated, async (req, res) => {

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

router.get('/:uname/my-notifications', checkAuthenticated, async (req, res) => {
    
    const uname = req.params.uname
    console.log(uname)
    
    let notifications = await notificationModel.find({ $or: [ { stuname: uname }, { tutname: uname } ] })
    console.log('mynotifications', notifications)
    return res.status(200).json({type: 'MY_QUESTIONS', mynotifications: notifications})
})

module.exports = router