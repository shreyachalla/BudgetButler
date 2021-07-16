import React, { useEffect, useState } from "react";
import { db, firebase } from "../firebase.js";
import "bootstrap/dist/css/bootstrap.min.css";
import MacroCalc from "./MacroCalc";
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
  function Calorie(sex, bday, height, weight, activityLevel) {
    console.log(sex, bday, height, weight, activityLevel);
    /**Calculate BMR with Mifflin-ST Jeor equation (more accurate)*/
    let heightInCM = (height * 2.54) //converts height from feet + inches to cm
    let weightInKG = weight * 0.45359237 //converts weight from lbs to kg
    let userBMR = 0
    var age = Math.floor((new Date() - new Date(bday).getTime()) / 3.15576e+10)
    // from StackOverflow Lucas Janon (https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd)
    if(sex === 'male') {
      userBMR = 10 * weightInKG + 6.25 * heightInCM - 5 * age + 5 
      //unused Harris-Benedict equation:  userBMR = 88.362 + (13.397 * weightInKG) + (4.799 *  heightInCM) - (5.677 * age)
    } if(sex === 'female'){
      userBMR = 10 * weightInKG + 6.25 * heightInCM - 5 * age - 161
      //unused Harris-Benedict equation: userBMR = 447.593 + (9.247 * weightInKG) + (3.098 * heightInCM) - (4.330 * age)
    } 
    /**Calculate AMR */
    let amr = 0
    if(activityLevel === 'sedentary') {
        amr = userBMR * 1.2
    } if(activityLevel === 'lightly active') {
        amr = userBMR * 1.375
    } if(activityLevel === 'moderately active') {
        amr = userBMR * 1.55
    } if(activityLevel === 'very active') {
        amr = userBMR * 1.725
    } if(activityLevel === 'extremely active') {
        amr = userBMR * 1.9
    }
    // dont include thermic effect: let thermicEffect = userBMR * 0.1
    // let calorieReq = amr + thermicEffect
    return amr
}




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
const [totalCal, setTotalCal] = useState(0);
const [sex, setSex] = useState("");
const[bday, setBday] = useState("");
const[height, setHeight] = useState(0);
const[weight, setWeight] = useState(0);
const [activityLevel, setActivity] = useState("");

const [totalCarbs, setTotalCarbs] = useState(0);
const [totalFats, setTotalFats] = useState(0);
const[totalProt, setTotalProt] = useState(0);

// defined Budget will be undefined, because the user is only setting the budget in the registration page
const [definedBudget, setDefinedBudget] = useState(0);
  useEffect(() => {
    if (userInfo.length > 0){
      console.log(JSON.stringify(userInfo))
      userInfo && userInfo.map(info =>{
        setSumTotal(info.totalPrice);
        // sumTotal = info.totalPrice;
        setSex(info.femSex === "1" ? 'female' : 'male');
        setBday(info.birthday);
        setDefinedBudget(info.budget);
        setTotalCal(info.totalCalories);
        setHeight(Number(info.height));
        setWeight(Number(info.weight));
        setActivity(info.activityLevel);

        setTotalCarbs(info.totalCarbs);
        setTotalFats(info.totalFats);
        setTotalProt(info.totalProt);

        // definedBudget = info.budget;
        console.log("sumTotal: " + sumTotal + "  definedBudget: " + definedBudget);
      })
    } console.log("sumTotal: " + sumTotal)
  },[userInfo])

  
  const calcAMR = Calorie(sex, bday, height, weight, activityLevel);
  console.log(calcAMR);
  // const[nutr, setNutr]=useState([]);
  // const[keys, setKeys] = useState([]);

  //Not used TODO: delete this 
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
          <ProgressBar now={sumTotal} max={definedBudget} label={`$${sumTotal} out of $${definedBudget}`} variant='warning'/> 
          <ProgressBar now={totalCal} max={calcAMR} label={`${totalCal}kcal out of ${calcAMR}kcal`}variant='warning'/> 
          </Col>
        </Row>
      </Container>
      <Row> 
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
      </Row> 
      <Button type="submit" onClick={handleClear}>
        Clear Grocery List
      </Button>
     
    </div>
  );
}

export default Overview;
