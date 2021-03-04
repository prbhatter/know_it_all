import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import QuestionDetails from './components/questions/QuestionDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import RaiseQuestion from './components/questions/RaiseQuestion'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/question/:id' component={QuestionDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/raise' component={RaiseQuestion} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;