import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
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
                  <ul class="nav navbar-nav navbar-right">
                  <li><a href="/auth" class="smoothScroll">Sign Up</a></li>
                      <li><a href="/auth" class="smoothScroll">Login</a></li>  
                  </ul>
                  </div>
            </div>
    </div></section>
  )
} 

export default SignedOutLinks