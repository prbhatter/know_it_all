import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {logout} from '../../store/actions/authActions'
import {connect} from 'react-redux';

class SignedInLinks extends Component {

  handleOnClick = (e) => {
    e.preventDefault();
    console.log('logout clicked');
    this.props.logout()
  }

  render (){
    return (
      <div>
      <ul className="right">
        <li><NavLink to='/raise'>New Question</NavLink></li>
        <li><NavLink to='/my-questions'>My Questions</NavLink></li>
        {/* <li><NavLink to='/'><button onClick={this.handleOnClick}>Log Out</button></NavLink></li> */}
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

export default connect(null, mapDispatchToProps)(SignedInLinks)