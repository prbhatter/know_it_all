import React, { Component } from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import './SignUp.css'

class SignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    uname: '',
    type: '',
    subjects: [],
    email: '',
    password: '',
    contact: '',
    whatsapp: ''
  }

  handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value
      })
  }

  onSelect = (selectedList, selectedItem) => {
    let subjectsList = []
    if(selectedItem.option === 'Tutor' || selectedItem.option === 'Student') {
      this.setState({
        type: selectedItem.option
      })
    } else {
      subjectsList = selectedList.map((subject) => subject.option);
      this.setState({
        subjects: subjectsList
      })
   }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  render() {

    let typeOptions = [{option: 'Tutor'}, {option: 'Student'}]
    let subjectOptions = [{option: 'Mathematics'}, {option: 'Physics'}, {option: 'Chemistry'}]

    const subjectsDropdown =  (this.state.type === 'Tutor') &&  <div className="input-field">
                                                                  <Multiselect
                                                                    id='subjects'
                                                                    options={subjectOptions} // Options to display in the dropdown
                                                                    displayValue="option" // Property name to display in the dropdown options
                                                                    placeholder="Subjects"
                                                                    hidePlaceholder={true}
                                                                    onSelect={this.onSelect}
                                                                    onRemove={this.onSelect}
                                                                  />
                                                                </div>
    
    console.log(this.state)
    return (
      
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>

          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id='firstName' onChange={this.handleChange} />
          </div>
          
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} />
          </div>
          
          <div className="input-field">
            <label htmlFor="uname">Username</label>
            <input type="text" id="uname" onChange={this.handleChange} />
          </div>

          <div>
            <Multiselect
              id='type'
              options={typeOptions} // Options to display in the dropdown
              displayValue="option" // Property name to display in the dropdown options
              placeholder="Type"
              singleSelect={true}
              hidePlaceholder={true}
              onSelect={this.onSelect}
              onRemove={this.onSelect}
            />
          </div>

          { subjectsDropdown }
          
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
          </div>
          
          <div className="input-field">
            <label htmlFor="contact">Contact No.</label>
            <input type="tel" id='contact' onChange={this.handleChange} />
          </div>
          
          <div className="input-field">
            <label htmlFor="whatsapp">Whatsapp No.</label>
            <input type="tel" id='whatsapp' onChange={this.handleChange} />
          </div>
          
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
          </div>
        </form>
      </div>
    )
  }
}

export default SignUp