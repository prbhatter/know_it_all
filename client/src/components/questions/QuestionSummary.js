import React, { Component } from 'react'
import '../auth/SignUp.css'
import Answer from './AnswerQuestion'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { raiseComment } from '../../store/actions/questionActions'
import { checkComments } from '../../store/actions/questionActions'
import { NavLink } from 'react-router-dom'
// import { moment } from 'moment'

// function handleClick() {
//   console.log('buton click');
//   <textarea></textarea>
// }
class QuestionSummary extends Component  {
  componentDidMount(){
    this.props.checkComments(this.props.question._id)
  }
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    this.props.checkComments(this.props.question._id)
    this.handleClick = this.handleClick.bind(this);
  }
  // state={
  //   navi : false
  // }
  // this.handleClick = this.handleClick.bind(this);
  handleSubmit = (e) => {
    e.preventDefault();
    //console.log('raiseQuestion.js', this.props)
    // console.log(this.props)
    const comment = { content: this.state.content, uname: this.props.user.uname, quesid:this.props.question._id }
    console.log('submit raise comment', comment);
    this.props.raiseComment(comment) 
    // this.props.myQuestions(this.props.uname)
    this.setState(state => ({
      visibility: !state.visibility  
    }));
    //this.props.history.push("/my-questions") 
  
  }
  handleClick() {
    this.props.checkComments(this.props.question._id)
      console.log('buton click',this.props.question._id);
      this.setState(state => ({
        visibility: !state.visibility
      }));
    }
    handleChange = (e) => { 
      console.log('QUES SUMMARY PROPS',this.props.isAuthenticated)
      this.setState({
        [e.target.id]: e.target.value
      }) 
    }
  render() {
    //  this.props.checkComments(this.props.question._id)
    let previouscomments=[];
    if(this.props.questioncomments){
      for(let i=this.props.questioncomments.length-1;i>=0;i--)
      { 
        previouscomments.push(this.props.questioncomments[i].content)
      }}
    console.log('ques summary',this.props.meraquestionscheck) 
    const name = ( this.props.question.anonymous == 'Yes' ) ? 'Anonymous' : this.props.question.stuname
    const utc = this.props.question.creationTime
    const quesid=this.props.question._id;  
    console.log('QUESTION SUMMARY',quesid)
    // const m = moment.unix(utc).utc().format('YYYY-MM-DD HH:mm:ss');
    // console.log(m);
   const content= this.props.assignedquestionpage?<NavLink to={`/answer-page/${this.props.question._id}`}><span className="card-title ">{ this.props.question.content }</span></NavLink>:<span className="card-title ">{ this.props.question.content }</span> 
   const content1= this.props.myquestionscheck?<NavLink to={`/details-page/${this.props.question._id}`}><span className="card-title ">{ this.props.question.content }</span></NavLink>:<span className="card-title ">{ this.props.question.content }</span> 
   const finalcontent =this.props.assignedquestionpage?content:content1
   let button = (this.props.isAuthenticated)?<button onClick={this.handleClick}>Comment</button>:null
   let textArea=(this.state.visibility)?<form className="container" onSubmit={this.handleSubmit}>
      <div className="input-field">
        <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
        <label htmlFor="content">Enter your comment</label>
      </div>
      <div className="input-field">
        <button className="btn pink lighten-1">Comment</button> 
      </div>
      </form>:null
    let quesComments=(this.state.visibility)?<div>
      <div className="container">
          <ol>
            {previouscomments.map((comment) => (
              <li key={comment._id}>{comment}</li>
            ))}
          </ol>
          </div>
    </div>:null  
   return (
  
    <div className="card z-depth-0 question-summary">
        <div className="card-content grey-text text-darken-3">
          { finalcontent}
          <p>Posted by { name }</p> 
          <p className="grey-text">{ utc }</p>
          { button }
          { quesComments }
          { textArea }
          {/* {console.log(this.state.display)} */}
          
        </div> 
    </div>
  ) 
}}

const mapDispatchToProps = (dispatch) => {
  return {
    raiseComment: (comment) => dispatch(raiseComment(comment)),
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
    questioncomments:state.question.questioncomments
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionSummary)