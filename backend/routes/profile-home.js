const router = require('express').Router()
const passport = require('passport')
const userModel = require('../models/user.models')
const questionModel = require('../models/questions.models')
const messageModel = require('../models/messages.models')
const commentModel = require('../models/comments.models')
const notificationModel = require('../models/notifications.models')
const answerModel = require('../models/answer.models')
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth')
const flash = require('express-flash')
const messagesModels = require('../models/messages.models')
const { findById } = require('../models/user.models')

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

router.get('/comments/:id', async (req, res) => {
    //console.log('HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
    const id = req.params.id
    // console.log('QUES COMMENTS',id)
    let comments = await commentModel.find({ questionId: id })
    console.log('QUES COMMENTS',comments) 
    return res.status(200).json({type: 'QUESTION_COMMENTS', questioncomments: comments})
})

router.get('/getquestion/:id', async (req, res) => {
    console.log('HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
    const id = req.params.id
    // console.log('QUES COMMENTS',id)
    let getquestion = await questionModel.findOne({ _id: id })
    console.log('GET QUES',getquestion) 
    return res.status(200).json({type: 'GET_QUESTION', getquestion: getquestion})
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
    // await questionModel.updateOne({ _id: quesid }, {
    //         isAnswered: true
    // });
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




router.post('/:uname/:id/raisecomment', checkAuthenticated,async (req, res) =>
{
    const commentreceived=req.body.content;
    const quesid=req.params.id;
    const uname=req.params.uname;
    console.log('PROFILE HOME COMMENT',commentreceived);
    let comment={
         uname: uname,
         content : commentreceived, 
         questionId : quesid
    } 
    let model = new commentModel(comment);
    // console.log('CO ID',quesid);
    await model.save()
    await questionModel.updateOne( 
        { _id: quesid },
        { $addToSet: { comments: [model._id] } }, 
        { new: true })
    // await questionModel.updateOne({ _id: quesid }, {
    //         isAnswered: true
    //       }); 
    return res.status(200).json({type: 'RAISE_COMMENT', comment: comment})
})

  

router.post('/:uname/my-questions',checkAuthenticated, async (req, res) => {

    const reassign = req.body.reassignType
    console.log('reassign type', reassign)
    if(!reassign){
        const uname = req.params.uname
        const content = req.body.content
        const subject = req.body.subject
        const isAnswered = false
        const creationTime = Math.floor(Date.now()/1000)                        //unix timestamp in seconds
        const expirationTime = Math.floor(Date.now()/1000) + 1000              // 1 day = 86400 seconds
        const visibility = req.body.visibility
        const anonymous = req.body.anonymous
        const expired = false

        let question = {
            content: content,
            subject: subject,
            isAnswered: isAnswered,
            creationTime: creationTime,
            expirationTime: expirationTime,
            stuname: uname,
            visibility: visibility,
            anonymous: anonymous,
            expired: expired,
            alltut: []
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
        
        question.alltut.push(question.tutname)

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
            type: 'RAISE_QUESTION',
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
        // console.log('profile home req.clients', clients)

        let socket = clients[question.stuname]
        if(socket){
            socket.emit('notify', newNotificationModel);
        }
        if(question.tutname != 'None') {
            socket = clients[question.tutname]
            if(socket){
                socket.emit('notify', newNotificationModel);
            }
        }

        return res.status(200).json({type: 'RAISE_QUESTION', question: model})
    
    } else if(reassign == 'same') {

        const uname = req.params.uname
        const isAnswered = false
        const creationTime = Math.floor(Date.now()/1000)                        //unix timestamp in seconds
        const expirationTime = Math.floor(Date.now()/1000) + 1000              // 1 day = 86400 seconds
        const expired = false

        const questionUpdate = {
            isAnswered: isAnswered,
            expirationTime: expirationTime,
            expired: expired
        }
        const question = req.body
        console.log('question reassign same', question)

        const newQuestion = await questionModel.findOneAndUpdate(
            {_id: question._id},
            questionUpdate
        )
        console.log('newQuestion', newQuestion);
        let notification = {
            type: 'REASSIGN_QUESTION',
            creationTime: creationTime,
            expirationTime: expirationTime,
            stuname: newQuestion.stuname,
            tutname: newQuestion.tutname,
            subject: newQuestion.subject,
            questionId: newQuestion._id
        }
        let newNotificationModel = new notificationModel(notification)
        await newNotificationModel.save();

        console.log('newNotificationModel ', newNotificationModel)

        const clients = req.clients;
        // console.log('profile home req.clients', clients)

        let socket = clients[question.stuname]
        if(socket){
            socket.emit('notify', newNotificationModel);
        }
        if(question.tutname != 'None') {
            socket = clients[newQuestion.tutname]
            if(socket){
                socket.emit('notify', newNotificationModel);
            }
        }
        return res.status(200).json({type: 'REASSIGN_QUESTION', question: newQuestion})

    } else if(reassign == 'different') {
        const uname = req.params.uname
        const isAnswered = false
        const creationTime = Math.floor(Date.now()/1000)                        //unix timestamp in seconds
        const expirationTime = Math.floor(Date.now()/1000) + 1000              // 1 day = 86400 seconds
        const expired = false
        const subject = req.body.subject

        const question = req.body
        console.log('question reassign different', question)

        const alltut = question.alltut
        let tutname = 'None'

            let tut = await userModel.find({ subjects: subject })
        console.log('profile home',tut)
            let i,pos,flag=0;
            if(tut.length) {
                for(i=0; i<tut.length; i++) {
                    if(tut[i].uname != uname && !alltut.includes(tut[i].uname)) {
                        flag=1;
                        break;
                    }
                }

                if(!flag){
                    i=0;
                }
                let low = (tut[i].meraquestions).length
                pos = i
                tutname = tut[i].uname
                for(++i; i<tut.length; i++) {
                    if(tut[i].uname != uname && (tut[i].meraquestions).length < low && (!flag || !alltut.includes(tut[i].uname))) {
                        low = (tut[i].meraquestions).length
                        pos = i
                        tutname = tut[i].uname
                    }
                }
            }

            const newQuestion = await questionModel.findOneAndUpdate(
                                    {_id: question._id},
                                    {
                                        isAnswered: isAnswered,
                                        expirationTime: expirationTime,
                                        expired: expired,
                                        tutname: tutname,
                                        $addToSet: { alltut: [ tutname ] }
                                    }
                                )
            console.log('newQuestion', newQuestion);

        if(tut.length) {
            await userModel.updateOne(
                { uname: newQuestion.tutname },
                { $addToSet: { merekodiyaquestions: [ newQuestion._id ] } },
                { new: true })
        }

        let notification = {
            type: 'REASSIGN_QUESTION',
            creationTime: creationTime,
            expirationTime: expirationTime,
            stuname: newQuestion.stuname,
            tutname: newQuestion.tutname,
            subject: newQuestion.subject,
            questionId: newQuestion._id
        }
        let newNotificationModel = new notificationModel(notification)
        await newNotificationModel.save();

        console.log('newNotificationModel ', newNotificationModel)

        const clients = req.clients;
        // console.log('profile home req.clients', clients)

        let socket = clients[newQuestion.stuname]
        if(socket){
            socket.emit('notify', newNotificationModel);
        }
        if(tutname != 'None'){
            socket = clients[newQuestion.tutname]
            if(socket){
                socket.emit('notify', newNotificationModel);
            }
        }

        return res.status(200).json({type: 'REASSIGN_QUESTION', question: newQuestion })

    } else if(reassign == 'any'){
        const uname = req.params.uname
        const isAnswered = false
        const creationTime = Math.floor(Date.now()/1000)                        //unix timestamp in seconds
        const expirationTime = Math.floor(Date.now()/1000) + 1000              // 1 day = 86400 seconds
        const expired = false

        const question = req.body
        console.log('question reassign any', question)

        let tutname = 'None'

            let tut = await userModel.find({ subjects: subject })
        // console.log('profile home',tut)
            let i,pos;
            if(tut.length) {
                let low = (tut[0].meraquestions).length
                pos = 0
                for(i=1; i<tut.length; i++) {
                    if(tut[i].uname != uname && (tut[i].meraquestions).length < low) {
                        low = (tut[i].meraquestions).length
                        pos = i
                        tutname = tut[i].uname
                    }
                }
            }

            const newQuestion = await questionModel.findOneAndUpdate(
                                    {_id: question._id},
                                    {
                                        isAnswered: isAnswered,
                                        expirationTime: expirationTime,
                                        expired: expired,
                                        tutname: tutname,
                                        $addToSet: { alltut: [ tutname ] }
                                    }
                                )
            console.log('newQuestion', newQuestion);

        if(tut.length) {
            await userModel.updateOne(
                { uname: newQuestion.tutname },
                { $addToSet: { merekodiyaquestions: [ newQuestion._id ] } },
                { new: true })
        }

        let notification = {
            type: 'REASSIGN_QUESTION',
            creationTime: creationTime,
            expirationTime: expirationTime,
            stuname: newQuestion.stuname,
            tutname: newQuestion.tutname,
            subject: newQuestion.subject,
            questionId: newQuestion._id
        }
        let newNotificationModel = new notificationModel(notification)
        await newNotificationModel.save();

        console.log('newNotificationModel ', newNotificationModel)

        const clients = req.clients;
        // console.log('profile home req.clients', clients)

        let socket = clients[newQuestion.stuname]
        if(socket){
            socket.emit('notify', newNotificationModel);
        }
        if(tutname != 'None'){
            socket = clients[newQuestion.tutname]
            if(socket){
                socket.emit('notify', newNotificationModel);
            }
        }

        return res.status(200).json({type: 'REASSIGN_QUESTION', question: newQuestion })

    } else {

        const question = req.body
        console.log('question close', question)

        const newQuestion = await questionModel.findOneAndUpdate(
            {_id: question._id},
            { closed: true, tutname: 'None', isAnswered: true}
        )
        console.log('newQuestion', newQuestion);
        const creationTime = Math.floor(Date.now()/1000)                        //unix timestamp in seconds

        let notification = {
            type: 'CLOSED_QUESTION',
            creationTime: creationTime,
            stuname: newQuestion.stuname,
            tutname: newQuestion.tutname,
            subject: newQuestion.subject,
            questionId: newQuestion._id
        }
        let newNotificationModel = new notificationModel(notification)
        await newNotificationModel.save();

        console.log('newNotificationModel ', newNotificationModel)

        const clients = req.clients;
        // console.log('profile home req.clients', clients)

        let socket = clients[question.stuname]
        if(socket){
            socket.emit('notify', newNotificationModel);
        }
        return res.status(200).json({type: 'CLOSED_QUESTION', question: newQuestion})
    }
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
    //console.log('mynotifications', notifications)
    return res.status(200).json({type: 'MY_QUESTIONS', mynotifications: notifications})
})

router.get('/get-messages/:id', async (req, res) => {
    const quesid = req.params.id
    console.log('get messages profile home', quesid)
    const question = await questionModel.findOne({_id: quesid})
    const messages = await messageModel.find({ stuname: question.stuname, tutname: question.tutname, quesId: question._id })
    return res.status(200).json({type: 'GET_MESSAGES', messages: messages})
})

router.post('/send-message', async (req, res) => {
    console.log('send message', req.body)
    const question = req.body.question
    const content = req.body.content
    const user = req.body.user
    const creationTime = Math.floor(Date.now()/1000)                        //unix timestamp in seconds

    let message = {
        content: content,
        creationTime: creationTime,
        stuname: question.stuname,
        tutname: question.tutname,
        sender: user.uname,
        quesId: question._id
    }
    let newMessageModel = new messageModel(message)
    await newMessageModel.save()

    let notification = {
        type: 'SEND_MESSAGE',
        creationTime: creationTime,
        stuname: question.stuname,
        tutname: question.tutname
    }
    let newNotificationModel = new notificationModel(notification)
    await newNotificationModel.save();


    const clients = req.clients;
    console.log('profile home req.clients', clients)

    const chatReciever = (user.uname == question.tutname)?question.stuname:question.tutname
    console.log('chat reciever ', chatReciever)
    let socket = clients[chatReciever]
    if(socket){
        socket.emit('chat', newMessageModel);
        socket.emit('notify', newNotificationModel);
    }

    console.log('SEND MESSAGE', newMessageModel)
    return res.status(200).json({type: 'SEND_MESSAGE', message: newMessageModel})
})

module.exports = router