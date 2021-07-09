import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styles from "./Signup.css";
import logo from '../assets/logo3.png';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/profile");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  // const handleClick = () => {
  //   console.log('checking click');
  //   // take user to homePage
  // }

    return (

        <div className="container">

          <div className="leftCol">
                  <div className="logoCompName">
                      <img className="logo" src={logo} alt="Logo" />
                      <h1 className="compName" >BUDGET BUTLER</h1>
                  </div>
              </div>
          
          <div className="rightCol">
            <form className="login-form" onSubmit={handleSubmit} id="login-form">
                <h2 className="registerDir" > Log In Here</h2>

                <label for="email"> Email address</label><br/><br/>
                <input type="text" id="email" placeholder="Your email" ref={emailRef} required></input> <br></br>

                <label for="password" id="password-label"> Password</label><br/><br/>
                <input type="text" id="password" placeholder="Your password" ref={passwordRef}required></input> <br></br>
                
                    <button disabled={loading} type="submit" > Log In </button> 
                
            </form>
            </div>
        </div>

    )
}