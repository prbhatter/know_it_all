import React from 'react'

const QuestionSummary = ({question}) => {
  return (
    <div className="card z-depth-0 question-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title ">{ question.content }</span>
          <p>Posted by Me</p>
          <p className="grey-text">27th February, 9pm</p>
        </div>
    </div>
  )
}

export default QuestionSummary