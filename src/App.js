import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Groceries from './pages/Groceries';
import Overview from './pages/Overview';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component ={Login} />
          <Route path ='/home' component ={Home} /> 
          <Route path='/overview' component={Overview} />
          <Route path='/reports' exact component={Reports} />
          <Route path='/groceries' component={Groceries} />
          <Route path='/settings' component={Settings} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
