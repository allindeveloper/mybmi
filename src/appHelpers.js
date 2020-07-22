export const appHelpers = {
  centimetertoFeet: value => {
    let feet = value/30.48;

    return Number(feet.toFixed(2))
  },

  feettoCentimeter : value =>{
    let centimeter = value*30.48;

    return Number(centimeter.toFixed(0))
  },


  kilogramstoPounds: value=>{
    let pounds = value * 2.205;
    return Number(pounds.toFixed(3));
  },

  poundstoKilograms: value => {
    let kg = value / 2.205;
    return kg;
  }
  ,
  centimeterToMeter : value =>{
    let meter = value / 100;
    return Number(meter.toFixed(3));
  }
,
  feetToMeter : value => {
    let meter = value / 3.281;
    return Number(meter.toFixed(3));
  },

  countDecimals :(value) =>{
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
},

validateBmiCalculation : (context) =>{
  let resObj = {isValid:true, message:""};

  if(context.state.gender === ""){
    resObj.isValid = false,
    resObj.message  = "Gender is Required";
  }
  else if(context.state.feetCentimeterValue === null){
    resObj.isValid = false,
    resObj.message  = "Feet or Centimeter is Required";
  }
  else if(context.state.kglbValue === null){
    resObj.isValid = false,
    resObj.message  = "Kilogram or Pounds is Required";
  }
  else if(context.state.ageValue === null){
    resObj.isValid = false,
    resObj.message  = "Age is Required";
  }

  return resObj;
},
updateReportValue : (bmi,context) =>{
  
  if(bmi >0 && bmi <= 18.5){
    context.setState({reportValue:"Under Weight"})
  }else if(bmi >= 18.5 || bmi <= 24.9){
    context.setState({reportValue:"Normal Weight"})
  }else if(bmi >=25 || bmi <=29.9){
    context.setState({reportValue:"Over Weight"})
  }
  else if(bmi === 30 || bmi >30){
    context.setState({reportValue:"Obesity"})
  }
  else {
    context.setState({reportValue:"-"})
  }
}

}