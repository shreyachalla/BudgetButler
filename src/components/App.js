import React from 'react';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from './Login';
import Signup from './Signup';
import GrocerySetup from '../pages/GrocerySetup';
import Overview from '../pages/Overview';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import Profile from '../pages/profile';
import {AuthProvider} from '../contexts/AuthContext';
import Register from '../pages/register';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        
          <AuthProvider>
          <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/profile" component={Profile} />          
          <Route path='/signup' component={Signup} /> 
          <Route path='/register' component={Register}/>
          <Route path='/login' component={Login} />  
          <Route path='/overview' component={Overview} />
          <Route path='/reports' exact component={Reports} />
          {/* <Route path='/groceries' component={GrocerySetup} /> */}
          <Route path='/settings' component={Settings} />
          </Switch>
          </AuthProvider>
        
      </Router>
    </>
  );
}

export default App;
