import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import QuestionDetails from './components/questions/QuestionDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import RaiseQuestion from './components/questions/RaiseQuestion'
import MyQuestions from './components/questions/MyQuestions'
import { Component } from 'react'
import {connect} from 'react-redux';

class App extends Component {
  // const { questions } = this.props
  
  render() {
   return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/question/:id' component={QuestionDetails} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route path='/raise' component={RaiseQuestion} />
              <Route path='/my-questions' component={MyQuestions} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App)