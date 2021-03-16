const initState = {
  questions: [
    {id: '1', content: 'What is Physics', subject: 'Physics'},
    {id: '2', content: 'What is Maths', subject: 'Mathematics'},
    {id: '3', content: 'What is Chemistry', subject: 'Chemistry'}
  ]
}

const questionReducer = (state = initState, action) => {
  switch (action.type) {
    case 'RAISE_QUESTION':
      console.log('raise question', action.question);
      return {
        ...state,
        questions: [action.payload, ...state.questions]
      }
    case 'MY_QUESTIONS':
      console.log('my questions', action.question);
      return {
        ...state,
        myquestions: action.payload,
      }
    default:
      console.log('raise question', action.question);
      return state
  }
};

export default questionReducer;