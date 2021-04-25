import React from 'react'
import QuestionSummary from './QuestionSummary'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withRouter } from "react-router";
const QuestionList = ({questions,assignedquestionpage}) => {
  return (
    <div className="question-list section">
      { questions && questions.map(question => {
        // console.log(question)
        if(question != null && question._id != null) {
          return (
            <QuestionSummary question={question} key={question._id} assignedquestionpage={assignedquestionpage} />
          )
        } else {
          return null
        }
        
      })}
    </div>
  )
}

export default QuestionList