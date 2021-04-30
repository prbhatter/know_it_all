import React, { Component } from 'react'

class NotificationSummary extends Component{

    handleOnClick = (type) => {
        const question = { subject: this.state.subject, content: this.state.content, uname: this.props.user.uname, anonymous: this.state.anonymous, visibility: this.state.visibility }
        console.log('submit raise', question);
        this.props.raiseQuestion(question)
        this.props.myQuestions(this.props.uname)
        this.props.history.push("/my-questions")

    }

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
                                                    <div>
                                                        Your {notification.subject} question is expired.
                                                        {/* <button onClick={() => this.handleOnClick('same')}>Reassign to same</button>
                                                        <button onClick={() => this.handleOnClick('different')}>Reassign to different</button>
                                                        <button onClick={() => this.handleOnClick('any')}>Reassign to any</button>
                                                        <button onClick={() => this.handleOnClick('close')}>Close</button> */}
                                                    </div>
                
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