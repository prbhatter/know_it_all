import authReducer from './authReducer'
import questionReducer from './questionReducer'
import notificationReducer from './notificationReducer'
import { combineReducers } from 'redux'

const appReducer = combineReducers({
    auth: authReducer,
    question: questionReducer,
    notification: notificationReducer
});

const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === 'LOGOUT_SUCCESS') {
      // we keep a reference of the keys we want to maintain
      // other keys will be passed as undefined and this will call
      // reducers with an initial state
    //   const { auth, question } = state;
      // console.log('root reducer', state)
      const ques = state.question.questions
      state = undefined
      state = {question: {questions: ques}}
      // storage.removeItem('persist:root')
    }
  
    return appReducer(state, action);
}; 

export default rootReducer

// the key name will be the data property on the state object