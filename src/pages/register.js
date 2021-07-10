import React from "react";
import { FaRegRegistered } from "react-icons/fa";
import { db, firebase } from "../firebase.js";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const saveAnswer = (event) => {
    event.preventDefault();
    const elementsArray = [...event.target.elements];

    const formData = elementsArray.reduce((accumulator, currentValue) => {
      if (currentValue.id) {
        accumulator[currentValue.id] = currentValue.value;
      }
      return accumulator;
    }, {});

    const currentUser = firebase.auth().currentUser;
    // db.collection("users").add(formData);
    db.collection("users").doc(currentUser.uid).set(formData);

    //  this updates values of specific fields
    // db.collection("users").doc('rxTB9VY2woYD7C4kRAyb').update({name: "jack"});
  };
  // const ifUserInfoFilled =

  const styles = {
    padding: {
      paddingTop: "8vh",
      paddingRight: "10vw",
      paddingLeft: "5vw",
    },
  };

  return (
    //check if data is already there-- fetch
    // if true ->set instead of add
    //

    <>
      <Container style={styles.padding}>
        <Form onSubmit={saveAnswer}>
          <Container>
            <Form.Text>
              <h1>User Profile</h1>
            </Form.Text>

            <Form.Group as={Col} controlId="floatingTextarea">
              <Form.Label>Username</Form.Label>
              <Form.Control required />
            </Form.Group>

            <Form.Group as={Col} controlId="floatingTextarea">
              <Form.Label>Name</Form.Label>
              <Form.Control />
            </Form.Group>
            <Container>
              <Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control type="date" required />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required />
                </Form.Group>
              </Row>
            </Container>
            <Container>
              <Row>
                <Form.Group as={Col} controlId="floatingTextarea">
                  <Form.Label>Height</Form.Label>
                  <Form.Control type="number" required />
                </Form.Group>
                <Form.Group as={Col} controlId="floatingTextarea">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control type="number" required />
                </Form.Group>
              </Row>
            </Container>
            <Form.Group as={Row}>
              <Form.Label>&emsp;&emsp;</Form.Label>
              <Form.Check
                type="radio"
                label="Male&emsp;"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                type="radio"
                label="Female"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
            </Form.Group>

            <Button variant="dark" type="submit">
              Submit Profile
            </Button>
          </Container>
        </Form>
      </Container>
    </>
  );
};

export default Register;
