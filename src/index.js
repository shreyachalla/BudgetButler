import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import {AuthProvider} from './contexts/AuthContext';

// import Signup from './components/Signup';
// import Register from "./pages/register";

ReactDOM.render(
  <React.StrictMode>
  {/* <BrowserRouter> */}
  {/* <AuthProvider> */}
  {/* <Switch> */}
  {/* <Route exact path="/signup"> */}
    {/* <Signup/> */}
  {/* </Route> */}

  {/* <Route exact path="/"> */}
    <App />
  {/* </Route> */}
  {/* </Switch> */}
  {/* // </AuthProvider> */}
  {/* // </BrowserRouter> */}
    
  </React.StrictMode>,
  document.getElementById('root')
);


