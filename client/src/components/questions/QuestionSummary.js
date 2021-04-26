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
class QuestionSummary extends React.Component  {
  state={
    display:false
  }
  handleClick() {
      console.log('buton click');
    }
  render() {
    console.log('ques summary',this.props.assignedquestionpage) 
    const name = ( this.props.question.anonymous == 'Yes' ) ? 'Anonymous' : this.props.question.stuname
    const utc = this.props.question.creationTime
    // const m = moment.unix(utc).utc().format('YYYY-MM-DD HH:mm:ss');
    // console.log(m);
   const content= this.props.assignedquestionpage?<NavLink to={`/answer-page/${this.props.question._id}`}><span className="card-title ">{ this.props.question.content }</span></NavLink>:<span className="card-title ">{ this.props.question.content }</span> 
    return (
    <div className="card z-depth-0 question-summary">
        <div className="card-content grey-text text-darken-3">
          {content}
          <p>Posted by { name }</p> 
          <p className="grey-text">{ utc }</p>
          <button onClick={this.handleClick}>Comment</button>
                    
          {/* <button className="btn pink lighten-3">Submit</button> */}
        </div> 
    </div>
  )
}}




export default QuestionSummary