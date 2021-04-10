import React, { Component } from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import '../auth/SignUp.css'
import { raiseQuestion } from '../../store/actions/questionActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withRouter } from "react-router";

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
    //console.log('raiseQuestion.js', this.props)
    // console.log(this.props)
    const question = { subject: this.state.subject, content: this.state.content, uname: this.props.user.uname, anonymous: this.state.anonymous, visibility: this.state.visibility }
    console.log('submit raise', question);
    this.props.raiseQuestion(question)
    this.setState({
      navigate: true
    })
    //this.props.history.push("/my-questions")

  }
  render() {
  //  const Navigate = ((!this.props.isAuthenticated) || this.state.navigate) && <Redirect to='/my-questions' />
    let subjectOptions = [{option: 'Mathematics'}, {option: 'Physics'}, {option: 'Chemistry'}]
    let visibilityOptions = [{option: 'Private'}, {option: 'Public'}]
    let anonymousOptions = [{option: 'Yes'}, {option: 'No'}]

    const anonymousDropdown =  (this.state.visibility === 'Public') &&  <div className="input-field">
                                                                    <Multiselect
                                                                    id='anonymous'
                                                                     options={anonymousOptions} // Options to display in the dropdown
                                                                    displayValue="option" // Property name to display in the dropdown options
                                                                    placeholder="Anonymity"
                                                                    hidePlaceholder={true}
                                                                    onSelect={this.onSelect3}
                                                                    onRemove={this.onSelect3}
                                                                  />
                                                                </div>

    return (
      <div className="container">
        {/* { Navigate } */}
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

          <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="content">Question Content</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Raise</button>
          </div>
        </form>
          {/* { Navigate } */}
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
const RaiseQuestion = withRouter(RaiseQuestions);
export default connect(mapStateToProps, mapDispatchToProps)(RaiseQuestion)