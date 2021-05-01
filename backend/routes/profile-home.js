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

  

router.post('/:uname/my-questions',checkAuthenticated, async (req, res) => 
{
    console.log('profile home my-questions', req)
        const uname = req.params.uname
        const content = req.body.content
        const subject = req.body.subject
        const isAnswered = false
        const creationTime = Math.floor(Date.now()/1000)                        //unix timestamp in seconds
        const expirationTime = Math.floor(Date.now()/1000) + 15              // 1 day = 86400 seconds
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
    
    // } else if(reassign == 'same') {

    //     const uname = req.params.uname
    //     const isAnswered = false
    //     const creationTime = Math.floor(Date.now()/1000)                        //unix timestamp in seconds
    //     const expirationTime = Math.floor(Date.now()/1000) + 15              // 1 day = 86400 seconds
    //     const expired = false

    //     const questionUpdate = {
    //         isAnswered: isAnswered,
    //         expirationTime: expirationTime,
    //         expired: expired
    //     }
    //     const question = req.data

    //     const newQuestion = await questionModel.findOneAndUpdate(
    //         {_id: question._id},
    //         questionUpdate
    //     )

    //     let notification = {
    //         type: 'REASSIGN_QUESTION',
    //         creationTime: creationTime,
    //         expirationTime: expirationTime,
    //         stuname: newQuestion.stuname,
    //         tutname: newQuestion.tutname,
    //         subject: newQuestion.subject,
    //         questionId: newQuestion._id,
    //         question: newQuestion
    //     }
    //     let newNotificationModel = new notificationModel(notification)
    //     await newNotificationModel.save();

    //     console.log('newNotificationModel ', newNotificationModel)

    //     const clients = req.clients;
    //     // console.log('profile home req.clients', clients)

    //     let socket = clients[question.stuname]
    //     if(socket){
    //         socket.emit('notify', newNotificationModel);
    //     }
    //     if(question.tutname != 'None') {
    //         socket = clients[newQuestion.tutname]
    //         if(socket){
    //             socket.emit('notify', newNotificationModel);
    //         }
    //     }
    //     return res.status(200).json({type: 'REASSIGN_QUESTION', question: newQuestion})


    // } else if(reassign == 'different') {
    //     const uname = req.params.uname
    //     const isAnswered = false
    //     const creationTime = Math.floor(Date.now()/1000)                        //unix timestamp in seconds
    //     const expirationTime = Math.floor(Date.now()/1000) + 15              // 1 day = 86400 seconds
    //     const expired = false

    //     const question = req.data

    //     const alltut = question.alltut
    //     const tutname = 'None'

    //         let tut = await userModel.find({ subjects: subject })
    //     // console.log('profile home',tut)
    //         let i,pos,flag=0;
    //         if(tut.length) {
    //             for(i=0; i<tut.length; i++) {
    //                 if(tut[i].uname != uname && !alltut.includes(tut[i].uname)) {
    //                     flag=1;
    //                     break;
    //                 }
    //             }

    //             if(!flag){
    //                 i=0;
    //             }
    //             let low = (tut[i].meraquestions).length
    //             pos = i
    //             for(++i; i<tut.length; i++) {
    //                 if(tut[i].uname != uname && (tut[i].meraquestions).length < low && (!flag || !alltut.includes(tut[i].uname))) {
    //                     low = (tut[i].meraquestions).length
    //                     pos = i
    //                     tutname = tut[i].uname
    //                 }
    //             }
    //         }

    //         const newQuestion = await questionModel.findOneAndUpdate(
    //                                 {_id: question._id},
    //                                 {
    //                                     isAnswered: isAnswered,
    //                                     expirationTime: expirationTime,
    //                                     expired: expired,
    //                                     tutname: tutname,
    //                                     $addToSet: { alltut: [ tutname ] }
    //                                 }
    //                             )

    //     if(tut.length) {
    //         await userModel.updateOne(
    //             { uname: newQuestion.tutname },
    //             { $addToSet: { merekodiyaquestions: [ newQuestion._id ] } },
    //             { new: true })
    //     }

    //     let notification = {
    //         type: 'REASSIGN_QUESTION',
    //         creationTime: creationTime,
    //         expirationTime: expirationTime,
    //         stuname: newQuestion.stuname,
    //         tutname: newQuestion.tutname,
    //         subject: newQuestion.subject,
    //         questionId: newQuestion._id
    //     }
    //     let newNotificationModel = new notificationModel(notification)
    //     await newNotificationModel.save();

    //     console.log('newNotificationModel ', newNotificationModel)

    //     const clients = req.clients;
    //     // console.log('profile home req.clients', clients)

    //     let socket = clients[newQuestion.stuname]
    //     if(socket){
    //         socket.emit('notify', newNotificationModel);
    //     }
    //     if(tutname != 'None'){
    //         socket = clients[newQuestion.tutname]
    //         if(socket){
    //             socket.emit('notify', newNotificationModel);
    //         }
    //     }

    //     return res.status(200).json({type: 'REASSIGN_QUESTION', question: newQuestion })

    // } else {
    //     const uname = req.params.uname
    //     const isAnswered = false
    //     const creationTime = Math.floor(Date.now()/1000)                        //unix timestamp in seconds
    //     const expirationTime = Math.floor(Date.now()/1000) + 15              // 1 day = 86400 seconds
    //     const expired = false

    //     const question = req.data

    //     const tutname = 'None'

    //         let tut = await userModel.find({ subjects: subject })
    //     // console.log('profile home',tut)
    //         let i,pos;
    //         if(tut.length) {
    //             let low = (tut[0].meraquestions).length
    //             pos = 0
    //             for(i=1; i<tut.length; i++) {
    //                 if(tut[i].uname != uname && (tut[i].meraquestions).length < low) {
    //                     low = (tut[i].meraquestions).length
    //                     pos = i
    //                     tutname = tut[i].uname
    //                 }
    //             }
    //         }

    //         const newQuestion = await questionModel.findOneAndUpdate(
    //                                 {_id: question._id},
    //                                 {
    //                                     isAnswered: isAnswered,
    //                                     expirationTime: expirationTime,
    //                                     expired: expired,
    //                                     tutname: tutname,
    //                                     $addToSet: { alltut: [ tutname ] }
    //                                 }
    //                             )

    //     if(tut.length) {
    //         await userModel.updateOne(
    //             { uname: newQuestion.tutname },
    //             { $addToSet: { merekodiyaquestions: [ newQuestion._id ] } },
    //             { new: true })
    //     }

    //     let notification = {
    //         type: 'REASSIGN_QUESTION',
    //         creationTime: creationTime,
    //         expirationTime: expirationTime,
    //         stuname: newQuestion.stuname,
    //         tutname: newQuestion.tutname,
    //         subject: newQuestion.subject,
    //         questionId: newQuestion._id
    //     }
    //     let newNotificationModel = new notificationModel(notification)
    //     await newNotificationModel.save();

    //     console.log('newNotificationModel ', newNotificationModel)

    //     const clients = req.clients;
    //     // console.log('profile home req.clients', clients)

    //     let socket = clients[newQuestion.stuname]
    //     if(socket){
    //         socket.emit('notify', newNotificationModel);
    //     }
    //     if(tutname != 'None'){
    //         socket = clients[newQuestion.tutname]
    //         if(socket){
    //             socket.emit('notify', newNotificationModel);
    //         }
    //     }

    //     return res.status(200).json({type: 'REASSIGN_QUESTION', question: newQuestion })
    // }
    
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

module.exports = router