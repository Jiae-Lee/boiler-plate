import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link 
} from 'react-router-dom';
import Home from '../Home';
import Menu from '../service/Menu'
import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from './views/RegisterPage/RegisterPage'

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={ Home } />
        <Route path="/menu" component={ Menu } />
        <Route path="/landing" component={ LandingPage } />
        <Route path="/login" component={ LoginPage } />
        <Route path="/register" component={ RegisterPage } />
      </Router>
    </div>
  );
}

export default App;
