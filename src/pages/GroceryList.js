import React, { useEffect, useState } from "react";
import Grocery from "./Grocery";
import "./GroceryList.css";
import { useHistory } from "react-router-dom";
import { Button, Card, CardColumns, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { db, firebase } from "../firebase";
import { MdAddShoppingCart } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { MdExpandMore } from "react-icons/md";

var runningTotal;
var totalCarbs;
var totalCals;
var totalFats;
var totalProt;

export default function GroceryList({ groceryProductData }) {
  const key = process.env.REACT_APP_SPOONACULAR_KEY;
  const currentUser = firebase.auth().currentUser;
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetchUserInfo();
  }, []);
  useEffect(() => {
    if (userInfo.length > 0) {
      userInfo &&
        userInfo.map((info) => {
          console.log("info: " + JSON.stringify(info));
          runningTotal = info.totalPrice;
          totalCarbs = info.totalCarbs;
          totalCals = info.totalCalories;
          // console.log("typeof(info.totalCals: " +  typeof(info.totalCals))

          totalFats = info.totalFats;
          totalProt = info.totalProt;
        });
    }
  });
  const history = useHistory();
  const fetchUserInfo = async () => {
    try {
      const response2 = db.collection("users").doc(currentUser.uid);
      const data2 = await response2.get();
      setUserInfo([...userInfo, data2.data()]);
    } catch (nullUidError) {
      history.push("/login");
    }
  };

  var productData = groceryProductData.map((obj) => obj.title); //keys
  // console.log(productData);

  var groceryData = groceryProductData.map((obj) => obj.id); //values
  var images = groceryProductData.map((obj) => obj.image);

  var result = {};
  var forCalc = [];

  productData.forEach((key, i) => (result[key] = groceryData[i]));

  function getID(value) {
    let idData = groceryData[value];
    console.log(value);
    const api2 = `https://api.spoonacular.com/food/products/${idData}?apiKey=${key}`;

    fetch(api2)
      .then((response) => response.json())
      .then((data) => {
        var nutriInfo = data.nutrition.nutrients.map((obj) => obj);
        var prodPrice = data.price;
        console.log(`price ${prodPrice}`);
        setPrice(prodPrice);
        setMacroData(
          (forCalc = nutriInfo.filter(
            (obj) =>
              obj.name === "Fat" ||
              obj.name === "Carbohydrates" ||
              obj.name === "Protein" ||
              obj.name === "Calories"
          ))
        );
        // console.log(forCalc);
      })
      .catch(() => {
        console.log("#2 get request error");
      });
  }

  function sendInfo(key, macroData, price) {
    var name = key[0];
    // macroData += key[0];
    console.log(macroData);
    macroData.push({"price": price});
    db.collection("groceries")
      .doc(currentUser.uid)
      .set({ [name]: macroData }, { merge: true });
    
    // running total rn is just the total of shopping cart at the current login instead of the entirety of the time
    
    runningTotal += price;
    for (let i = 0; i < macroData.length; i++) {
      if (macroData[i]["name"] === "Carbohydrates") {
        totalCarbs += macroData[i]["amount"];
      } else if (macroData[i]["name"] === "Calories") {
        totalCals += macroData[i]["amount"];
      } else if (macroData[i]["name"] === "Fat") {
        totalFats += macroData[i]["amount"];
      } else if (macroData[i]["name"] === "Protein") {
        totalProt += macroData[i]["amount"];
      }
    }

    db.collection("users")
      .doc(currentUser.uid)
      .set({ "totalPrice": runningTotal }, { merge: true });
    db.collection("users")
      .doc(currentUser.uid)
      .set({ "totalCarbs": totalCarbs }, { merge: true });
    db.collection("users")
      .doc(currentUser.uid)
      .set({ "totalCalories": totalCals }, { merge: true });
    db.collection("users")
      .doc(currentUser.uid)
      .set({ "totalFats": totalFats }, { merge: true });
    db.collection("users")
      .doc(currentUser.uid)
      .set({ "totalProt": totalProt }, { merge: true });
  }

  const styles = {
    padding: {
      paddingTop: "5vh",
      paddingBottom: "5vh",
      paddingRight: "15vw",
      paddingLeft: "15vw",
    },
  };

  const [macroData, setMacroData] = useState("");
  const [price, setPrice] = useState(0);
  let i = 0;
  let j = 0;

  return (
    <main>
      <section className="groceries">
        <CardColumns style={styles.padding} className="even">
          {Object.entries(result).map((key, value) => {
            return (
              <Card bg="light" className="text-center p-4" id="cardBg">
                <Card.Text id="cardName">{key[j]}</Card.Text>
                <Card.Img
                  className="w-50"
                  id="cardPic"
                  variant="top"
                  src={images[i++]}
                  alt="Image"
                ></Card.Img>
                <Card.Body>
                  <Row>
                    <Col>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={
                            <RiFileList3Line
                              id="nutrButton"
                              variant="dark"
                              size={45}
                              onClick={() => getID(value)}
                            />
                          }
                        >
                          <Card.Text id="subCartName">View Nutrients</Card.Text>
                        </AccordionSummary>
                        <AccordionDetails>
                          {macroData && (
                            <Grocery macroData={macroData} price={price} />
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={
                            <MdAddShoppingCart
                              id="nutrButton"
                              variant="dark"
                              size={45}
                              onClick={() => sendInfo(key, macroData, price)}
                            ></MdAddShoppingCart>
                          }
                        >
                          <Card.Text id="subCartName">Add to Cart</Card.Text>
                        </AccordionSummary>
                      </Accordion>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </section>
    </main>
  );
}
