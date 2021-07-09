import React, {useRef, useState} from 'react';
import {useAuth} from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/logo3.png';
import styles from "./Signup.css";


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
        <div className="container">

            <div className="leftCol">
                <div className="logoCompName">
                    <img className="logo" src={logo} alt="Logo" />
                    <h1 className="compName" >BUDGET BUTLER</h1>
                </div>
            </div>


            {/* <h4>Already have an account? Log In </h4>  */}
            <div className="rightCol">
                <form className="login-form" id="login-form" onSubmit={handleSubmit}>
                    <h4 className="registerDir"> Register Individual Account!</h4>

                    <label for="email"> Email address*</label><br/><br/>
                    <input  type="text" id="email" placeholder="Enter email address" ref={emailRef} required></input> <br></br>

                    <label for="password" id="password-label"> Create password*</label><br/><br/>
                    <input  type="text" id="password" placeholder="Your password" ref={passwordRef}required></input> <br></br>
                    

                    <label for="conpassword" id="conpassword-label"> Confirm Password</label><br/><br/>
                    <input type="text" id="conpassword" placeholder="Confirm password" ref={confirmRef}required></input> <br></br>
                    
                    <button disabled={loading} type="submit"> Register Account </button> 

                </form>
            </div>
        
        </div>
    )
}