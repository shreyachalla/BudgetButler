import React, { useEffect, useState } from "react";
import Grocery from "./Grocery";
import "./GroceryList.css";
import {
  Button,
  Card,
  CardColumns,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { db, firebase } from "../firebase";

export default function GroceryList({ groceryProductData }) {
  const [macroData, setMacroData] = useState("");
  console.log(groceryProductData);
  var productData = groceryProductData.map((obj) => obj.title); //keys
  var groceryData = groceryProductData.map((obj) => obj.id); //values
  var images = groceryProductData.map((obj) => obj.image);
  console.log(images);
  var result = {};
  productData.forEach((key, i) => (result[key] = groceryData[i]));
  console.log(result);

  function getID(value) {
    let idData = groceryData[value];
    console.log(value);
    const api2 = `https://api.spoonacular.com/food/products/${idData}?apiKey=${key}`;

    fetch(api2)
      .then((response) => response.json())
      .then((data) => {
        setMacroData(data.nutrition.nutrients.map((obj) => obj));
      })
      .catch(() => {
        console.log("#2 get request error");
      });
  }

  function sendInfo(key, macroData) {
    // const Register = () => {
    //   const saveAnswer = (event) => {
    //     event.preventDefault();
    //     const elementsArray = [...event.target.elements];
    //     const formData = elementsArray.reduce((accumulator, currentValue) => {
    //       if (currentValue.id) {
    //         accumulator[currentValue.id] = currentValue.value;
    //       }
    //       return accumulator;
    //     }, {});
    //     const currentUser = firebase.auth().currentUser;
    //     // db.collection("users").add(formData);
    //     db.collection("users").doc(currentUser.uid).set(formData);

    //   //  this updates values of specific fields
    //     // db.collection("users").doc('rxTB9VY2woYD7C4kRAyb').update({name: "jack"});
    //   };
    // const response=db.collection('users').doc("rxTB9VY2woYD7C4kRAyb");
    var name = key[0];
    const currentUser = firebase.auth().currentUser;
    db.collection("users")
      .doc(currentUser.uid)
      .update({ [name]: macroData });
  }

  const styles = {
    padding: {
      paddingTop: "5vh",
      paddingBottom: "5vh",
      paddingRight: "18vw",
      paddingLeft: "18vw",
    },
  };

  const padStyle = {};
  let i = 0;
  return (
    <main>
      <section className="groceries">
        <CardColumns style={styles.padding} className="even">
          {Object.entries(result).map((key, value) => {
            return (
              <Card bg="light" className="text-center p-4">
                <Card.Img
                  className="w-50"
                  variant="top"
                  src={images[i++]}
                  alt="Image"
                ></Card.Img>

                <Card.Body>
                  <Card.Text>{key}</Card.Text>
                  <Row style={padStyle.padding}>
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() => getID(value)}
                    >
                      Nutrients
                    </Button>
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() => sendInfo(key, macroData)}
                    >
                      Add to Cart
                    </Button>
                  </Row>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
        {macroData && <Grocery macroData={macroData} />}
      </section>
    </main>
  );
}
//let key = "93e7f0f4d3734c60b15ffed266b08712";
//let key = "db6a8a86cd074a9f817d81be645b4a11";
//let key = "3bb00853f82b44448c83e27b311c0895";
let key = "e75f6bb427c24032b4b6e5b815c65b2c";
