import React, { useEffect, useState } from "react";
import { db, firebase } from "../firebase.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import { ProgressBar, Container, Row, Col, Button } from "react-bootstrap";

function Overview() {
  function Calorie(sex, bday, height, weight, activityLevel) {
    console.log(sex, bday, height, weight, activityLevel);
    /**Calculate BMR with Mifflin-ST Jeor equation (more accurate)*/
    let heightInCM = height * 2.54; //converts height from feet + inches to cm
    let weightInKG = weight * 0.45359237; //converts weight from lbs to kg
    let userBMR = 0;
    var age = Math.floor((new Date() - new Date(bday).getTime()) / 3.15576e10);
    // from StackOverflow Lucas Janon (https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd)
    if (sex === "male") {
      userBMR = 10 * weightInKG + 6.25 * heightInCM - 5 * age + 5;
      //unused Harris-Benedict equation:  userBMR = 88.362 + (13.397 * weightInKG) + (4.799 *  heightInCM) - (5.677 * age)
    }
    if (sex === "female") {
      userBMR = 10 * weightInKG + 6.25 * heightInCM - 5 * age - 161;
      //unused Harris-Benedict equation: userBMR = 447.593 + (9.247 * weightInKG) + (3.098 * heightInCM) - (4.330 * age)
    }
    /**Calculate AMR */
    let amr = 0;
    if (activityLevel === "sedentary") {
      amr = userBMR * 1.2;
    }
    if (activityLevel === "lightly active") {
      amr = userBMR * 1.375;
    }
    if (activityLevel === "moderately active") {
      amr = userBMR * 1.55;
    }
    if (activityLevel === "very active") {
      amr = userBMR * 1.725;
    }
    if (activityLevel === "extremely active") {
      amr = userBMR * 1.9;
    }
    // dont include thermic effect: let thermicEffect = userBMR * 0.1
    // let calorieReq = amr + thermicEffect
    return amr;
  }

  function Macro(calories, carbsSum, proteinSum, fatSum) {
    //recommended macro nutrient ratios: 45–65 percent carbohydrates, 10–30 percent protein, 20–35 percent fat
    let minCarbs = calories * 0.45;
    let maxCarbs = calories * 0.65;
    let minProteins = calories * 0.2;
    let maxProteins = calories * 0.3;
    let minFat = calories * 0.2;
    let maxFat = calories * 0.35;
    //false flag - red, true flag - green
    // let carbsFlag = false
    // let proteinFlag = false
    // let fatFlag = false
    // //check if user is within recommended ratios
    // if(carbsSum >= minCarbs && carbsSum <= maxCarbs) {
    //   carbsFlag = true
    // }
    // if(proteinSum >= minProteins && proteinSum <= maxProteins) {
    //   proteinFlag = true
    // }
    // if(fatSum >= minFat && fatSum <= maxFat) {
    //   fatFlag = true
    // }
    return { minCarbs, maxCarbs, minProteins, maxProteins, minFat, maxFat };
  }

  const [nutr, setNutr] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetchNutr();
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const currentUser = firebase.auth().currentUser;

  const fetchNutr = async () => {
    const response = db.collection("groceries").doc(currentUser.uid);
    const data = await response.get();
    console.log("data: " + JSON.stringify(data));
    setNutr([...nutr, data.data()]);
  };

  const fetchUserInfo = async () => {
    const response2 = db.collection("users").doc(currentUser.uid);
    const data2 = await response2.get();
    // console.log("data2: " + JSON.stringify(data2));
    setUserInfo([...userInfo, data2.data()]);
  };
  // var sumTotal;
  // var definedBudget;
  // const [nutr, setNutr] = useState([]);
  const [sumTotal, setSumTotal] = useState(0);
  const [totalCal, setTotalCal] = useState(0);
  const [sex, setSex] = useState("");
  const [bday, setBday] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [activityLevel, setActivity] = useState("");

  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalFats, setTotalFats] = useState(0);
  const [totalProt, setTotalProt] = useState(0);

  // defined Budget will be undefined, because the user is only setting the budget in the registration page
  const [definedBudget, setDefinedBudget] = useState(0);
  useEffect(() => {
    if (userInfo.length > 0) {
      console.log(JSON.stringify(userInfo));
      userInfo &&
        userInfo.map((info) => {
          setSumTotal(info.totalPrice);
          // sumTotal = info.totalPrice;
          setSex(info.femSex === "1" ? "female" : "male");
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
          console.log(
            "sumTotal: " + sumTotal + "  definedBudget: " + definedBudget
          );
        });
    }
    console.log("sumTotal: " + sumTotal);
  }, [userInfo]);

  const calcAMR = Calorie(sex, bday, height, weight, activityLevel);
  const reqMacros = Macro(calcAMR, totalCarbs, totalProt, totalFats);
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

  const history = useHistory();
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
    //Todo: auto refresh
  }

  function variantChanger0(now, max) {
    return now > max ? "danger" : "success";
  }
  function variantChanger1(now, max) {
    if (now < max) return "warning";
    else if (now > max) return "danger";
    else return "success";
  }
  function variantChanger2(now, min, max) {
    return now >= min && now <= max ? "success" : "danger";
  }

  try {
    return (
      <div className="overview">
        <Container>
          <Row>
            <Col>
              <section>
                <h4>Budget:</h4>
                <ProgressBar
                  now={sumTotal}
                  max={definedBudget}
                  label={`$${sumTotal} out of $${definedBudget}`}
                  variant={variantChanger0(sumTotal, definedBudget)}
                />
                <br></br>

                <h4>Calories (based on User Profile):</h4>
                <ProgressBar
                  now={totalCal}
                  max={calcAMR}
                  label={`${totalCal}kcal out of ${calcAMR}kcal`}
                  variant={variantChanger1(totalCal, calcAMR)}
                />
                <br></br>

                <h4>Carbohydrates:</h4>
                <ProgressBar
                  now={totalCarbs}
                  min={reqMacros[0]}
                  max={reqMacros[1]}
                  label={`${totalCarbs}g Carbs consumed`}
                  variant={variantChanger2(
                    totalCarbs,
                    reqMacros[0],
                    reqMacros[1]
                  )}
                />
                <br></br>

                <h4>Protein:</h4>
                <ProgressBar
                  now={totalProt}
                  min={reqMacros[2]}
                  max={reqMacros[3]}
                  label={`${totalProt}g Protein consumed`}
                  variant={variantChanger2(
                    totalProt,
                    reqMacros[2],
                    reqMacros[3]
                  )}
                />
                <br></br>

                <h4>Fats:</h4>
                <ProgressBar
                  now={totalFats}
                  min={reqMacros[4]}
                  max={reqMacros[5]}
                  label={`${totalFats}g Fats consumed`}
                  variant={variantChanger2(
                    totalFats,
                    reqMacros[4],
                    reqMacros[5]
                  )}
                />
              </section>
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
  } catch (error) {
    console.log(error);
    return (
      <Container className="mt-5 p-3">
        <h1>
          Please add more groceries. Currently, there are no items in your cart.
        </h1>
        <Button href="/groceries"> Go Shopping</Button>
      </Container>
    );
  }
}

export default Overview;
