import React, { useEffect, useState } from "react";
import Grocery from "./Grocery";
import "./GroceryList.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import "bootstrap/dist/css/bootstrap.min.css";
import {db, firebase} from "../firebase";


export default function GroceryList({ groceryProductData }) {
  // console.log(groceryProductData)
  var productData = groceryProductData.map((obj) => obj.title); //keys
  var groceryData = groceryProductData.map((obj) => obj.id); //values
  var result = {};
  
  productData.forEach((key, i) => (result[key] = groceryData[i]));
  // console.log("result: " + result);
  // console.log("Grocery data: " + groceryData);
  // console.log("product Data: " + productData)
  function getID(value) {
    let idData = groceryData[value];
    console.log(value);
    const api2 = `https://api.spoonacular.com/food/products/${idData}?apiKey=${key}`;

    fetch(api2)
      .then((response) => response.json())
      .then((data) => {
        setMacroData(
          data.nutrition.nutrients.map((obj) => obj)
          
          );
      })
      .catch(() => {
        console.log("#2 get request error");
      });
  }

  function sendInfo(key, macroData) {

          console.log(key);
          console.log("This is what I'm printing" + key[0]);
          // const response=db.collection('users').doc("rxTB9VY2woYD7C4kRAyb");
          //const [productName, setProductName] = useState(key); 
          var name = key[0];
          const currentUser = firebase.auth().currentUser;  

        console.log(macroData);
          // db.collection('users').doc(currentUser.uid).collection('groceries').add({[name] : macroData});
          db.collection('users').doc(currentUser.uid).collection('groceries').doc(name).set({names:macroData});

    
  
  }

  const styles = {
    padding: {
      paddingTop: "5vh",
      paddingBottom: "5vh",
      paddingRight: "18vw",
      paddingLeft: "18vw",
    },
  };

  const [macroData, setMacroData] = useState("");
  
  return (
    <main>
      <section className="groceries">
        <CardColumns style={styles.padding} className="even">
          {Object.entries(result).map((key, value) => {
            return (
              <Card bg="light" className="text-center p-4">
                <Card.Body>
                  <Card.Text>{key}</Card.Text>
                  <Button variant="dark" size="lg" onClick={() => getID(value)}>
                    View Nutrients
                  </Button>
                  <Button variant="dark" size="lg" onClick={() => sendInfo(key, macroData)}>
                    Add to Cart
                  </Button>
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
