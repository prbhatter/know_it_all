import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import {login} from '../../store/actions/authActions'
import {connect} from 'react-redux';
import loginImg from "./login.svg";
import './styles.css'

class SignIn extends React.Component {
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
    //window.open('/',"_self")
  }
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const redir = this.props.isAuthenticated == true && <Redirect to='/dashboard' />
    return (
      <div className="base-container" ref={this.props.containerRef}>
        {redir}
        <div className="header">Login</div>
        <div className="content">
          <div className="image">  
            <img src={loginImg} />
          </div>
          <form className="white" onSubmit={this.handleSubmit}>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id='uname' onChange={this.handleChange} required={true}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id='password' onChange={this.handleChange}  required={true}/>
            </div>
        <div className="footer">
          <button type="submit" className="btn">
            Login
          </button>
        </div>
        </div>
        </form>
      </div></div>
    );
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