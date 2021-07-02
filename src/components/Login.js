import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }
    return (
        <>
        <div>
             
            <h2> Log In Here</h2>
            <form onSubmit={handleSubmit} id="login-form">
                <label for="email"> Email</label>
                <input type="text" id="email" placeholder="Your email" ref={emailRef} required></input> <br></br>

                <label for="password" id="password-label"> Password</label>
                <input type="text" id="password" placeholder="Your password" ref={passwordRef}required></input> <br></br>
                
                <button disabled={loading} type="submit"> Log In </button> 

            </form>
        </div>
        </>
    )
}