import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import logo from "../assets/coffeeIllustration.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LandingPage() {
  const history = useHistory();
  const handleClick = () => {
    history.push("/signup");
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col lg={4} md={6} sm={12} className="text-left mt-5 p-3">
            <h2>Want to eat healthy but don’t know where to start?</h2>
            <br></br>
            <p>
              Treat your body and not worry about breaking the bank. Budget
              Butler helps you ensure that you’re getting all the fruits and
              veggies you need, all without spending more than you can afford.
            </p>
            <br></br>
            <Button onClick={handleClick} variant="dark" type="submit">
              Create an Account
            </Button>
          </Col>
          <Col lg={8} md={6} sm={12}>
            <img className="w-50 h-75" id="homePg" src={logo} alt="Logo" />
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={12} sm={12} className="text-center mt-5 p-3">
            <h2>About Us</h2>
            <br></br>
            <p>
              Budget Butler was created to help customers achieve the healthy
              diet and lifestyle that they deserve, all while staying within
              budget.
            </p>
            <p>
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets lorem
              lorem lorem lorem lorem lor
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
