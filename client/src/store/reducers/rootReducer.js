import authReducer from './authReducer'
import questionReducer from './questionReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    question: questionReducer
});

export default rootReducer
  
// the key name will be the data property on the state object