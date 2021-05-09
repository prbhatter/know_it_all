import { Component } from 'react'
import {connect} from 'react-redux';
import { getQuestion } from '../../store/actions/questionActions'
import { checkComments } from '../../store/actions/questionActions'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { raiseQuestion } from '../../store/actions/questionActions'
import { myQuestions } from '../../store/actions/questionActions'
import ChatBox from '../chat/ChatBox'

class QuestionDetails extends Component  {
  componentWillMount() {
    this.props.getQuestion(this.props.match.params.id) 
    this.props.checkComments(this.props.match.params.id) 
  }
  handleOnClick = (type) => {
      const question = this.props.getquestion
      console.log('reassign', question);
      question.reassignType = type
      question.uname = this.props.user.uname
      this.props.raiseQuestion(question)
      this.props.history.push("/my-questions")
  }
  render(){
    let previouscomments=[];
    if(this.props.questioncomments){
    for(let i=this.props.questioncomments.length-1;i>=0;i--){ 
        previouscomments.push(this.props.questioncomments[i].content)
      }
    }
    const question = this.props.getquestion;
    console.log("QUESTION DETAILS",this.props.getquestion)
    const id = this.props.match.params.id;
    let quesComments=<div>
                      <div className="container">
                        <ol>
                          {previouscomments.map((comment) => (
                            <li key={comment._id}>{comment}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
    let reassignButtons = (question.expired && !question.closed)?
                                                <div>
                                                  <button onClick={() => this.handleOnClick('same')}>Reassign to same</button>
                                                  <button onClick={() => this.handleOnClick('different')}>Reassign to different</button>
                                                  <button onClick={() => this.handleOnClick('any')}>Reassign to any</button>
                                                  <button onClick={() => this.handleOnClick('close')}>Close</button>
                                                </div>
                                                : null
    let isAnsweredButton = (!question.isAnswered)?
                                          <div>
                                            <button onClick={() => this.handleOnClick('close')}>Question is Answered</button>
                                          </div>
                                          : null
    let chatBox = (question && question.tutname != 'None')?<ChatBox question = {question} />:null

    return (
      <div className="container section question-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">Question - { id }</span>
            
            <p>{question && question.content}</p>
          </div>
          { quesComments }
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {question && question.stuname}</div>
            <div>{question.creationTime}</div>
          </div>
          <div>
            { reassignButtons }
            { isAnsweredButton }
          </div>
        </div>
        <div>
          { chatBox }
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getQuestion: (quessid) => dispatch(getQuestion(quessid)),
    checkComments: (quessid) => dispatch(checkComments(quessid)),
    raiseQuestion: (question) => dispatch(raiseQuestion(question)),
    // myQuestions: (uname) => dispatch(myQuestions(uname))
  }
}

const mapStateToProps = (state) => { 
  //console.log('ANSWER question', state.question)
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    checkquestion: state.question.checkquestion,
    checkanswer: state.question.checkanswer, 
    questioncomments:state.question.questioncomments,
    getquestion:state.question.getquestion,
    myquestions: state.question.myquestions,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionDetails)
