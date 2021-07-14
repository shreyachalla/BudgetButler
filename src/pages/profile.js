import React, { useEffect, useState } from "react";
import { db, firebase } from "../firebase";
import { useHistory } from "react-router-dom";
import "./Profile.css";
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

  const styles = {
    padding: {
      paddingTop: "8vh",
      paddingBottom: "8vh",
    },
  };

  return (
    <Container style={styles.padding}>
      {blogs &&
        blogs.map((blog) => {
          return (
            <div className="blog-container">
              <h3 className="text-center">{blog.name.toUpperCase()}</h3>

              <Container style={styles.padding}>
                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <h5 className="text-center">Health Information</h5>
                    <Card bg="light" className="text-center p-4">
                      <Card.Text>
                        <h6>Height: {blog.height}</h6>
                        <h6>Weight: {blog.weight}</h6>
                        <h6>Activity Level: {blog.activityLevel}</h6>
                        <h6>Gender: </h6>
                      </Card.Text>
                    </Card>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <h5 className="text-center">General Information</h5>
                    <Card bg="light" className="text-center p-4">
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
              <Button
                onClick={handleClick}
                className="text-right"
                variant="dark"
              >
                Go To Dashboard
              </Button>
            </div>
          );
        })}
    </Container>
  );
};

export default Profile;
