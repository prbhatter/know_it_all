// const initState = {
//   questions: [
//     {_id: '1', content: 'What is Physics', subject: 'Physics'},
//     {_id: '2', content: 'What is Maths', subject: 'Mathematics'},
//     {_id: '3', content: 'What is Chemistry', subject: 'Chemistry'}
//   ]
// }

const initState = {
  questions: [],
  myquestions:[],
  assignquestions:[],
  checkquestion:{},
  solution:[],
  messages: []
}

const questionReducer = (state = initState, action) => {
  // console.log('questionReducer type', action.type)
  // console.log('questionReducer state', state)
  let stateQuestions = state.questions
  
  switch (action.type) {
    case 'RAISE_QUESTION': 
      // console.log('raise question', action.payload);
      return {
        ...state,
        questions: [action.payload.question, ...state.questions]
      }
    case 'REASSIGN_QUESTION': 
      console.log('reassign question', action.payload);
      stateQuestions.forEach(question => {
        if(question._id == action.payload.question._id){
          question = action.payload.question
        }
      });
      return {
        ...state,
        questions: stateQuestions
      }
    case 'CLOSED_QUESTION': 
        console.log('closed question', action.payload);
        stateQuestions = state.questions
        stateQuestions.forEach(question => {
          if(question._id == action.payload.question._id){
            question = action.payload.question
          }
        });
        return {
          ...state,
          questions: stateQuestions
        }
    case 'RAISE_COMMENT': 
       console.log('raise comment', action.payload);
      return {
        ...state,
        //comments: [action.payload.question, ...state.questions]
      }
    case 'QUESTION_COMMENTS': 
      console.log('question comments question reducer', action.payload.questioncomments);
      return {
        ...state,
        questioncomments: action.payload.questioncomments
      }
    case 'GET_QUESTION': 
      console.log('GET questions question reducer', action.payload.getquestion);
      return {
        ...state,
        getquestion: action.payload.getquestion
      }  
    case 'MY_QUESTIONS': 
      console.log('my questions question reducer', action.payload.myquestions);
      return {
        ...state,
        myquestions: action.payload.myquestions
      }
    case 'CHECK_ANSWER': 
      console.log('CHECK_ANSWER question reducer', action.payload);
      return{
        ...state,
        checkquestion: action.payload.checkquestion,
        checkanswer: action.payload.checkanswer
      }
    case 'ANSWER_QUESTION':  
      //console.log('my questions question reducer', action.payload.myquestions);
      return {  
        ...state,
        solution: action.payload.solution
      } 
    case 'ASSIGNED_QUESTIONS':
      // console.log('my questions', action.question);
      return {
        ...state,
        assignquestions: action.payload.assignquestions,
      }
    case 'RECENT_QUESTIONS':
      // console.log('recent questions', action.payload) 
      return {
        ...state,
        questions: action.payload.questions
      }
    case 'SEND_MESSAGE':
      console.log('SEND_MESSAGE',action.payload.message)
      return {
        ...state,
        messages: [...state.messages, action.payload.message]
    }
    case 'GET_MESSAGES':
      return {
        ...state,
        messages: action.payload.messages
    }
    case 'NEW_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }
    default:
      // console.log('default questionReducer', state);
      return state
  }
};

export default questionReducer;