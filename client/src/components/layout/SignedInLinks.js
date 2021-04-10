import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import {logout} from '../../store/actions/authActions'
import {connect} from 'react-redux';
import { withRouter } from "react-router";

class SignedInLinkss extends Component {

  state = {
    navigate: false
  }

  handleOnClick = (e) => {
    e.preventDefault();
    // console.log('logout button', this.props)
    this.props.logout()
    this.setState({
      navigate: true
    })
     this.props.history.push('/')
  }

  render (){
    // const Navigate = (this.state.navigate == true) && <Redirect to='/' />
    return ( 
      <div>
        {/* { Navigate } */}
      <ul className="right">
        <li><NavLink to='/raise'>New Question</NavLink></li>
        <li><NavLink to='/my-questions'>My Questions</NavLink></li>
        <li><NavLink to='/assign-questions'>Assigned Questions</NavLink></li>
        <li><button onClick={this.handleOnClick}>Log Out</button></li>
        <li><NavLink to='/' className="btn btn-floating pink lighten-1">PB</NavLink></li>
      </ul>
      </div>
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
});
const SignedInLinks = withRouter(SignedInLinkss);
export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)