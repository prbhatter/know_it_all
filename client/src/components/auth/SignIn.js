import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import {login} from '../../store/actions/authActions'
import {connect} from 'react-redux';

class SignIn extends Component {
  state = {
    uname: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('signin submit', this.state);
    this.props.login(this.state)
  }
  render() {
    
    const redir = this.props.isAuthenticated == true && <Redirect to='/' />
    console.log(this.props)
    return (
      <div className="container">
        {redir}
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="uname">Username</label>
            <input type="text" id='uname' onChange={this.handleChange} required={true}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange}  required={true}/>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user))
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)