import React from 'react'
import QuestionSummary from './QuestionSummary'

const QuestionList = ({questions}) => {
  return (
    <div className="question-list section">
      { questions && questions.map(question => {
        console.log(question)
        if(question != null && question._id != null) {
          return (
            <QuestionSummary question={question} key={question._id} />
          )
        } else {
          return null
        }
        
      })}
    </div>
  )
}

export default QuestionList