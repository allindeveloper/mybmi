import * as React from 'react';
import {View, Text, StyleSheet, Platform, TextInput, ScrollView} from 'react-native';
import {Surface, Button} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { appHelpers } from '../appHelpers';
import { color } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
const HomeScreen =(props) => {
  const [maleCardColor, setMaleCardColor] = React.useState("white");
  const [femaleCardColor, setFemaleCardColor] = React.useState("white");
  const [cmColor, setcmColor] = React.useState("white");
  const [ftColor, setftColor] = React.useState("black");
  const [kgColor, setkgColor] = React.useState("white");
  const [lbColor, setlbColor] = React.useState("black");
  const [feetCentimeterValue, setFeetCentimeterValue] = React.useState(null);
  const [kglbValue, setkglbValue] = React.useState(null);
  const [ageValue, setAgeValue] = React.useState(null);

  React.useEffect(()=>{
    // console.log("center to feet", appHelpers.centimetertoFeet(182))
    console.log("feet to centimeter", feetCentimeterValue)
  },[])

  const toggleCm = () =>{
    if(cmColor === "white"){
      setcmColor("black");
      setftColor("white")
      // convert value from cm to feet
      const feet = appHelpers.centimetertoFeet(feetCentimeterValue);
      setFeetCentimeterValue(feet.toString());
      console.log("center to feet")
    }else{
      setcmColor("white");
      setftColor("black");
      // convert value from feet back to centimeter
      const centimeter = appHelpers.feettoCentimeter(feetCentimeterValue);
      setFeetCentimeterValue(centimeter.toString());
    }
  }


  const toggleFt = () =>{
    if(ftColor === "black"){
      setftColor("white");
      setcmColor("black");
      // convert value from cm to feet
      const feet = appHelpers.centimetertoFeet(feetCentimeterValue);
      console.log("feet right now", feet)
      setFeetCentimeterValue(feet.toString());
    }else{
      setftColor("black");
      setcmColor("white");
      // convert value from feet back to centimeter
      const centimeter = appHelpers.feettoCentimeter(feetCentimeterValue);
      setFeetCentimeterValue(centimeter.toString());
    }
    
  }


  const toggleKg = () =>{
    if(kgColor === "white"){
      setkgColor("black");
      setlbColor("white")
      // convert value from kilogram to pounds (lb)
      const kg = appHelpers.kilogramstoPounds(kglbValue);
      setkglbValue(kg.toString());
      console.log("center to kgg", kg)
    }else{
      setkgColor("white");
      setlbColor("black");
      // convert value from pounds back to kilograms
      const pounds = appHelpers.poundstoKilograms(kglbValue);
      console.log("value here", pounds)
      setkglbValue(pounds.toString());
    }
  }

  const toggleLb = () =>{
    if(lbColor === "black"){
      setlbColor("white");
      setkgColor("black");
      // convert value from Pounds to Kilograms
      const kg = appHelpers.kilogramstoPounds(kglbValue);
      console.log("value here---", kg)
      setkglbValue(kg.toString());
    }else{
      setkgColor("white");
      setlbColor("black");
      // convert value from pounds back to kilograms
      const pounds = appHelpers.poundstoKilograms(kglbValue);
      console.log("value haa", pounds)
      setkglbValue(pounds.toString());
    }
  }

  const handleFeetCentimeterChange = (text) =>{
     setFeetCentimeterValue(text)
  }
  const handleKilogramPoundsChange = (text) =>{
    setkglbValue(text)
 }

  const calculateBmi = () =>{
    console.log("feet to centi", feetCentimeterValue)

    // bmi formula = kg / height^2
    if(cmColor === "white" && kgColor === "white"){
    const heightMeters = appHelpers.centimeterToMeter(feetCentimeterValue);
    console.log("heightMeters:1", heightMeters, kglbValue)
    const bmi =(kglbValue / Math.pow(heightMeters,2));
    console.log("Your bmi 1 :", bmi.toPrecision(4));
    props.navigation.navigate('Details',{bmi});
    return;
    }
    if(cmColor === "black" && kgColor === "white"){
      const heightMeters = appHelpers.feetToMeter(feetCentimeterValue);
      const bmi = kglbValue / Math.pow(heightMeters,2);
      console.log("Your bmi 2 :", bmi);
      props.navigation.navigate('Details',{bmi});
      return;
    }
    if(kgColor === "black" && cmColor === "black"){
      const poundstoKilograms = appHelpers.poundstoKilograms(kglbValue);
      const heightMeters = appHelpers.feetToMeter(feetCentimeterValue);
      const bmi = poundstoKilograms / Math.pow(heightMeters,2);
      console.log("Your bmi 3 :", bmi);
      props.navigation.navigate('Details',{bmi});
      return;
    }
    if(kgColor === "black" && cmColor === "white"){
      const poundstoKilograms = appHelpers.poundstoKilograms(kglbValue);
      const heightMeters = appHelpers.centimeterToMeter(feetCentimeterValue);
      const bmi = poundstoKilograms / Math.pow(heightMeters,2);
      console.log("Your bmi 4 :", bmi);
      props.navigation.navigate('Details',{bmi});
      return;
    }
    

  }

  const handleAgeChange = (text) =>{
    setAgeValue(text);
  }

  const addHandler = () =>{
    const newValue = parseInt(ageValue)+1;
    setAgeValue(newValue.toString());
  }
  const minusHandler = () =>{
    const newValue = parseInt(ageValue)-1;
    if(newValue<0){
      setAgeValue("0");
    }else{
      setAgeValue(newValue.toString());
    }
  }

  const femaleCardHandler = () =>{
    if(femaleCardColor === "white"){
      setFemaleCardColor("#bdbdbd");
      setMaleCardColor("white")
    }else{
      setFemaleCardColor("white");
      setMaleCardColor("#bdbdbd")
    }
  }
  const maleCardHandler = () =>{
    if(maleCardColor === "white"){
      setMaleCardColor("#bdbdbd");
      setFemaleCardColor("white")
    }else{
      setMaleCardColor("white");
      setFemaleCardColor("#bdbdbd")
    }
    
  }
  return (
    <View style={{flex: 1, backgroundColor: '#FFC501'}}>
      <View style={{display:"flex", justifyContent:"space-between", flexDirection:"row",marginTop: Platform.OS === 'ios' ? 90 : 10}}>
      <Text style={styles.mainText}>BMI Calculator</Text>
      <MaterialIcons name="refresh" size={30} style = {{alignSelf:"center", marginEnd:20}} />
      </View>
      
      <View style={styles.content}>
        <Surface style={StyleSheet.flatten([styles.surface(maleCardColor)])}>
        <TouchableOpacity onPress={maleCardHandler} style={{ display:"flex",justifyContent:"center", height: 180,
    width: 180,}}>
          <MaterialCommunityIcons
            name="gender-male"
            size={70}
            style={{alignSelf: 'center'}}
          />
          <Text style={{textAlign:"center"}}>Male</Text>
          </TouchableOpacity>
        </Surface>
        
        <Surface style={StyleSheet.flatten([styles.surface(femaleCardColor)])}>
        <TouchableOpacity onPress={femaleCardHandler} style={{ display:"flex",justifyContent:"center", height: 180,
    width: 180,}}>
          <MaterialCommunityIcons
            name="gender-female"
            size={70}
            style={{alignSelf: 'center'}}
          />
          <Text style={{textAlign:"center"}}>Female</Text>
          </TouchableOpacity>
        </Surface>
        
      </View>
      <ScrollView>
      <View style={styles.inputs}>
        <View style={styles.dimensions}>
          <Text onPress={toggleCm} style={{justifyContent: 'flex-start',alignItems: 'center',margin: 10,fontSize: 20,color:cmColor}}>cm</Text>
          <Text onPress={toggleFt} style={{justifyContent: 'flex-start',alignItems: 'center',margin: 10,fontSize: 20,color:ftColor}}>ft</Text>
        </View>
        <TextInput
          placeholder="0"
          underlineColorAndroid="transparent"
          style={styles.cmInputStyle}
          onChangeText={handleFeetCentimeterChange}
          value={feetCentimeterValue}
        />

        
      </View>

      <View style={styles.inputs}>
        <View style={styles.dimensions}>
          <Text onPress={toggleKg} style={{justifyContent: 'flex-start',alignItems: 'center',margin: 10, fontSize: 20,color:kgColor}}>kg</Text>
          <Text onPress={toggleLb} style={{justifyContent: 'flex-start',alignItems: 'center',margin: 10,fontSize: 20,color:lbColor}}>lb</Text>
        </View>
        {/* <View style={{display:"flex", justifyContent:"center", flexDirection:"row", marginLeft:30}}>
        <MaterialCommunityIcons onPress={minusHandler} name="minus-circle" size={30} style = {{alignSelf:"center", color:"white", marginRight:-10}} />
        */}
        <TextInput
          placeholder="0"
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          style={styles.kgInputStyle}
          value={kglbValue}
          onChangeText={handleKilogramPoundsChange}
        />
        {/* <MaterialIcons onPress={addHandler} name="add-circle" size={30} style = {{alignSelf:"center", color:"white",marginLeft:-10}} />
      </View> */}

        
      </View>

      <View style={styles.inputs}>
        <View style={styles.dimensions}>
          <Text style={styles.age}>Age</Text>
        </View>
        <View style={{display:"flex", justifyContent:"center", flexDirection:"row",marginLeft:60}}>
        <MaterialCommunityIcons onPress={minusHandler} name="minus-circle" size={30} style = {{alignSelf:"center", color:"white",marginRight:-40}} />
        <TextInput
          placeholder="0"
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          style={styles.ageInputStyle}
          value={ageValue}
          onChangeText={handleAgeChange}
        />
        <MaterialIcons onPress={addHandler} name="add-circle" size={30} style = {{alignSelf:"center", color:"white",marginLeft:-10}} />
        </View>

        
      </View>

      <View style={{display:"flex", margin:60}}>
      <Button icon="camera" style={{backgroundColor:"black"}} mode="contained" onPress={calculateBmi}>
        Calculate BMI
      </Button>
      </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  age: {
    margin: 10,
    fontSize: 20,
    marginStart:30
  },
  cm: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
    fontSize: 20
  },
  kg: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
    fontSize: 20,
  },
  lb: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
    fontSize: 20,
  },
  dimensions: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputs: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  cmInputStyle:{
    textAlign: 'center',
    height: 50,
    width: 150,
    borderRadius: 20,
    backgroundColor: "white",
    fontSize:20,
    textAlignVertical:"center",
    marginLeft:20
  },
  kgInputStyle: {
    textAlign: 'center',
    height: 50,
    width: 150,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    fontSize:20,
    marginLeft:20
  },
  ageInputStyle: {
    textAlign: 'center',
    overflow:'hidden',
    color:"black",
    height: 50,
    width: 150,
    borderRadius: 120,
    backgroundColor: '#FFFFFF',
    marginStart:30,
    fontSize:20
  },
  mainText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginStart: 20,
    
  },
  surface : reaction => ({
    padding: 8,
    height: 180,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    marginTop: 15,
    marginStart: 5,
    marginEnd: 5,
    borderRadius:10,
    backgroundColor:reaction
  }),
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});

export default HomeScreen;
