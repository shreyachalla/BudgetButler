import React, { useEffect, useState } from 'react';
import {db, firebase} from "../firebase.js";

function Overview() {

  const[nutr, setNutr]=useState([]);

  useEffect(() => {
    fetchNutr();
  }, [])

  const fetchNutr=async()=>{
    const currentUser = firebase.auth().currentUser;  
  
    const nutrients = [];

    db.collection('users').doc(currentUser.uid).collection('groceries').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());

      let currentID = doc.id;
      let nutrObj = {  ...doc.data(), ['id']: currentID}
      
      console.log("nutrObj NOT THE SET STATE HOOK: " + JSON.stringify(nutrObj))
      
 
    setNutr(
     
      nutr => [...nutr, nutrObj]
    );
    console.log("nutr: " + JSON.stringify(nutr));
  }); 

});
    
    
    // console.log("nutr: " + JSON.stringify(nutr))
    
}

const findMacros= ()=>{
  nutr.id.names.name.map(function(mac) {
    if (mac === "Fat" || mac === "Carbohydrates" || mac === "Protein" || mac === "Calories"){
      // return true;
      console.log(mac);
    }
    
  })

}
    


  return (
    // <div className='overview'>
    //   <h1>test</h1>
    // </div>

    
    <div>
      <h4>{findMacros}</h4>
    
      {
        nutr && nutr.map(nutr =>{
          return(
             <div className='overview'>
                {/* <h4>{nutr.names[0].name}</h4>  */}
                <h4>{nutr[0]}</h4>
                {/* <h4>check</h4> */}

             </div>
            
          )
        })
      }
      


       {/* <h1>nutr  </h1>
      <h1>Your Status</h1>
      <h1>Carbs Consumed: </h1> 
      <h2>Fats Consumed: </h2> 
      <h2> Protein Consumed: </h2>  */}

      {/* ... */}
    </div>
  );
}

export default Overview;

