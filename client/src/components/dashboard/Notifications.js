import React, { Component } from 'react'
import {connect} from 'react-redux';
import socketIOClient from "socket.io-client";
import { myNotifications, newNotification } from '../../store/actions/notificationActions'
import NotificationSummary from './NotificationSummary'
import './Notifications.css'


const ENDPOINT = "http://localhost:5000";
var connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000, 
  "transports" : ["websocket"]
};

const socket = socketIOClient(ENDPOINT, connectionOptions);

class Notifications extends Component {

  state = {
    iconClass: 'close',
    menuClass: 'close'
  }

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

    setInterval(() => {
      socket.emit('check', this.props.user);
    }, 2000);

    console.log('MyNotifications', this.props.user.uname)
    this.props.myNotifications(this.props.user.uname)

    // $(document).ready(function () {
    //   $(".notificationicon").click(function () {
    //     $(this).toggleClass("open");
    //     $("#notificationMenu").toggleClass("open");
    //   });
    // });
    
  }

  handleClick = () => {
    const iconC = (this.state.iconClass == 'open')?'close':'open';
    const menuC = (this.state.iconClass == 'open')?'close':'open';
    this.setState({
      iconClass : iconC,
      menuClass : menuC
    })
  }

  render(){

    const notifications = this.props.notifications
    console.log('Notifications render', notifications)

    const icClass = "button notificationicon on notification-icon " + ((this.state.iconClass)?this.state.iconClass:'')
    const meClass = "notifications " + ((this.state.menuClass)?this.state.menuClass:'')

    return (
      <div className="section" style={{marginTop: 50}}>
        <div className="card z-depth-0">
          <div className="card-content contain">
            {/* <span className="card-title">Notifications</span> */}

            {/* <a href="#" className={icClass} onClick={this.handleClick}>Notifications</a> */}

            <svg className={icClass} onClick={this.handleClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156 220.65"><defs><style dangerouslySetInnerHTML={{__html: ".cls-1,.cls-2,.cls-3{fill:#efefef;}.cls-2,.cls-3{stroke:#efefef;stroke-width:3px;}.cls-2{stroke-miterlimit:10;}.cls-3{stroke-linejoin:round;}" }} /></defs><title>notification-bell</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path className="cls-1" d="M78.47,8a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-8a14,14,0,1,0,14,14,14,14,0,0,0-14-14Z" /><path className="cls-2" d="M93.38,209.39a4.74,4.74,0,0,0-4.4-6.72c-3.38.05,4.85-.1-11-.1-4.63,0-8.52.27-12,.13a4,4,0,0,0-3.87,5.51,17,17,0,0,0,31.25,1.18Z" /><path className="cls-3" d="M137.19,113.75c-.7-18.82,5.84-52.32-8-75.67-8.77-14.8-16.76-20.22-21.43-22.2a3.65,3.65,0,0,0-5,2.46c-1.67,6.52-7.14,19.6-24.29,19.6S55.84,24.77,54.19,18.27a3.66,3.66,0,0,0-4.83-2.56c-4.9,1.84-13.52,7.13-22.55,22.37-13.84,23.35-7.3,56.84-8,75.67S3.3,147.56,3.3,147.56s37.35,16,74.7,16,74.7-16,74.7-16S137.89,132.57,137.19,113.75Z" /><path className="cls-3" d="M1.5,160.65A191.84,191.84,0,0,0,78,176.55a191.84,191.84,0,0,0,76.5-15.91v10.44a6.45,6.45,0,0,1-4.08,6,197.54,197.54,0,0,1-72,13.76A197.57,197.57,0,0,1,5.61,177.11,6.51,6.51,0,0,1,1.5,171Z" /></g></g></svg>

            {(this.state.menuClass=='open')?
            <ul className={meClass} id="notificationMenu">

              <li className="titlebar">
                <span className="title">Notifications</span>
                <span className="settings"><i className="icon-cog"></i>
                </span>
              </li>
              { notifications && notifications.map(notification => {
                // console.log(notification)
                if(notification != null && notification._id != null) {
                  return (
                    <li key={notification._id}><NotificationSummary notification={notification} user={this.props.user}/></li>
                  )
                } else {
                  return null
                }
                
              })}
              <li className="seeall">
                <a>See All</a>
              </li>
            </ul>
            :null
            }
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