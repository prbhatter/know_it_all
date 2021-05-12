import React, { Component } from 'react'
import QuestionList from './QuestionList'
import Notifications from '../dashboard/Notifications'
import { connect } from 'react-redux' 
import { assignedQuestions } from '../../store/actions/questionActions'
import Navbar from '../layout/Navbar'
import { checkAnswer } from '../../store/actions/questionActions'
import '../auth/SignUp.css'
class AssignQuestions extends Component {
    componentDidMount() {
      this.props.assignedQuestions(this.props.uname)
    }
    render() {
        console.log(this.props) 
        const { assignquestions } = this.props
        return (
          <div>
            <Navbar />
          <div className="dashboard container">
            <div className="row">
              <div className="col s12 m6"> 
                <QuestionList questions={assignquestions} assignedquestionpage={true} myquestionscheck={false}/>
              </div>
              <div className="col s12 m5 offset-m1"> 
                <Notifications />
              </div>
            </div>
          </div>
          </div>
        )
      }
    }
    
    const mapStateToProps = (state) => {
      return {
        assignquestions: state.question.assignquestions,
        uname: state.auth.user.uname
      }
    }
    
    const mapDispatchToProps = (dispatch) => {
      return {
        assignedQuestions: (uname) => dispatch(assignedQuestions(uname))
      }
    }
    export default connect(mapStateToProps, mapDispatchToProps)(AssignQuestions)