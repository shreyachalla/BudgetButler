import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import logo from "../assets/dancing.png";
import "./landingPage.css";
import Footer from "./../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
export default function LandingPage() {
  const history = useHistory();

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col lg={5} md={6} sm={12} className="text-left mt-4 p-3">
            <h2 id="descHeader">
              Want to eat healthy but don’t know where to start?
            </h2>
            <br></br>
            <p id="desc">
              Treat your body and not worry about breaking the bank. Budget
              Butler helps you ensure that you’re getting all the fruits and
              veggies you need, all without spending more than you can afford.
            </p>
            <br></br>
            <Row>
              <Button
                onClick={() => {
                  history.push("/signup");
                }}
                variant="dark"
                type="submit"
                id="landingBtn"
              >
                Create an Account
              </Button>
              <Button
                onClick={() => {
                  history.push("/login");
                }}
                variant="dark"
                type="submit"
                id="landingBtn"
              >
                Login to Account
              </Button>
            </Row>
            {/* this should be on the top instead of where the navbar is rn */}
            {/* <Button
               variant="dark"
              type="submit"
              id="landingBtn2"
              onClick={()=>
              history.push("/login")}
            >
              Sign in!
            </Button> */}
          </Col>
          <Col lg={7} md={6} sm={12}>
            <img id="homePg" src={logo} alt="Logo" />
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12} className="text-center mt-5 p-3">
            <h2 id="descHeader">About Us</h2>
            <br></br>
            <p id="desc">
              Budget Butler is a passion-motivated organization dedicated to helping everyday people eat healthily and budget for their groceries. Bridging the gap between healthy eating and reasonable budgeting for free, for everyone. 
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
