import React, { Component } from 'react'
import {connect} from 'react-redux';
// import { w3cwebsocket as W3CWebSocket } from 'websocket'
import socketIOClient from "socket.io-client";
import { myNotifications, newNotification } from '../../store/actions/notificationActions'
import NotificationSummary from './NotificationSummary'

const ENDPOINT = "http://localhost:5000";
var connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000, 
  "transports" : ["websocket"]
};

const socket = socketIOClient(ENDPOINT, connectionOptions);

class Notifications extends Component {

  componentDidMount(){

    socket.on('connection', () => {
      socket.send({
        type: 'connected',
        user: this.props.user
      })
    })

    socket.on('notify', (notification) => {
      console.log('got notification from server !', notification);
      this.props.newNotification(notification)
    })

    console.log('MyNotifications', this.props.user.uname)
    this.props.myNotifications(this.props.user.uname)
    
  }

  render(){

    const notifications = this.props.notifications
    console.log('Notifications render', notifications)

    return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">Notifications</span>
            
            <ul className="notifications">
              <li>Notification</li>
              <li>Notification</li>
              <li>Notification</li>
              <li>Notification</li>
              { notifications && notifications.map(notification => {
                console.log(notification)
                if(notification != null && notification._id != null) {
                  return (
                    <li key={notification._id}><NotificationSummary notification={notification} user={this.props.user}/></li>
                  )
                } else {
                  return null
                }
                
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('Notifications map state to props', state.notification)
  return {
    notifications: state.notification.notifications,
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newNotification: (notification) => dispatch(newNotification(notification)),
    myNotifications: (uname) => dispatch(myNotifications(uname))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)