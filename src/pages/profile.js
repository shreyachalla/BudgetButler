import React, { useEffect, useState } from "react";
import { db, firebase } from "../firebase";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import logo from "../assets/dancing.png";
import Overview from "./Overview.js";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const Profile = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const currentUser = firebase.auth().currentUser;
    const response = db.collection("users").doc(currentUser.uid);
    const data = await response.get();
    setBlogs([...blogs, data.data()]);
  };
  const history = useHistory();
  const handleClick = () => {
    history.push("/overview");
  };
  console.log(blogs);
  const styles = {
    padding: {
      paddingTop: "4vh",
      paddingBottom: "2vh",
    },
  };

  const styleCards = {
    height: "20vh",
    borderRadius: "15% 15% 15% 15% / 12% 12% 12% 12%",
  };

  return (
    <section>
      <Container style={styles.padding}>
        {blogs &&
          blogs.map((blog) => {
            return (
              <div className="blog-container">
                <Container style={styles.padding}>
                  <Row>
                    <Col id="logoProfile" lg={6} md={6} sm={12}>
                      <img src={logo} alt="logo" id="logoProfile" />
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <h3 className="text-center" id="myName">
                        {blog.name.toUpperCase()}
                      </h3>
                      <Button
                        id="profileBtn"
                        variant="dark"
                        onClick={handleClick}
                        className="text-center"
                      >
                        Go To Dashboard
                      </Button>
                    </Col>
                  </Row>
                  <br></br>
                  <br></br>
                  <Row>
                    <Col lg={6} md={6} sm={12} style={{ height: "33vh" }}>
                      <h5 className="text-center" id="subInfo">
                        Health Information
                      </h5>
                      <Card
                        style={styleCards}
                        className="text-center p-4"
                        bg="light"
                      >
                        <Card.Text>
                          <h6>Height: {blog.height}</h6>
                          <h6>Weight: {blog.weight}</h6>
                          <h6>Activity Level: {blog.activityLevel}</h6>
                          <h6>
                            Sex: {blog.femSex === "1" ? "Female" : "Male"}
                          </h6>
                        </Card.Text>
                      </Card>
                    </Col>

                    <Col lg={6} md={6} sm={12} style={{ height: "33vh" }}>
                      <h5 className="text-center" id="subInfo">
                        General Information
                      </h5>
                      <Card
                        style={styleCards}
                        className="text-center p-4"
                        bg="light"
                      >
                        <Card.Text>
                          <h6>Budget: {blog.budget}</h6>
                          <h6>Birthday: {blog.birthday}</h6>
                          <h6>Username: {blog.username}</h6>
                          <h6>Email: {blog.email}</h6>
                        </Card.Text>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </div>
            );
          })}
      </Container>
    </section>
  );
};

export default Profile;
