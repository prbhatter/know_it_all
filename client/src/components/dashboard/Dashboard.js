import React, { Component } from 'react'
import QuestionList from '../questions/QuestionList'
import Notifications from './Notifications'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    // console.log(this.props)
    const { questions } = this.props
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <QuestionList questions={questions}/>
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.question.questions
  }
}

export default connect(mapStateToProps)(Dashboard)