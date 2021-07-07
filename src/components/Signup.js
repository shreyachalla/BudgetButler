import React, {useRef, useState} from 'react';
import {useAuth} from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom';
import "./Signup.css";

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmRef = useRef() 
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== confirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try { 
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
        
    }
    return (
        // <div>
        <body class="container">

            <div class="leftCol">
                <h1>Budget Butler</h1>
            </div>


            {/* <h4>Already have an account? Log In </h4>  */}
            
            <form id="login-form" class="rightCol" onSubmit={handleSubmit}>
                <h4> Register Individual Account!</h4>
                <label for="email"> Email*</label>
                <input type="text" id="email" placeholder="Enter email address" ref={emailRef} required></input> <br></br>

                <label for="password" id="password-label"> Create password*</label>
                <input type="text" id="password" placeholder="Your password" ref={passwordRef}required></input> <br></br>
                

                <label for="conpassword" id="conpassword-label"> Confirm Password</label>
                <input type="text" id="conpassword" placeholder="Confirm password" ref={confirmRef}required></input> <br></br>
                
                <button className="registerButton" disabled={loading} type="submit"> Register Account </button> 

            </form>
        {/* // </div> */}
        </body>
    )
}