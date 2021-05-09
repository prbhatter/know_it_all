import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux';
import './nav.css'
class Navbar extends Component {

  componentDidMount() {
    // client.onopen = () => {
    //   console.log('WebSocket Client Connected');
    // };
    // client.onmessage = (message) => {
    //   const dataFromServer = JSON.parse(message.data);
    //   console.log('got reply !', dataFromServer);
    // }
  }

  render() {
    const links = (this.props.isAuthenticated)?<SignedInLinks />:<SignedOutLinks />
    return (
      <div>
          { links }
        </div>
    
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar)