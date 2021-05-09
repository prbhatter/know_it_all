import { Component } from 'react'
import {connect} from 'react-redux';
import { sendMessage } from '../../store/actions/questionActions'
import { getMessages } from '../../store/actions/questionActions'

class ChatBox extends Component{

    state = {
        content : ''
    }
    componentWillMount() {
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
            <div className="container">
                <div>
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
                </div>
            </div>
        )}

}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (question, content, user) => dispatch(sendMessage(question, content, user)),
    getMessages: (question) => dispatch(getMessages(question))
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    messages: state.question.messages
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox)