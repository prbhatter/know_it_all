import React, { Component } from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import '../auth/SignUp.css'
import { raiseQuestion } from '../../store/actions/questionActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class RaiseQuestion extends Component {
  state = {
    subject: '',
    content: '',
    navigate: false
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
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.props)
    const question = { subject: this.state.subject, content: this.state.content, uname: this.props.user.uname }
    // console.log('submit raise', question);
    this.props.raiseQuestion(question)
    this.setState({
      navigate: true
    })
  }
  render() {
    // console.log('raiseQuestion.js', this.props)
    const Navigate = ((!this.props.isAuthenticated) || this.state.navigate) && <Redirect to='/' />
    let subjectOptions = [{option: 'Mathematics'}, {option: 'Physics'}, {option: 'Chemistry'}]
    return (
      <div className="container">
        { Navigate }
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Raise a New Question</h5>
          <div className="input-field">
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
          <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="content">Question Content</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Raise</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    raiseQuestion: (question) => dispatch(raiseQuestion(question))
  }
}

const mapStateToProps = (state) => {
  // console.log('raise question', state.auth)
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RaiseQuestion)