import React, { Component } from 'react'
import '../auth/SignUp.css'
import { connect } from 'react-redux'
import { raiseComment } from '../../store/actions/questionActions'
import { checkComments } from '../../store/actions/questionActions'
import { NavLink } from 'react-router-dom'
import { checkAnswer } from '../../store/actions/questionActions'
import './question.css'

class QuestionSummary extends Component  {

  componentDidMount(){ 
    this.props.question && this.props.checkComments(this.props.question._id)
    this.props.question && this.props.checkAnswer(this.props.question._id) 
  }
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    this.props.question && this.props.question._id && this.props.checkComments(this.props.question._id)
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){ 
    this.props.question && this.props.question._id && this.props.checkComments(this.props.question._id)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //console.log('raiseQuestion.js', this.props)
    // console.log(this.props)
    const comment = (this.props.user && this.props.question)?{ content: this.state.content, uname: this.props.user.uname, quesid:this.props.question._id }:null
    console.log('submit raise comment', comment);
    comment && this.props.raiseComment(comment) 
    // this.props.myQuestions(this.props.uname)
    this.setState(state => ({
      visibility: !state.visibility  
    }));
    // window.open("/assign-questions","_self")
    //this.props.history.push("/my-questions")
  
  }
  handleClick() {
    this.props.question && this.props.question._id && this.props.checkComments(this.props.question._id)
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
    let alreadyanswers=[];
      if(this.props.checkanswer){
        for(let i=this.props.checkanswer.length-1;i>=0;i--){ 
          alreadyanswers.push(this.props.checkanswer[i].content)
        }
      }
    //  this.props.checkComments(this.props.question._id)
    let previouscomments=[];
    if(this.props.questioncomments){
      for(let i=this.props.questioncomments.length-1;i>=0;i--){ 
        previouscomments.push(this.props.questioncomments[i].content)
      }
    }
    console.log('ques summary',this.props.meraquestionscheck)
    const name = (this.props.question && this.props.question.anonymous == 'Yes' ) ? 'Anonymous' : ((this.props.question)? this.props.question.stuname:'')
    
    const utc = (this.props.question)?this.props.question.creationTime:(Math.floor(Date.now()/1000))
    let d = new Date(utc*1000)
    // let date = d.toString()
    let date="";
    date += d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear() + 
              " "+ d.getHours()+":"+d.getMinutes();


    const quesid = (this.props.question)?this.props.question._id:'';
    const content = (this.props.assignedquestionpage && this.props.question)?<NavLink to={`/answer-page/${this.props.question._id}`}><span className="card-title ">{ this.props.question.content }</span></NavLink>:((this.props.question)?<span className="card-title ">{ this.props.question.content }</span>:null) 
    const content1 = (this.props.myquestionscheck && this.props.question)?<NavLink to={`/details-page/${this.props.question._id}`}><span className="card-title ">{ this.props.question.content }</span></NavLink>:((this.props.question)?<span className="card-title ">{ this.props.question.content }</span>:null)
    const finalcontent = (this.props.assignedquestionpage)?content:content1
    let button = (this.props.isAuthenticated)?<button class="btn pink lighten-1" id="bt" onClick={this.handleClick}>Comment</button>:null
    let textArea=(this.state.visibility)?<form className="container" onSubmit={this.handleSubmit}>
      <div className="input-field">
        <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
        <label htmlFor="content">Enter your comment</label>
      </div>
      <div className="input-field">
        <button className="btn pink lighten-1" id="bt">Comment</button> 
      </div>
      </form>:null
      let prevans=(this.props.checkquestion)?<div>
          <h4 style={{marginRight:870}}>PREVIOUS ANSWERS</h4>
          <div className="container"> 
          <ol>
            {alreadyanswers.map((answer) => (
              <li style={{marginRight:900}} key={answer._id}>{answer}</li>
            ))}
          </ol>
          </div>
          </div>:null
    let quesComments=(this.state.visibility)?<div>
      <div className="container">
          <ol>
            {previouscomments && previouscomments.map((comment) => (
              <li key={comment._id} style={{textAlign: 'initial'}}>{comment}</li>
            ))}
          </ol>
          </div>
    </div>:null   
   return (
  
    <div className="card z-depth-0 question-summary">
        <div className="card-content grey-text text-darken-3" id="questioncard">
          { finalcontent}
          <p>Posted by { name }</p> 
          <p className="grey-text">{ date }</p>
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
    checkComments: (quessid) => dispatch(checkComments(quessid)),
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
    questioncomments:state.question.questioncomments
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionSummary)