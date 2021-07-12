import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { homeImg } from "./../assets/meditating.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LandingPage() {
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col lg={4} md={6} sm={12} className="text-left mt-5 p-3">
            <h2>Want to eat healthy but don’t know where to start?</h2>
            <p>
              Treat your body and not worry about breaking the bank. Budget
              Butler helps you ensure that you’re getting all the fruits and
              veggies you need, all without spending more than you can afford.
            </p>
            <Button variant="dark" type="submit">
              Create an Account
            </Button>
          </Col>
          <Col lg={8} md={6} sm={12}>
            {/* <img className="w-75 p-3" id="logo" src={homeImg} alt="Logo" /> */}
          </Col>
        </Row>
      </Container>
    </>
  );
}
