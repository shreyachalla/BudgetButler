import React, { useEffect, useState } from 'react';
import {db, firebase} from "../firebase.js";

function Overview() {

  const[nutr, setNutr]=useState([]);

  useEffect(() => {
    fetchNutr();
  }, [])

  useEffect(() => {
    if(nutr.length > 0){
      iterateNutrients(nutr)
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
    console.log("nutrients: " + Object.keys(nutrients))
    keys = Object.keys(nutrients);
    // console.log(keys)
    
  })
  console.log(nutr)
  nutr.map(nutrients =>{
    // .map(o)
    // if it equals any of the values inside keys, then access the values inside and collect it
    // nutrients.array.forEach(element => {
      
    // });
    for(var i = 0; i < keys.length; i++){
      for(var j = 0; j < nutrients[keys[i]].length; j++){
        var eachMacro = nutrients[keys[i]];
        if(eachMacro === 'Carbohydrates' || eachMacro ===  'Fat' || eachMacro === 'Protein' ){
          // ADD IT HERE
        }
        
      }
    }

  })
 

  
}

  return (
    <div className='overview'>
        {/* <h1>test</h1> */}
    
    {
      nutr && nutr.map(nutrients =>{
        {/* console.log("nutrients") */}
        {/* console.log("nutrients: "+ JSON.stringify(nutrients)) */}
      return(
        <div>
        <h4>{nutrients["ARGO TEA"][0].name}</h4>
        <h4>{Object.keys(nutrients) }</h4>   
        {/* <h4>{Object.values(nutrients) }</h4> */}
        </div>
        
      )
    })}
    
    
    
  
       {/* <h1>nutr  </h1>
      <h1>Your Status</h1>
      <h1>Carbs Consumed: </h1> 
      <h2>Fats Consumed: </h2> 
      <h2> Protein Consumed: </h2>  */}

    
    </div>
  );
}

export default Overview;

