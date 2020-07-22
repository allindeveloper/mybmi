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
    context.setState({spinner:false});
  }
  else if(context.state.feetCentimeterValue === null){
    resObj.isValid = false,
    resObj.message  = "Feet or Centimeter is Required";
    context.setState({spinner:false});
  }
  else if(context.state.kglbValue === null){
    resObj.isValid = false,
    resObj.message  = "Kilogram or Pounds is Required";
    context.setState({spinner:false});
  }
  else if(context.state.ageValue === null){
    resObj.isValid = false,
    resObj.message  = "Age is Required";
    context.setState({spinner:false});
  }
  

  return resObj;
},
updateReportValue : (bmi,context) =>{
  
  const newBmi = bmi;
  console.log("bmmiiii",newBmi)
  if(newBmi>=30){
    context.setState({reportValue:"Obesity"});
    return;
  }
  if(newBmi >=0 && newBmi <=18.5){
    context.setState({reportValue:"Under Weight"});
    return;
  }
  if(newBmi > 18.5 && newBmi <=24.9){
    context.setState({reportValue:"Normal Weight"});
    return;
  }
  if(newBmi > 25 && newBmi <=29.9){
    context.setState({reportValue:"Over Weight"});
    return;
  }
}

}