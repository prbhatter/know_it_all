import React, { Component } from 'react'
import { connect } from 'react-redux'
import { raiseQuestion } from '../../store/actions/questionActions'
import { myQuestions } from '../../store/actions/questionActions'
import './Notifications.css'

class NotificationSummary extends Component{

    render(){
        const notification = this.props.notification
        const type = (notification)?notification.type:''
        const user = this.props.user
        let content = "";
        switch(type){
            case 'RAISE_QUESTION':
                content = (user && user.uname==notification.tutname) ? 'You have been assigned a ' + notification.subject + ' question.':'You have raised a ' + notification.subject + ' question.'
                break;
            case 'ANSWER_QUESTION':
                content = (user && user.uname==notification.tutname) ? 'You have answered a ' + notification.subject + ' question.':'Your ' + notification.subject + ' question is answered.'
                break;
            case 'EXPIRE_QUESTION':
                content = (user && user.uname==notification.tutname) ? <div>Your {notification.subject} assigned question is expired.</div>:
                                                    <div>Your {notification.subject} question is expired.</div>
                break;
            case 'REASSIGN_QUESTION':
                content = (user && user.uname==notification.tutname) ?  'You have been assigned a ' + notification.subject + ' question.':'You have reassigned a ' + notification.subject + ' question.'
                break;
            case 'CLOSED_QUESTION':
                content = (user && user.uname==notification.tutname) ?  'Your ' + notification.subject + ' question is closed.':'You have closed a ' + notification.subject + ' question.'
                break;
            default:
                content = ''
        }
        const utc = (notification)?notification.creationTime:(Math.floor(Date.now()/1000))
        let d = new Date(utc*1000)
        // let date = d.toString()
        let date="";
        date += d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear() + 
                  " "+ d.getHours()+":"+d.getMinutes();
        const mystyle = {
          color:'black',
          textAlign:'initial'
        };
        return (
            // <div className="card z-depth-0 question-summary">
            //     <div className="card-content grey-text text-darken-3">
            //     <span className="card-title ">{ content }</span>
            //     <p className="grey-text">{ utc }</p>
            //     </div>
            // </div>
            <div class="notifbox">
              <li class=" notif unread">
                <a href="#">
                  <div class="messageblock">
                    <div class="message" style={mystyle}>{ content }</div>
                    <div class="messageinfo" style={{textAlign: 'initial'}}>
                      <i class="icon-trophy"></i>{ date }
                    </div>
                  </div>
                </a>
              </li>
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