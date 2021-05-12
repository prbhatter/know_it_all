import React from 'react'
import QuestionSummary from './QuestionSummary'
const QuestionList = ({questions,assignedquestionpage,myquestionscheck}) => {
  return (
    <div className="question-list section">
      { questions && questions.map(question => {
        // console.log(question)
        if(question && question._id) {
          return (
            <QuestionSummary question={question} key={question._id} assignedquestionpage={assignedquestionpage} myquestionscheck={myquestionscheck}/>
          )
        } else {
          return null
        }
        
      })}
    </div>
  )
}

export default QuestionList