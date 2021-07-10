import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/ellipse23.png";
import styles from "./Signup.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPray } from "react-icons/fa";

export default function Signup() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const styles = {
    padding: {
      paddingTop: "8vh",
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
        {/* <Col lg ={7} md={6} sm={12}>
                <img className="w-60" id="logoPage" src={logo} alt="Background"/>
            </Col> 
        */}

        {/* <h4>Already have an account? Log In </h4>  */}
        <Col lg={5} md={6} sm={12} className="text-left mt-5 p-3">
          <Form
            className="login-form"
            id="login-form"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Container style={styles.padding}>
              <Form.Group>
                <Form.Label>
                  <h2 className="registerDir">Register Account</h2>
                </Form.Label>
              </Form.Group>

              <Form.Label>Email Address *</Form.Label>
              <Form.Group controlId="validationCustom01">
                <Form.Control
                   validated={validated}
                  required
                  type="email"
                  className="text-left"
                  placeholder="Enter email address"
                ></Form.Control>
              </Form.Group>

              <Form.Label>Create Password *</Form.Label>
              
              <Form.Group controlId="validationCustom02">
                <Form.Control
                  validated={validated}
                  required
                  type="password"
                  className="text-left"
                  placeholder="Password"
                ></Form.Control>
              </Form.Group>
           

              <Form.Label>Repeat Password *</Form.Label>
              <Form.Group controlId="validationCustom03">
                <Form.Control
                  required
                  type="password"
                  className="text-left"
                  placeholder="Repeat password"
                ></Form.Control>
              </Form.Group>
         

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="radio"
                  label="I agree to terms and conditions"
                  required
                />
              </Form.Group>

              <Button
                variant="primary btn-block"
                type="submit"
                onClick={handleSubmit}
              >
                Register Account{" "}
              </Button>

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
