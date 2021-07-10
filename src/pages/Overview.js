import React, { useEffect, useState } from 'react';
import {db, firebase} from "../firebase.js";

function Overview() {

  const[nutr, setNutr]=useState([]);

  useEffect(() => {
    fetchNutr();
  }, [])

  const fetchNutr=async()=>{
    const currentUser = firebase.auth().currentUser;  
    // const response=db.collection('users').doc(currentUser.uid).collection('groceries').doc('Chiquita Juicy Red Apple Bites, 2 oz, 5 count');
    const nutrients = [];

    db.collection('users').doc(currentUser.uid).collection('groceries').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());


      let currentID = doc.id;
      let nutrObj = { ['id']: currentID, ...doc.data()}
      nutrients.push(nutrObj);
      // console.log("nutrObj NOT THE SET STATE HOOK: " + JSON.stringify(nutrObj))
      
    // const data=await response.get();
    // setNutr([...nutr,data.data()])
  }); 

});
    setNutr(
      nutr => [...nutr, {nutrients}]
      // nutr => [...nutr, nutrObj]
    );
    console.log("nutr: " + JSON.stringify(nutr))
  
}



  return (
    // <div className='overview'>
    //   <h1>test</h1>
    // </div>
    <div>
    
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

