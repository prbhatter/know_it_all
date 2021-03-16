import React, { Component } from 'react'
import QuestionList from './QuestionList'
import Notifications from '../dashboard/Notifications'
import { connect } from 'react-redux'
import { myQuestions } from '../../store/actions/questionActions'

class MyQuestions extends Component {
  render() {
    console.log(this.props)
    const { myquestions } = this.props
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <QuestionList questions={myquestions}/>
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
    questions: state.question.myquestions
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    myQuestions: (uname) => dispatch(myQuestions(uname))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyQuestions)