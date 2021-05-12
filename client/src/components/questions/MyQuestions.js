import React from 'react'
import QuestionList from './QuestionList'
import Notifications from '../dashboard/Notifications'
import { connect } from 'react-redux'
import Navbar from '../layout/Navbar'
import { myQuestions } from '../../store/actions/questionActions'

class MyQuestions extends React.Component {
  componentDidMount() {
    console.log('MyQuestions', this.props.uname)
    this.props.uname && this.props.myQuestions(this.props.uname)
  } 
  render() {
    const { myquestions } = this.props
    return (
      <div className="dashboard container">
        < Navbar />
        <div className="row"> 
          <div className="col s12 m6"> 
            <QuestionList questions={myquestions} assignedquestionpage={false} myquestionscheck={true} />
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
  console.log('my questions js',state.question.myquestions) 
  return {
    myquestions: state.question.myquestions,
    uname: state.auth.user.uname
  }
} 

const mapDispatchToProps = (dispatch) => {
  return {
    myQuestions: (uname) => dispatch(myQuestions(uname))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyQuestions)