import { Component } from 'react'
import {connect} from 'react-redux';
import { newMessage, sendMessage } from '../../store/actions/questionActions'
import { getMessages } from '../../store/actions/questionActions'
import socketIOClient from "socket.io-client";
import './ChatBox.css'

const ENDPOINT = "http://localhost:5000";
var connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000, 
  "transports" : ["websocket"]
};

const socket = socketIOClient(ENDPOINT, connectionOptions);

class ChatBox extends Component{

    state = {
        content : ''
    }
    componentWillMount() {

      socket.on('connection', () => {
        socket.send({
          type: 'connected',
          user: this.props.user
        })
      })

      socket.on('chat', (message) => {
        console.log('got chat from server !', message);
        this.props.newMessage(message)
      })

      console.log('ChatBox', this.props.question)
      this.props.getMessages(this.props.question)
    }

    handleChange = (e) => {
       this.setState({
         [e.target.id]: e.target.value
       })
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const content = this.state.content
      console.log('chat message', content);
      this.setState({
        content: ''
      })
      this.props.sendMessage(this.props.question, content, this.props.user)
      this.props.getMessages(this.props.question)
    }

    render() {
        
        const messages = this.props.messages

        return (
            <div className="chatWindow">
                {/* <div>
                  <div className="container">
                      <ul>
                          {messages && messages.map((message) => (
                              <li key={message._id}><div>{message.content}</div><div>{message.creationTime}</div></li>
                          ))}
                      </ul>
                  </div>
                  <form className="container" onSubmit={this.handleSubmit}>
                      <div className="input-field">
                          <textarea id="content" className="materialize-textarea" onChange={this.handleChange} value={this.state.content}></textarea>
                          <label htmlFor="content">Enter your message</label>
                      </div>
                      <div className="input-field">
                          <button className="btn pink lighten-1">Send</button>
                      </div>
                  </form>
                </div> */}
                <ul className="chat" id="chatList">
                  {messages && messages.map(message => (
                    <div key={message._id}>
                      {this.props.user.uname == message.sender ? (
                        <li className="self">
                          <div className="msg">
                            <p>{message.sender}</p>
                            <div className="message"> {message.content}</div>
                          </div>
                        </li>
                      ) : (
                        <li className="other">
                          <div className="msg">
                            <p>{message.sender}</p>
                          <div className="message"> {message.content} </div>
                          </div>
                        </li>
                      )}
                    </div>
                  ))}
                </ul>
                <div className="chatInputWrapper">
                  <form onSubmit={this.handleSubmit} >
                    <textarea
                      className="textarea input materialize-textarea"
                      id='content'
                      placeholder="Enter your message..."
                      onChange={this.handleChange}
                      value={this.state.content}
                      rows={1}
                      cols={2}
                      style={ { width: 370, marginRight: 100 } }
                    />
                    <div className="input-field">
                        <button className="btn pink lighten-1" style={ { position: 'absolute', bottom: 10, right: 10 } }>Send</button>
                    </div>
                  </form>
                </div>
            </div>
        )}

}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (question, content, user) => dispatch(sendMessage(question, content, user)),
    getMessages: (question) => dispatch(getMessages(question)),
    newMessage: (message) => dispatch(newMessage(message))
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    messages: state.question.messages
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox)