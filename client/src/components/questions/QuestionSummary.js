import React from 'react'
// import { moment } from 'moment'

const QuestionSummary = ({question}) => {
  const name = ( question.anonymous == 'Yes' ) ? 'Anonymous' : question.stuname
  const utc = question.creationTime
  // const m = moment.unix(utc).utc().format('YYYY-MM-DD HH:mm:ss');
  // console.log(m);
  return (
    <div className="card z-depth-0 question-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title ">{ question.content }</span>
          <p>Posted by { name }</p>
          <p className="grey-text">{ utc }</p>
        </div>
    </div>
  )
}

export default QuestionSummary