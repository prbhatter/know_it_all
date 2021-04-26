import React from 'react'
import '../auth/SignUp.css'
import Answer from './AnswerQuestion'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
// import { moment } from 'moment'

// function handleClick() {
//   console.log('buton click');
//   <textarea></textarea>
// }
const QuestionSummary = ({question,assignedquestionpage}) => {
  console.log('ques summary',assignedquestionpage) 
  const name = ( question.anonymous == 'Yes' ) ? 'Anonymous' : question.stuname
  const utc = question.creationTime
  // const m = moment.unix(utc).utc().format('YYYY-MM-DD HH:mm:ss');
  // console.log(m);
 const content= assignedquestionpage?<NavLink to={`/answer-page/${question._id}`}><span className="card-title ">{ question.content }</span></NavLink>:<span className="card-title ">{ question.content }</span> 
  return (
    <div className="card z-depth-0 question-summary">
        <div className="card-content grey-text text-darken-3">
          {content}
          <p>Posted by { name }</p>
          <p className="grey-text">{ utc }</p>
          <button>Comment</button>
          {/* <button className="btn pink lighten-3">Submit</button> */}
        </div> 
    </div>
  )
}




export default QuestionSummary