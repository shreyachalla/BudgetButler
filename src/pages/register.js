import React from "react";
import { FaRegRegistered } from "react-icons/fa";
import { db, firebase } from "../firebase.js";
import { Link, useHistory } from "react-router-dom";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
      paddingTop: "8vh",
      paddingRight: "10vw",
      paddingLeft: "5vw",
    },
  };

  return (
    <>
      <Container style={styles.padding}>
        <Form onSubmit={saveAnswer}>
          <Form.Text>
            <h1>User Profile</h1>
          </Form.Text>

          <Form.Group as={Col} controlId="username" >
            <Form.Label id="username">Username</Form.Label>
            <Form.Control required />
          </Form.Group>
          <Form.Group as={Col} controlId="name" >
            <Form.Label id="name">Name</Form.Label>
            <Form.Control />
          </Form.Group>
          <Container>
            <Row>
              <Form.Group as={Col} controlId="birthday" >
                <Form.Label id="birthday">Birthday</Form.Label>
                <Form.Control type="date" required />
              </Form.Group>
              <Form.Group as={Col} controlId="email">
                <Form.Label id="email">Email</Form.Label>
                <Form.Control type="email" required />
              </Form.Group>
            </Row>
          </Container>
          <Container>
            <Row>
              <Form.Group as={Col} controlId="height">
                <Form.Label id="height">Height</Form.Label>
                <Form.Control type="number" required />
              </Form.Group>
              <Form.Group as={Col} controlId="weight">
                <Form.Label id="weight">Weight</Form.Label>
                <Form.Control type="number" required />
              </Form.Group>
            </Row>
          </Container>
          <Form.Group as={Row}>
            <Form.Label>&emsp;&emsp;</Form.Label>
            <Form.Check
              type="radio"
              label="Male&emsp;"
              id="malSex"
              name="male"
              value="0"
            />
            <Form.Check
              type="radio"
              label="Female"
              id="femSex"
              name="female"
              value="1"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="exampleForm.SelectCustomSizeSm">
            <Form.Label>Level of Physical Activity</Form.Label>
            <Form.Control as="select" size="sm" id="activityLevel" custom>
              <option value="sedentary">sedentary</option>
              <option value="lightly active">lightly active</option>
              <option value="moderately active">moderately active</option>
              <option value="very active">very active</option>
              <option value="extremely active">extremely active</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="budget">
                <Form.Label id="budget">Weekly Budget</Form.Label>
                <Form.Control type="number" required />
              </Form.Group>
          <Button variant="dark" type="submit">
            Submit Profile
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Register;
