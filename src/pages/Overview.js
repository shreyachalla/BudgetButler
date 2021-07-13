import React, { useEffect, useState } from 'react';
import {db, firebase} from "../firebase.js";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import "bootstrap/dist/css/bootstrap.min.css";

function Overview() {

  const[nutr, setNutr]=useState([]);

  useEffect(() => {
    fetchNutr();
  }, [])

  useEffect(() => {
    if(nutr.length > 0){
      // iterateNutrients(nutr)
      //console.log("nutr: " + JSON.stringify(nutr));
     // console.log(JSON.stringify({Object.entries(nutr["0"])[0][0]}));
    console.log(Object.keys(nutr)); 
      //console.log(JSON.stringify({Object.entries(nutr[0])[0][0]}));
    }
  })

  const fetchNutr=async()=>{
    const currentUser = firebase.auth().currentUser;    
    const response = db.collection('groceries').doc(currentUser.uid);
    const data =await response.get();
    setNutr([...nutr, data.data()])
    // console.log(nutr);
   
}


// const[nutr, setNutr]=useState([]);
// const[keys, setKeys] = useState([]);

function iterateNutrients(nutr){
  var keys = [];
  nutr.map(nutrients =>{
    // console.log("nutrients: " + Object.keys(nutrients))
    keys = Object.keys(nutrients);
    // console.log(keys)
    
  })
  console.log(nutr)
  
  nutr.map(nutrients =>{
    
    // console.log(nutrients["ARGO TEA"][0])
    // .map(o)
    // if it equals any of the values inside keys, then access the values inside and collect it
    // nutrients.array.forEach(element => {
    // console.log("nutrients: " + JSON.stringify(nutrients))
    var cleanedNutrients = {};
    for(var i = 0; i < keys.length; i++){
      // cleanedNutrients.
      for(var j = 0; j < nutrients[keys[i]].length; j++){
        var eachMacro = nutrients[keys[i]][j];
        if(eachMacro.name === 'Carbohydrates' && eachMacro.name ===  'Fat' && eachMacro.name && 'Protein' ){
          delete nutrients[keys[i]][j]
          j--;
          
        }
        
      }
    }
    console.log("nutrients: " + JSON.stringify(nutrients))

      return nutrients;
  })
 
}

function handleClear() {
  const currentUser = firebase.auth().currentUser;    
  db.collection("groceries").doc(currentUser.uid).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});


}

  return (
    <div className='overview'>
        
      
    {Object.keys(nutr).map((key)=>{ 
        return (
          <div> 
        <h5> {Object.entries(nutr["0"])[key]["0"]}</h5>
        <h5> {Object.values(nutr["0"])[key]["0"]["name"]}: {Object.values(nutr["0"])[key]["0"]["amount"]} 
                            {Object.values(nutr["0"])[key]["0"]["unit"]}</h5>
        <h5> {Object.values(nutr["0"])[key]["1"]["name"]}: {Object.values(nutr["0"])[key]["1"]["amount"]} 
                          {Object.values(nutr["0"])[key]["1"]["unit"]}</h5>
        <h5> {Object.values(nutr["0"])[key]["2"]["name"]}: {Object.values(nutr["0"])[key]["2"]["amount"]} 
                          {Object.values(nutr["0"])[key]["2"]["unit"]}</h5>
        <h5> {Object.values(nutr["0"])[key]["3"]["name"]}: {Object.values(nutr["0"])[key]["3"]["amount"]} 
                         {Object.values(nutr["0"])[key]["3"]["unit"]}</h5> 
        </div> 
        )
      })}
      
   
  
       {/* <h1>nutr  </h1>
      <h1>Your Status</h1>
      <h1>Carbs Consumed: </h1> 
      <h2>Fats Consumed: </h2> 
       <h2> Protein Consumed: </h2>  */}
    
    
      
         
        
              
               
               { /* {Object.keys(nutr).map((key)=>{
                    return (
                  <h4>{Object.entries(nutr["0"])[key][0]}</h4>
                  
                      <h5> {Object.values(nutr["0"])[0][0]["name"]}: {Object.values(nutr["0"])[0][0]["amount"]} 
                            {Object.values(nutr["0"])[0][0]["unit"]}</h5>
            
                    <h5> {Object.values(nutr["0"])[0][1]["name"]}: {Object.values(nutr["0"])[0][1]["amount"]} 
                          {Object.values(nutr["0"])[0][1]["unit"]}</h5>

                    <h5> {Object.values(nutr["0"])[0][2]["name"]}: {Object.values(nutr["0"])[0][2]["amount"]} 
                          {Object.values(nutr["0"])[0][2]["unit"]}</h5>

                    <h5> {Object.values(nutr["0"])[0][3]["name"]}: {Object.values(nutr["0"])[0][3]["amount"]} 
                         {Object.values(nutr["0"])[0][3]["unit"]}</h5> 
              
                );
                    )}} */}
           

    

      <button type="submit" onClick={handleClear}>Clear Grocery List</button>
    
    </div>
  );
}

export default Overview;

