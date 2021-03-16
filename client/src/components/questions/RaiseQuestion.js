import React, { Component } from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import '../auth/SignUp.css'
import { raiseQuestion } from '../../store/actions/questionActions'
import { connect } from 'react-redux'

class RaiseQuestion extends Component {
  state = {
    subject: '',
    content: ''
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
    // console.log(this.state);
    this.props.raiseQuestion(this.state)
  }
  render() {
    let subjectOptions = [{option: 'Mathematics'}, {option: 'Physics'}, {option: 'Chemistry'}]
    return (
      <div className="container">
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

export default connect(null, mapDispatchToProps)(RaiseQuestion)