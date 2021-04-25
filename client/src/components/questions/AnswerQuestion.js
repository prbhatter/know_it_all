import React, { Component } from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import '../auth/SignUp.css'
import { raiseAnswer } from '../../store/actions/questionActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withRouter } from "react-router";
import { checkAnswer } from '../../store/actions/questionActions'
// componentDidMount() {
//   this.props.checkAnswer(this.props.match.params.id)
// }

// const getquestion= ({req.params.id})
let solutions = []
class Answers extends React.Component  { 
  state = {
    content: ''
  } 
  componentWillMount() {
    console.log('PROPS ANSWER',this.props)
    this.props.checkAnswer(this.props.match.params.id)
    console.log('PROPS SE',this.props.checkquestion.solution.length)
  }
  handleChange = (e) => {
    console.log('answer ka props');
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const id=this.props.match.params.id;
    //console.log('raiseQuestion.js', this.props) 
    // console.log(this.props)
    const answer = {content: this.state.content}
    // answer.push(id)
    answer.idd=id;
    console.log('submit answer', answer);
    this.props.raiseAnswer(answer,id)
    this.props.history.push("/assign-questions")

  }
      
    render() {
      let alreadyanswers=[];
      for(let i=this.props.checkquestion.solution.length-1;i>=0;i--)
      { 
        alreadyanswers.push(this.props.checkquestion.solution[i])
      }
      console.log('ANSWERS KIYA HUA', this.props)
      return (  
        <div className="container">
            
          { this.props.checkquestion.isAnswered?
        <div>
          <div className="container">
          <ol>
            {alreadyanswers.map((answer) => (
              <li>{answer}</li>
            ))}
          </ol>
          </div>
        <form className="container" onSubmit={this.handleSubmit}>
        <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="content">Enter your Answer</label>
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
            <label htmlFor="content">Badhwa Answer</label>
        </div>
        <div className="input-field">
            <button className="btn pink lighten-1">Raise</button>
          </div>
        </form>}
        </div>
        )}
}
const mapDispatchToProps = (dispatch) => {
  return {
    raiseAnswer: (answer) => dispatch(raiseAnswer(answer)),
    checkAnswer: (id) => dispatch(checkAnswer(id))
  }
}

const mapStateToProps = (state) => {
  console.log('ANSWER question', state.question )
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    checkquestion: state.question.checkquestion 
  }
}
const Answer = withRouter(Answers);
export default connect(mapStateToProps, mapDispatchToProps)(Answer)