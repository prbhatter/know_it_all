import { Component } from 'react'
import {connect} from 'react-redux';
import { getQuestion } from '../../store/actions/questionActions'
import { checkComments } from '../../store/actions/questionActions'
import { raiseQuestion } from '../../store/actions/questionActions'
import ChatBox from '../chat/ChatBox'
import Navbar from '../layout/Navbar'
import { checkAnswer } from '../../store/actions/questionActions'

class QuestionDetails extends Component  {
  componentWillMount() {
    this.props.match.params && this.props.match.params.id && this.props.getQuestion(this.props.match.params.id)
    this.props.match.params && this.props.match.params.id && this.props.checkComments(this.props.match.params.id)
    this.props.match.params && this.props.match.params.id && this.props.checkAnswer(this.props.match.params.id)
  }
  handleOnClick = (type) => {
      const question = this.props.getquestion
      console.log('reassign', question);
      if(question && this.props.user){
        question.reassignType = type
        question.uname = this.props.user.uname
        this.props.raiseQuestion(question)
      }
      this.props.history.push("/my-questions")
  }
  render(){
    let alreadyanswers=[];
      if(this.props.checkanswer){
        for(let i=this.props.checkanswer.length-1;i>=0;i--){ 
          alreadyanswers.push(this.props.checkanswer[i].content)
        }
      }
    let previouscomments=[];
    if(this.props.questioncomments){
    for(let i=this.props.questioncomments.length-1;i>=0;i--){ 
        previouscomments.push(this.props.questioncomments[i].content)
      }
    }
    const question = this.props.getquestion;
    console.log("QUESTION DETAILS",this.props.getquestion)
    const id = this.props.match.params.id;
    let quesComments=<div className="container" style={{marginTop:50,backgroundColor: "darkseagreen",
    borderRadius: 30}}>
                      <h4 style={{marginRight:960}}>COMMENTS</h4>
                      <div className="container">
                        <ol>
                          {previouscomments.map((comment) => (
                            <li style={{marginRight:900}} key={comment._id}>{comment}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
    let prevans=(this.props.checkquestion)?<div className="container" style={{backgroundColor: "aquamarine",
      borderRadius: 30}}>
    <h4 style={{marginRight:870}}>PREVIOUS ANSWERS</h4>
    <div className="container"> 
    <ol>
      {alreadyanswers.map((answer) => (
        <li style={{marginRight:900}} key={answer._id}>{answer}</li>
      ))}
    </ol>
    </div>
    </div>:null                
    let reassignButtons = (question && question.expired && !question.closed)?
                                                <div>
                                                  <div style={ {flexDirection: "row" ,marginLeft: 20, justifyContent: 'space-evenly'} }>
                                                  <button style={{marginTop:30,marginRight:40}}  className="btn pink lighten-1" onClick={() => this.handleOnClick('same')}>Reassign to same</button>
                                                  <button style={{marginTop:30,marginRight:40}}className="btn pink lighten-1"  onClick={() => this.handleOnClick('any')}>Reassign to any</button>
                      
                                                  {/* <div style={ {flexDirection: "row" ,marginLeft: 20,marginTop:10, justifyContent: 'space-evenly'} }> */}
                                                  <button style={{marginTop:30,marginRight:40}}className="btn pink lighten-1" onClick={() => this.handleOnClick('different')}>Reassign to different</button>
                                                   <button style={{marginTop:30}} className="btn pink lighten-1" onClick={() => this.handleOnClick('close')}>Close</button>
                                                   </div>
                                                </div>

                                                : null
    let isAnsweredButton = (question && !question.isAnswered)?
                                          <div>
                                            <button style={{marginTop:40}}className="btn pink lighten-1" onClick={() => this.handleOnClick('close')}>Question is Answered</button>
                                          </div>
                                          : null
    let chatBox = (question && question.tutname != 'None')?<ChatBox question = {question} />:null

    return (
      <div>
        <Navbar />
      <div className="container section question-details">
        <div className="card z-depth-0">
          <div className="card-content ">
            <h2 style={{marginRight:950,marginTop:50,width:650,textAlign: 'left'}}>Question (Assigned to {question && question.tutname})</h2>
            {/* <br /> */}
            <h3 style={{marginRight:970,marginTop:0}}>{ question && question.content }</h3>
            {/* <p>{question && question.content}</p> */}
          </div>
          {prevans}
          { quesComments }
          {/* <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {question && question.stuname}</div>
            <div>{question && question.creationTime}</div>
          </div> */}
          <div>
            { reassignButtons }
            { isAnsweredButton }
          </div>
        </div>
        <div>
          { chatBox }
        </div>
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
    checkAnswer: (id) => dispatch(checkAnswer(id))
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