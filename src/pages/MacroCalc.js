import React from 'react';

function MacroCalc({sex, bday, height, weight, activityLevel}) {
  function Calorie() {

    /**Calculate BMR with Mifflin-ST Jeor equation (more accurate)*/
    let heightInCM = (height * 2.54) //converts height from feet + inches to cm
    let weightInKG = weight * 0.45359237 //converts weight from lbs to kg
    let userBMR = 0
    var age = bday => Math.floor((new Date() - new Date(bday).getTime()) / 3.15576e+10)
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
function Macro(calories, carbsSum, proteinSum, fatSum) {
  //recommended macro nutrient ratios: 45–65 percent carbohydrates, 10–30 percent protein, 20–35 percent fat
  let minCarbs = calories * 0.45
  let maxCarbs = calories * 0.65
  let minProteins = calories * 0.2
  let maxProteins = calories * 0.3
  let minFat = calories * 0.2
  let maxFat = calories * 0.35
  //false flag - red, true flag - green
  let carbsFlag = false
  let proteinFlag = false
  let fatFlag = false
  //check if user is within recommended ratios 
  if(carbsSum >= minCarbs && carbsSum <= maxCarbs) {
    carbsFlag = true
  } 
  if(proteinSum >= minProteins && proteinSum <= maxProteins) {
    proteinFlag = true
  } 
  if(fatSum >= minFat && fatSum <= maxFat) {
    fatFlag = true
  } 
  return {carbsFlag, proteinFlag, fatFlag}
}

  return (
    <div className='calorie'>
      {Calorie()}
    </div>
  );
}

export default MacroCalc;
