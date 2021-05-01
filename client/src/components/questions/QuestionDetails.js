import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

// import QuestionDetails from './components/questions/QuestionDetails'
import { Component } from 'react'
import {connect} from 'react-redux';
import { getQuestion } from '../../store/actions/questionActions'
import { checkComments } from '../../store/actions/questionActions'
class QuestionDetails extends Component  {
  componentWillMount() {
    this.props.getQuestion(this.props.match.params.id) 
    this.props.checkComments(this.props.match.params.id) 
  }
  render(){
    // this.props.getQuestion(this.props.match.params.id) 
    // this.props.checkComments(this.props.match.params.id) 
    let previouscomments=[];
    if(this.props.questioncomments){
    for(let i=this.props.questioncomments.length-1;i>=0;i--)
      { 
        previouscomments.push(this.props.questioncomments[i].content)
      }}
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
  return (
    <div className="container section question-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Question - { id }</span>
          
          <p>{this.props.getquestion && this.props.getquestion.content}</p>
        </div>
        { quesComments }
        <div className="card-action grey lighten-4 grey-text">
          <div>Posted by {this.props.getquestion && this.props.getquestion.stuname}</div>
          <div>27th February, 9pm</div>
        </div>
      </div>
    </div>
  )
}
}
const mapDispatchToProps = (dispatch) => {
  return {
    getQuestion: (quessid) => dispatch(getQuestion(quessid)),
    checkComments: (quessid) => dispatch(checkComments(quessid))
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
    getquestion:state.question.getquestion
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionDetails)
