import React, { useEffect, useState } from "react";
import { db, firebase } from "../firebase";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const Profile = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    // const response=db.collection('users').doc("rxTB9VY2woYD7C4kRAyb");
    const currentUser = firebase.auth().currentUser;
    const response = db.collection("users").doc(currentUser.uid);
    const data = await response.get();
    setBlogs([...blogs, data.data()]);
  };

  return (
    <div>
      <Card className=" text-center p-4 mb-2" variant="light">
        <Card.Body>
          <Card.Title>
            <h1>User Information</h1>
          </Card.Title>
          <Card.Text>
            {blogs &&
              blogs.map((blog) => {
                return (
                  <div className="blog-container">
                    <h5>Name: {blog.name}</h5>
                    <h5>Height: {blog.height}</h5>
                    <h5>Username: {blog.username}</h5>
                    <h5>Weight: {blog.weight}</h5>
                    <h5>Email: {blog.email}</h5>
                  </div>
                );
              })}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
