import React from 'react';
import './Login.css';
import logo from '../assets/logo192.png';

function Login() {
    return (
        
        <div className='Login'>
            <img id='Logo' src={logo} alt="logo"/>
            <h1>Login to your Budget Butler Account </h1> 
            <form id="login-form">
                <label for="username" id="user-label"> Username</label>
                <input type="text" id="username" placeholder="Your username" required></input> <br></br>

                <label for="password" id="password-label"> Password</label>
                <input type="text" id="password" placeholder="Your password" required></input> <br></br>
                <input type="submit"></input>
                {/* <button type="button">Submit</button> */}

            </form>
        </div>
    );

}

export default Login;