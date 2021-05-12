import React, { Component } from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import '../auth/SignUp.css'
import { raiseQuestion } from '../../store/actions/questionActions'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import Navbar from '../layout/Navbar'
import { myQuestions } from '../../store/actions/questionActions'

class RaiseQuestions extends Component {
  state = {
    subject: '',
    content: '',
    navigate: false,
    visibility: 'Public',
    anonymous: 'No'
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  onSelect = (selectedList, selectedItem) => {
      this.setState({
        subject: selectedItem.option
      })
  }
  onSelect2 = (selectedList, selectedItem) => {
    this.setState({
      visibility: selectedItem.option
    }) 
  }
  onSelect3 = (selectedList, selectedItem) => {
    this.setState({
      anonymous: selectedItem.option
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const question = (this.props.user) ? { subject: this.state.subject, content: this.state.content, uname: this.props.user.uname, anonymous: this.state.anonymous, visibility: this.state.visibility } : null
    console.log('submit raise', question);
    question && this.props.raiseQuestion(question)
    this.props.uname && this.props.myQuestions(this.props.uname)
    this.setState({
      navigate: true
    })
    window.open("/my-questions","_self")
  }
  render() {
  //  const Navigate = ((!this.props.isAuthenticated) || this.state.navigate) && <Redirect to='/my-questions' />
    let subjectOptions = [{option: 'Mathematics'}, {option: 'Physics'}, {option: 'Chemistry'}]
    let visibilityOptions = [{option: 'Private'}, {option: 'Public'}]
    let anonymousOptions = [{option: 'Yes'}, {option: 'No'}]

    const anonymousDropdown =  (this.state.visibility === 'Public') &&  <div style={{marginTop:30}}className="input-field">
                                                                    <Multiselect
                                                                    id='anonymous'
                                                                     options={anonymousOptions} // Options to display in the dropdown
                                                                    displayValue="option" // Property name to display in the dropdown options
                                                                    placeholder="Anonymity"
                                                                    hidePlaceholder={true}
                                                                    singleSelect={true}
                                                                    onSelect={this.onSelect3}
                                                                    onRemove={this.onSelect3}
                                                                  />
                                                                </div>

    return (
      <div className="container">
        <Navbar />
        <form className="white" onSubmit={this.handleSubmit}>
          <h1 className="grey-text text-darken-3" id="raise">Raise a New Question</h1>
          <div  style={{marginTop:30}} className="input-field">
            <Multiselect
              id='subject'
              options={subjectOptions} // Options to display in the dropdown 
              displayValue="option" // Property name to display in the dropdown options
              placeholder="Question Subject"
              hidePlaceholder={true}
              singleSelect={true}
              onSelect={this.onSelect}
              onRemove={this.onSelect}
            />
          </div>
          <div style={{marginTop:30}} className="input-field">
            <Multiselect
              id='visibility'
              options={visibilityOptions} // Options to display in the dropdown
              displayValue="option" // Property name to display in the dropdown options
              placeholder="Visibility"
              hidePlaceholder={true}
              singleSelect={true}
              onSelect={this.onSelect2}
              onRemove={this.onSelect2}
            />
          </div>
          
          { anonymousDropdown }

          <div style={{marginTop:30}} className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="content">Question Content</label>
          </div>
          <div className="input-field">
            <button style={{fontSize: 19,marginTop:50,paddingTop:7,paddingRight:57,paddingBottom:7,paddingLeft:57}} className="btn pink lighten-1">Raise</button>
          </div>
        </form>
          {/* { Navigate } */}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    raiseQuestion: (question) => dispatch(raiseQuestion(question)),
    myQuestions: (uname) => dispatch(myQuestions(uname))
  }
}

const mapStateToProps = (state) => {
  // console.log('raise question', state.auth)
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    myquestions: state.question.myquestions,
    uname: state.auth.user.uname
  }
}
const RaiseQuestion = withRouter(RaiseQuestions);
export default connect(mapStateToProps, mapDispatchToProps)(RaiseQuestion)
