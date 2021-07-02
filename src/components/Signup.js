import React, {useRef, useState} from 'react';
import {useAuth} from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom';

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
        <div>
           
            <h1>Already have an account? Log In </h1> 
            <h2> Sign Up Here</h2>
            <form id="login-form" onSubmit={handleSubmit}>
                <label for="email"> Email</label>
                <input type="text" id="email" placeholder="Your email" ref={emailRef} required></input> <br></br>

                <label for="password" id="password-label"> Password</label>
                <input type="text" id="password" placeholder="Your password" ref={passwordRef}required></input> <br></br>
                

                <label for="conpassword" id="conpassword-label"> Confirm Password</label>
                <input type="text" id="conpassword" placeholder="Confirm your password" ref={confirmRef}required></input> <br></br>
                
                <button disabled={loading} type="submit"> Sign Up </button> 

            </form>
        </div>
    )
}