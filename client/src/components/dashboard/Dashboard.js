import React, { Component } from 'react'
import QuestionList from '../questions/QuestionList'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { recentQuestions } from '../../store/actions/questionActions'

class Dashboard extends Component {

  componentDidMount() {
    this.props.recentQuestions()
  }

  render() {
    // console.log('dashboard after logout', this.props)
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
  // console.log('dasboard map', state)
  return {
    questions: state.question.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    recentQuestions: () => dispatch(recentQuestions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)