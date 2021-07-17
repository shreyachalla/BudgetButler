import React, { useEffect, useState } from "react";
import { db, firebase } from "../firebase";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import Overview from "./Overview.js";
import { Card, Container, Image, Row, Col, Button } from "react-bootstrap";
import { className } from "postcss-selector-parser";

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
      paddingBottom: "4vh",
    },
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
                    <Col style={{ height: "20vh" }}>
                      <h3 className="text-center">{blog.name.toUpperCase()}</h3>
                    </Col>
                    <Col style={{ height: "20vh" }}>
                      <Button
                        onClick={handleClick}
                        className="text-center"
                        style={{
                          backgroundColor: "#AFE5D5",
                          color: "white",
                          width: "17vw",
                        }}
                      >
                        Go To Dashboard
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6} md={6} sm={12}>
                      <h5
                        className="text-center"
                        style={{ fontWeight: "bold", fontSize: "x-large" }}
                      >
                        Health Information
                      </h5>
                      <Card
                        style={{
                          height: "30vh",
                          borderColor: "#AFE5D5",
                          borderRadius: "15% 15% 15% 15% / 12% 12% 12% 12%",
                        }}
                        className="text-center p-4"
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

                    <Col lg={6} md={6} sm={12}>
                      <h5
                        className="text-center"
                        style={{ fontWeight: "bold", fontSize: "x-large" }}
                      >
                        General Information
                      </h5>
                      <Card
                        style={{
                          height: "30vh",
                          borderColor: "#AFE5D5",
                          borderRadius: "15% 15% 15% 15% / 12% 12% 12% 12%",
                        }}
                        className="text-center p-4"
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
