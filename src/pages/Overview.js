import React, { useEffect, useState } from 'react';
import {db, firebase} from "../firebase.js";

function Overview() {

  const[nutr, setNutr]=useState([]);

  useEffect(() => {
    fetchNutr();
  }, [])

  useEffect(() => {
    if(nutr.length > 0){
      // iterateNutrients(nutr)
      console.log("nutr: " + JSON.stringify(nutr));
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
        {/* <h1>test</h1> */}
      
      {/* {
        nutr && nutr.map(nutrients => {
          Object.keys(nutrients).map((key) =>{
            return <h5>{nutrients[key]} </h5>
          })
        })
      } */}
      {Object.keys(nutr).map((key)=>{
        return <h5>{JSON.stringify(nutr[key])}</h5>
      })
      
      }
    
    {/* { */}
      {/* nutr && nutr.map(nutrients =>{ */}
        {/* console.log("nutrients") */}
        {/* console.log("nutrients: "+ JSON.stringify(nutrients)) */}
      {/* return( */}
        {/* <div> */}
        {/* <h4>{nutrients["ARGO TEA"][0].name}</h4> */}
        {/* nutrients[keys[i]][j] */}

        {/* <h4>{Object.keys(nutrients) }</h4>    */}
        {/* <h4>{Object.values(nutrients) }</h4> */}
        {/* </div> */}
        
      {/* ) */}
    {/* })} */}
    
    
    
  
       {/* <h1>nutr  </h1>
      <h1>Your Status</h1>
      <h1>Carbs Consumed: </h1> 
      <h2>Fats Consumed: </h2> 
      <h2> Protein Consumed: </h2>  */}

      <button type="submit" onSubmit={handleClear}>Clear Grocery List</button>
    
    </div>
  );
}

export default Overview;

