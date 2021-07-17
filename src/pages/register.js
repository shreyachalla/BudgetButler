import React from "react";
import { FaRegRegistered } from "react-icons/fa";
import { db, firebase } from "../firebase.js";
import { Link, useHistory } from "react-router-dom";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";

const Register = () => {
  const history = useHistory();

  const saveAnswer = (event) => {
    event.preventDefault();

    const elementsArray = [...event.target.elements];

    const formData = elementsArray.reduce((accumulator, currentValue) => {
      if (currentValue.id) {
        accumulator[currentValue.id] = currentValue.value;
      }
      // accumulator['macros'] = [];
      console.log(accumulator);
      return accumulator;
    }, {});

    const currentUser = firebase.auth().currentUser;
    db.collection("users").doc(currentUser.uid).set(formData);
    // db.collection('users').doc(currentUser.uid).collection('groceries').add({groceries: "check"});

    history.push("/groceries");
  };

  const styles = {
    padding: {
      paddingTop: "3.5vh",
      paddingRight: "10vw",
      paddingLeft: "5vw",
      paddingBottom: "3.5vh",
    },
  };

  return (
    <>
      <Container style={styles.padding} id="registerContainer">
        <Form onSubmit={saveAnswer}>
          <Form.Text>
            <h1 id="registerHeader">Welcome! Let's get started.</h1>
            <h4 className="text-center">Enter the following information: </h4>
            <br></br>
          </Form.Text>
          <Container>
            <Row>
              <Form.Group as={Col} controlId="username">
                <Form.Label id="username">Username</Form.Label>
                <Form.Control required />
              </Form.Group>
              <Form.Group as={Col} controlId="name">
                <Form.Label id="name">Name</Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>
          </Container>
          <Container>
            <Row>
              <Form.Group as={Col} controlId="birthday">
                <Form.Label id="birthday">Birthday</Form.Label>
                <Form.Control type="date" required />
              </Form.Group>
              <Form.Group as={Col} controlId="height">
                <Form.Label id="height">Height (inches)</Form.Label>
                <Form.Control type="number" required />
              </Form.Group>
            </Row>
          </Container>
          <Container>
            <Row>
              <Form.Group as={Col} controlId="weight">
                <Form.Label id="weight">Weight (pounds)</Form.Label>
                <Form.Control type="number" required />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Gender</Form.Label>
                <Container>
                  <Row>
                    <Form.Check
                      required
                      type="radio"
                      label="Male&emsp;&emsp;"
                      id="malSex"
                      name="group1"
                      value="0"
                    />
                    <Form.Check
                      required
                      type="radio"
                      label="Female &emsp;&emsp;"
                      id="femSex"
                      name="group1"
                      value="1"
                    />
                  </Row>
                </Container>
              </Form.Group>
            </Row>
          </Container>
          <Container>
            <Row>
              <Form.Group as={Col} controlId="exampleForm.SelectCustomSizeSm">
                <Form.Label>Physical Activity Level</Form.Label>
                <Form.Control required as="select" id="activityLevel" custom>
                  <option value="sedentary">sedentary</option>
                  <option value="lightly active">lightly active</option>
                  <option value="moderately active">moderately active</option>
                  <option value="very active">very active</option>
                  <option value="extremely active">extremely active</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="budget">
                <Form.Label id="budget">Weekly Budget (dollars)</Form.Label>
                <Form.Control type="number" required />
              </Form.Group>
            </Row>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Allergies/Restrictions?</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
          </Container>
          <Button variant="dark" type="submit">
            Submit Profile
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Register;
