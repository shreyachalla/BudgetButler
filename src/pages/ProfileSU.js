import React from "react";
import {db} from "../firebase.js";
import "./profileSU.css";

const Profile = () => {
    const saveAnswer = (event) => {
      event.preventDefault();
  
      const elementsArray = [...event.target.elements];
  
      const formData = elementsArray.reduce((accumulator, currentValue) => {
        if (currentValue.id) {
          accumulator[currentValue.id] = currentValue.value;
        }
  
        return accumulator;
      }, {});
  
      db.collection("users").add(formData);

    //  this updates values of specific fields
      // db.collection("users").doc('rxTB9VY2woYD7C4kRAyb').update({name: "jack"});
    
    };
  // const ifUserInfoFilled = 

    return (
//check if data is already there-- fetch
// if true ->set instead of add
// 
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
          <button>Submit to Firebase</button>

        </form>
        
      </div>
    );
  };
  

export default Profile;