import React, { useEffect, useState } from "react";
import { db, firebase } from "../firebase.js";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ProgressBar,
  Container, 
  CardColumns,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";

function Overview() {
  
  const [nutr, setNutr] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetchNutr();
  }, []);

  useEffect(() =>{
    fetchUserInfo();
  },[]);

  useEffect(() => {
    if (nutr.length > 0) {
      console.log(Object.keys(nutr));  /*why is this necesssary*/
      console.log(JSON.stringify(nutr))
    } else {
      outOfOrder();
      // return <h5>Nothing in cart. Please go to Groceries to fill your cart.</h5>;
      // check if this works otherwise call outOfOrder instead
    }
  },[nutr]);

 

  const currentUser = firebase.auth().currentUser;

  const fetchNutr = async () => {
    const response = db.collection("groceries").doc(currentUser.uid);
    const data = await response.get();
    console.log("data: " + JSON.stringify(data));
    setNutr([...nutr, data.data()]);

  };

  const fetchUserInfo = async() => {
    const response2 = db.collection("users").doc(currentUser.uid);
    const data2 = await response2.get();
    // console.log("data2: " + JSON.stringify(data2));
    setUserInfo ([...userInfo, data2.data()]);
    // console.log("userinfo: " + userInfo)
  }
// var sumTotal;
// var definedBudget;
// const [nutr, setNutr] = useState([]);
const [sumTotal, setSumTotal] = useState(0);
// defined Budget will be undefined, because the user is only setting the budget in the registration page
const [definedBudget, setDefinedBudget] = useState(0);
  useEffect(() => {
    if (userInfo.length > 0){
      console.log(JSON.stringify(userInfo))
      userInfo && userInfo.map(info =>{
        setSumTotal(info.totalPrice);
        // sumTotal = info.totalPrice;
        setDefinedBudget(info.budget);
        // definedBudget = info.budget;
        console.log("sumTotal: " + sumTotal + "  definedBudget: " + definedBudget);
      })
    } console.log("sumTotal: " + sumTotal)
  },[userInfo])

  // const[nutr, setNutr]=useState([]);
  // const[keys, setKeys] = useState([]);

  function iterateNutrients(nutr) {
    var keys = [];
    nutr.map((nutrients) => {
      // console.log("nutrients: " + Object.keys(nutrients))
      keys = Object.keys(nutrients);
      // console.log(keys)
    });
    console.log(nutr);

    nutr.map((nutrients) => {
      // console.log(nutrients["ARGO TEA"][0])
      // .map(o)
      // if it equals any of the values inside keys, then access the values inside and collect it
      // nutrients.array.forEach(element => {
      // console.log("nutrients: " + JSON.stringify(nutrients))
      var cleanedNutrients = {};
      for (var i = 0; i < keys.length; i++) {
        // cleanedNutrients.
        for (var j = 0; j < nutrients[keys[i]].length; j++) {
          var eachMacro = nutrients[keys[i]][j];
          if (
            eachMacro.name === "Carbohydrates" &&
            eachMacro.name === "Fat" &&
            eachMacro.name &&
            "Protein"
          ) {
            delete nutrients[keys[i]][j];
            j--;
          }
        }
      }
      console.log("nutrients: " + JSON.stringify(nutrients));

      return nutrients;
    });
  }

  function handleClear() {
    const currentUser = firebase.auth().currentUser;
    db.collection("groceries")
      .doc(currentUser.uid)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

    db.collection("users").doc(currentUser.uid).set(
      {
        totalCalories: 0,
        totalCarbs: 0,
        totalFats: 0,
        totalProt: 0,
        totalPrice: 0,
      },
      { merge: true }
    );
  }

  function outOfOrder() {
    return <h5>Nothing in cart. Please go to Groceries to fill your cart.</h5>;
  }

  return (
    <div className="overview">
      <Container>
        <Row>
          <Col>
          <ProgressBar now={sumTotal} max={definedBudget} label={`${sumTotal} out of ${definedBudget}`} variant='warning'/> 
          </Col>
        </Row>
      </Container>
      {/* <Row> 
        {Object.keys(nutr).map((key) => {
          return (
            <div>
              {Object.keys(nutr[key]).map((product) => {
                return (
                  <div>
                    <h5>{product}</h5>
                    {Object.keys(nutr[key][product]).map((nutrient) => {
                      return (
                        <h5>
                          {nutr[key][product][nutrient]["name"]}:{" "}
                          {nutr[key][product][nutrient]["amount"]}
                          {nutr[key][product][nutrient]["unit"]}
                        </h5>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </Row> */}
      <Button type="submit" onClick={handleClear}>
        Clear Grocery List
      </Button>
    </div>
  );
}

export default Overview;
