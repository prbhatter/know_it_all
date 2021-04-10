// const initState = {
//   questions: [
//     {_id: '1', content: 'What is Physics', subject: 'Physics'},
//     {_id: '2', content: 'What is Maths', subject: 'Mathematics'},
//     {_id: '3', content: 'What is Chemistry', subject: 'Chemistry'}
//   ]
// }

const initState = {
  questions: []
}

const questionReducer = (state = initState, action) => {
  // console.log('questionReducer type', action.type)
  // console.log('questionReducer state', state)
  switch (action.type) {
    case 'RAISE_QUESTION':
      // console.log('raise question', action.payload);
      return {
        ...state,
        questions: [action.payload.question, ...state.questions]
      }
    case 'MY_QUESTIONS': 
      console.log('my questions question reducer', action.question);
      return {
        ...state,
        myquestions: action.payload.myquestions,
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
        questions: [...action.payload.questions]
      }
    default:
      // console.log('default questionReducer', state);
      return state
  }
};

export default questionReducer;