import React from "react";
import { FaRegRegistered } from "react-icons/fa";
import {db, firebase} from "../firebase.js";
import {Link, useHistory} from "react-router-dom";

const Register = () => {
  const history = useHistory();

    const saveAnswer = (event) => {
      event.preventDefault();
  
      const elementsArray = [...event.target.elements];
  
      const formData = elementsArray.reduce((accumulator, currentValue) => {
        if (currentValue.id) {
          accumulator[currentValue.id] = currentValue.value;
        }
        // accumulator['macros'] = [];
        console.log(accumulator);
        return accumulator;
      }, {});
  
      const currentUser = firebase.auth().currentUser;  
      db.collection("users").doc(currentUser.uid).set(formData);
      // db.collection('users').doc(currentUser.uid).collection('groceries').add({groceries: "check"});

      history.push('/groceries');
    };

    

    return (

      <div className="container">

      
        <h1>User Profile</h1>
        <form onSubmit={saveAnswer}>
            <div class="formGroup">
              <label for="username">Username: </label>
              {/* /*make it so that the username is unchangeable? */}
              <input type="text" id="username" placeholder="Enter username here..."></input>   
            </div>
            <div class="formGroup">
              <label for="name">Name: </label>
              <input type="text" id="name" placeholder="Type Full Name here..."></input>
            </div>
            <div class="formGroup">
              <label for="birthday">Date of Birth: </label>
              <input type="date" id="birthday" name="birthday"></input>
            </div>
            <div class="formGroup">
              <label for="email">Email: </label>
              <input type="email" id="email" name="email" placeholder="Enter Email here"></input>
            </div>
            <div class="formGroup">
              <label for="height">Height: </label>
              <input type="number" id="height" placeholder="Type Height here..."></input>
            </div>
            <div class="formGroup">
              <label for="weight">Weight: </label>
              <input type="number" id="weight" placeholder="Type Weight here..."></input> 
            </div>
            <div class="formGroup">
              <label for="femSex">Female</label>
              <input type="radio" id="femSex" name="female" value="1"></input>
              <label for="malSex">Male</label>
              <input type="radio" id="malSex" name='male' value="0"></input>
            </div>
            <div class="formGroup">
              <label for="activityLevel">Level of Physical Activity</label>
              <select id="activityLevel">
                <option value="sedentary">sedentary</option>
                <option value="lightly active">lightly active</option>
                <option value="moderately active">moderately active</option>
                <option value="very active">very active</option>
                <option value="extremely active">extremely active</option>
              </select>
            </div>
          <button type="submit">Submit to Firebase</button>
          {/* sedentary, lightly active, moderately active, very active, extremely active */}
          {/* <div class= */}

        </form>
        
      </div>
    );
  };
  

export default Register;