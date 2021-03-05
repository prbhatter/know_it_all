import React from 'react'
import QuestionSummary from './QuestionSummary'

const QuestionList = ({questions}) => {
  return (
    <div className="question-list section">
      { questions && questions.map(question => {
        return (
          <QuestionSummary question={question} key={question.id} />
        )
      })}
    </div>
  )
}

export default QuestionList