const initState = {
  questions: [
    {id: '1', content: 'What is Physics'},
    {id: '2', content: 'What is Maths'},
    {id: '3', content: 'What is Chemistry'}
  ]
}

const questionReducer = (state = initState, action) => {
  return state;
};

export default questionReducer;