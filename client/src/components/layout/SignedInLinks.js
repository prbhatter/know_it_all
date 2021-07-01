import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import {logout} from '../../store/actions/authActions'
import {connect} from 'react-redux';
import { withRouter } from "react-router";

class SignedInLinkss extends Component {

  state = {
    navigate: false
  }

  handleOnClick =  (e) => {
    e.preventDefault();
    // console.log('logout button', this.props)
    this.props.logout()
    this.props.history && this.props.history.push('/dashboard')
   // window.open("/dashboard","_self") 
  }

  render (){
    // const Navigate = (this.state.navigate && this.state.navigate == true) && <Redirect to='/' />
    return ( 
      <section class="navbar custom-navbar navbar-fixed-top" role="navigation">
        <div className="container">
        {/* { Navigate } */}
        <div class="collapse navbar-collapse">
                      
                      <div class="navbar-header">
                      <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                          <span class="icon icon-bar"></span>
                          <span class="icon icon-bar"></span>
                          <span class="icon icon-bar"></span> 
                      </button>
                      <a href="/" class="navbar-brand">Know_It_All</a>
                      </div>
                      <div class="collapse navbar-collapse">
                      <ul class="nav navbar-nav navbar-nav-first">
                          <li><a href="/raise" class="smoothScroll">New Question</a></li>
                          <li><a href="/my-questions" class="smoothScroll">My Questions</a></li>    
                          <li><a href="/assign-questions" class="smoothScroll">Assigned Questions</a></li>
                          
                      </ul>
                      <ul class="nav navbar-nav navbar-right">
                        
                      <li style={{marginRight:50}}><a onClick={this.handleOnClick} class="smoothScroll">Log Out</a></li> 
                      <li><a href="/" class="navbar-brand">{this.props.user && this.props.user.uname}</a></li>
                      </ul>
                      </div>
                </div> 
        </div></section>
    )
    
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});
const SignedInLinks = withRouter(SignedInLinkss);
export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)