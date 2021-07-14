import React, { useEffect, useState } from "react";
import { db, firebase } from "../firebase.js";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import "bootstrap/dist/css/bootstrap.min.css";

function Overview() {
  const [nutr, setNutr] = useState([]);

  useEffect(() => {
    fetchNutr();
  }, []);

  useEffect(() => {
    if (nutr.length > 0) {
      // iterateNutrients(nutr)
      //console.log("nutr: " + JSON.stringify(nutr));
      // console.log(JSON.stringify({Object.entries(nutr["0"])[0][0]}));
      console.log(Object.keys(nutr));
      //console.log(JSON.stringify({Object.entries(nutr[0])[0][0]}));
    } else {
      outOfOrder();
    }
  });

  const fetchNutr = async () => {
    const currentUser = firebase.auth().currentUser;
    const response = db.collection("groceries").doc(currentUser.uid);
    const data = await response.get();
    setNutr([...nutr, data.data()]);
    // console.log(nutr);
  };

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
  }

  function outOfOrder() {
    return <h5>Nothing in cart. Please go to Groceries to fill your cart.</h5>;
  }

  return (
    <div className="overview">
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
                        {nutr[key][product][0]["unit"]}
                      </h5>
                    )
                  })}
                  
                </div>
              );
            })}
          </div>
        );
      })}
      
      <button type="submit" onClick={handleClear}>
        Clear Grocery List
      </button>
    </div>
  );
}

export default Overview;
