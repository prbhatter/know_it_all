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
                content = (user && user.type == 'Tutor') ? 'You have been assigned a ' + notification.subject + ' question.':'You have raised a ' + notification.subject + ' question.'
                break;
            case 'ANSWER_QUESTION':
                content = (user && user.type == 'Tutor') ? 'You have answered a ' + notification.subject + ' question.':'Your ' + notification.subject + ' question is answered.'
                break;
            case 'EXPIRE_QUESTION':
                content = (user && user.type == 'Tutor') ? <div>Your {notification.subject} assigned question is expired.</div>:
                                                    <div>Your {notification.subject} question is expired.</div>
                break;
            case 'REASSIGN_QUESTION':
                content = (user && user.type == 'Tutor') ?  'You have been assigned a ' + notification.subject + ' question.':'You have reassigned a ' + notification.subject + ' question.'
                break;
            case 'CLOSED_QUESTION':
                content = (user && user.type == 'Tutor') ?  'Your ' + notification.subject + ' question is closed.':'You have closed a ' + notification.subject + ' question.'
                break;
            default:
                content = ''
        }
        const utc = (notification)?notification.creationTime:(Math.floor(Date.now()/1000))
        // const m = moment.unix(utc).utc().format('YYYY-MM-DD HH:mm:ss');
        // console.log(m);
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
                  <div class="imageblock"> 
                    <img src="https://si0.twimg.com/profile_images/3186728694/7a0e012910e06dd1476c5edac8b9a28d_bigger.jpeg" class="notifimage"  />
                  </div> 
                  <div class="messageblock">
                    <div class="message">{ content }</div>
                    <div class="messageinfo">
                      <i class="icon-trophy"></i>{ utc }
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