import React, { Component } from 'react'
import { connect } from 'react-redux'
import { raiseQuestion } from '../../store/actions/questionActions'
import { myQuestions } from '../../store/actions/questionActions'

class NotificationSummary extends Component{

    render(){
        const notification = this.props.notification
        const type = notification.type
        const user = this.props.user
        let content = "";
        switch(type){
            case 'RAISE_QUESTION':
                content = (user.type == 'Tutor') ? 'You have been assigned a ' + notification.subject + ' question.':'You have raised a ' + notification.subject + ' question.'
                break;
            case 'ANSWER_QUESTION':
                content = (user.type == 'Tutor') ? 'You have answered a ' + notification.subject + ' question.':'Your ' + notification.subject + ' question is answered.'
                break;
            case 'EXPIRE_QUESTION':
                content = (user.type == 'Tutor') ? <div>Your {notification.subject} assigned question is expired.</div>:
                                                    <div>Your {notification.subject} question is expired.</div>
                break;
            case 'REASSIGN_QUESTION':
                content = (user.type == 'Tutor') ?  'You have been assigned a ' + notification.subject + ' question.':'You have reassigned a ' + notification.subject + ' question.'
                break;
            case 'CLOSED_QUESTION':
                content = (user.type == 'Tutor') ?  null:'You have closed a ' + notification.subject + ' question.'
                break;
            default:
                content = 'Notification!!!!'
        }
        const utc = notification.creationTime
        // const m = moment.unix(utc).utc().format('YYYY-MM-DD HH:mm:ss');
        // console.log(m);
        return (
            <div className="card z-depth-0 question-summary">
                <div className="card-content grey-text text-darken-3">
                <span className="card-title ">{ content }</span>
                <p className="grey-text">{ utc }</p>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    raiseQuestion: (question) => dispatch(raiseQuestion(question)),
    myQuestions: (uname) => dispatch(myQuestions(uname))
  }
}

const mapStateToProps = (state) => {
  // console.log('raise question', state.auth)
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    myquestions: state.question.myquestions,
    uname: state.auth.user.uname
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSummary)