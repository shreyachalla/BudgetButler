import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styles from "./Signup.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo4.png";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

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

  const styles = {
    padding: {
      paddingTop: "12vh",
      paddingRight: "10vw",
      paddingLeft: "5vw",
    },
  };
  

  return (
    <>
      <Row>
        <Col className="logoCompName p-3">
          <div className="leftCol" lg={7} md={7} sm={7} xs={12}>
            <img
              className="w-75 justify-content-center"
              id="logo"
              src={logo}
              alt="Logo"
            />

          </div>
        </Col>

        {/* <h4>Already have an account? Log In </h4>  */}
        <Col lg={5} md={5} sm={5} xs={12} className="text-left mt-5 p-3">
          <Form className="login-form" id="login-form" onSubmit={handleSubmit}>
            <Container style={styles.padding}>
              <Form.Group>
                <Form.Label>
                  <h2 className="registerDir">Login to Account</h2>
                </Form.Label>
              </Form.Group>

              <Form.Label>Email Address *</Form.Label>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  className="text-left"
                  placeholder="Enter email address"
                  ref={emailRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Label>Password *</Form.Label>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  className="text-left"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Button variant="dark btn-block" disabled={loading} type="submit">
                {" "}
                Login
              </Button>
              <Form.Group className="mb-3">
                <Form.Row>
                  <Link to="/signup" className="link">
                    <Form.Label column="lg" lg={12}>
                      <h6>Don't have an account? Sign Up</h6>
                    </Form.Label>
                  </Link>
                </Form.Row>
              </Form.Group>
            </Container>
          </Form>
        </Col>
      </Row>
    </>
  );
}
