import React, { Component } from 'react'
import '../auth/SignUp.css'
import { raiseAnswer } from '../../store/actions/questionActions'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { checkAnswer } from '../../store/actions/questionActions'
import ChatBox from '../chat/ChatBox'
import Navbar from '../layout/Navbar'

let solutions = []
class Answers extends React.Component  { 
  state = {
    content: ''
  } 
 componentWillMount() {
    console.log('PROPS ANSWER',this.props.checkanswer)
    this.props.match.params && this.props.match.params.id && this.props.checkAnswer(this.props.match.params.id)
  }
  handleChange = (e) => {
    console.log('answer ka props');
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const id=(this.props.match.params)?this.props.match.params.id:'';
    //console.log('raiseQuestion.js', this.props) 
    // console.log(this.props) 
    const answer = {content: this.state.content}
    // answer.push(id)
    answer.idd=id;
    console.log('submit answer', answer);
    answer && id && this.props.raiseAnswer(answer,id)
    window.open("/assign-questions","_self")

  }
      
    render() {
   // console.log('PROPS SE',this.props.checkquestion.solution.length)
      let alreadyanswers=[];
      if(this.props.checkanswer){
        for(let i=this.props.checkanswer.length-1;i>=0;i--){ 
          alreadyanswers.push(this.props.checkanswer[i].content)
        }
      }
      // console.log('ANSWERS KIYA HUA', this.props)
      const question = this.props.checkquestion
      let chatBox = (question && question.tutname != 'None')?<ChatBox question = {question} />:null

      return (  
        <div className="container">
            <Navbar />
            {/* <Typed
                    strings={['Here you can find anything']}
                    typeSpeed={40}
                />
                <br/>
 
                <Typed
                strings={[
                    'Search for products',
                    'Search for categories',
                    'Search for brands']}
                    typeSpeed={40}
                    backSpeed={50}
                    attr="placeholder"
                    loop >
                    <input type="text"/>
                </Typed> */}
            <h1 className="grey-text text-darken-3" id="raise">Answer This Question</h1>
          { this.props.checkquestion?
          <div>
          <div style={{backgroundColor: "darkseagreen",borderRadius:70}}>
            <h4 style={{marginRight:870}}>PREVIOUS ANSWERS</h4>
            <div className="container"> 
            <ol>
              {alreadyanswers && alreadyanswers.map((answer) => (
                <li style={{marginRight:900}} key={answer._id}>{answer}</li>
              ))}
            </ol>
            </div></div>
          <form className="container" onSubmit={this.handleSubmit}>
          <div style={{marginTop:60}} className="input-field">
              <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
              <label style={{fontSize:15}} htmlFor="content">Enter your Answer</label>
          </div>
          <div className="input-field">
              <button className="btn pink lighten-1">Raise</button>
            </div>
          </form>
          </div>
          :
          <form className="container" onSubmit={this.handleSubmit}>
          <div className="input-field">
              <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
              <label htmlFor="content">Answer</label>
          </div>
          <div className="input-field">
              <button className="btn pink lighten-1">Answer</button>
            </div>
          </form>}
          <div>
            { chatBox }
          </div>
        </div>
        )}
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkAnswer: (id) => dispatch(checkAnswer(id)),
    raiseAnswer: (answer) => dispatch(raiseAnswer(answer))
  }
}

const mapStateToProps = (state) => { 
  console.log('ANSWER question', state.question)
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    checkquestion: state.question.checkquestion,
    checkanswer: state.question.checkanswer 
  }
}
const Answer = withRouter(Answers);
export default connect(mapStateToProps, mapDispatchToProps)(Answer)