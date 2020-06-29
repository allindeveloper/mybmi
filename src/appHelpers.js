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

}