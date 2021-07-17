import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/ellipse23.png";
// import styles from "./Signup.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPray } from "react-icons/fa";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/register");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  const styles = {
    padding: {
      paddingRight: "10vw",
      paddingLeft: "5vw",
    },
  };

  return (
    <>
      <Row>
        <div className="leftCol" lg={7} md={6} sm={12}>
          <Col className="logoCompName">
            <img className="w-75 p-3" id="logo" src={logo} alt="Logo" />
          </Col>
        </div>

        {/* <h4>Already have an account? Log In </h4>  */}
        <Col lg={5} md={6} sm={12} className="text-left mt-5 p-3">
          <Form className="login-form" id="login-form">
            <Container style={styles.padding}>
              <Form.Group>
                <Form.Label>
                  <h2 className="registerDir">Register Account</h2>
                </Form.Label>
              </Form.Group>
              <Form.Label>Email Address *</Form.Label>
              <Form.Group controlId="validationCustom01">
                <Form.Control
                  required
                  type="email"
                  id="email"
                  ref={emailRef}
                  className="text-left"
                  placeholder="Enter email address"
                ></Form.Control>
              </Form.Group>
              <Form.Label id="password-label">Create Password *</Form.Label>
              <Form.Group controlId="validationCustom02">
                <Form.Control
                  required
                  type="password"
                  id="password"
                  className="text-left"
                  ref={passwordRef}
                  placeholder="Password"
                ></Form.Control>
              </Form.Group>
              <Form.Label id="conpassword-label">Confirm Password *</Form.Label>
              <Form.Group controlId="validationCustom03">
                <Form.Control
                  required
                  ref={confirmRef}
                  id="conpassword"
                  type="password"
                  className="text-left"
                  placeholder="Repeat password"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  required
                  type="radio"
                  label="I agree to terms and conditions"
                />
              </Form.Group>
              <Button
                variant="dark btn-block"
                type="submit"
                onClick={handleSubmit}
              >
                Register Account{" "}
              </Button>{" "}
              <Form.Group className="mb-3">
                <Form.Row>
                  <Link to="/login" className="link">
                    <Form.Label column="lg" lg={12}>
                      <h6>Already have an account? Log In </h6>
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
