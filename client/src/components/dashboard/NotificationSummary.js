import React, { Component } from 'react'

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
                content = (user.type == 'Tutor') ? 'Your ' + notification.subject + ' assigned question has expired.':'Your ' + notification.subject + ' question is expired.'
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

export default NotificationSummary