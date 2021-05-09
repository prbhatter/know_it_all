import React, { Component } from 'react'
import QuestionList from '../questions/QuestionList'
import Navbar from '../layout/Navbar'
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
    const notifications = (this.props.user)?<div className="col s12 m5 offset-m1">
                                                    <Notifications/>
                                                </div>
                                                : null
    return (
      <div>
        <Navbar />
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <QuestionList questions={questions} /> 
          </div>
          { notifications }
        </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('dasboard map', state)
  return {
    questions: state.question.questions,
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    recentQuestions: () => dispatch(recentQuestions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)