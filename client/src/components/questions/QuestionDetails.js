import React from 'react'

const QuestionDetails = (props) => {
  const id = props.match.params.id;
  return (
    <div className="container section question-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Question - { id }</span>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et labore quaerat quibusdam vel saepe, ab voluptate accusantium culpa nemo fuga earum? Soluta amet nobis officia sed neque fuga aperiam quia?</p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>Posted by Me</div>
          <div>27th February, 9pm</div>
        </div>
      </div>
    </div>
  )
}

export default QuestionDetails 