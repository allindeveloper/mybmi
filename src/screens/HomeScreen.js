import * as React from 'react';
import {View, Text, StyleSheet, Platform, TextInput, ScrollView} from 'react-native';
import {Surface, Button} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { appHelpers } from '../appHelpers';
const HomeScreen =(props) => {

  const [cmColor, setcmColor] = React.useState("white");
  const [ftColor, setftColor] = React.useState("black");
  const [feetCentimeterValue, setFeetCentimeterValue] = React.useState(null);
  const [kglbValue, setkglbValue] = React.useState(0);
  const [ageValue, setAgeValue] = React.useState(0);

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

  const handleFeetCentimeterChange = (text) =>{
     setFeetCentimeterValue(text)
  }

  const calculateBmi = () =>{
    console.log("feet to centi", feetCentimeterValue)
  }
  return (
    <View style={{flex: 1, backgroundColor: '#FFC501'}}>
      <View style={{display:"flex", justifyContent:"space-between", flexDirection:"row",marginTop: Platform.OS === 'ios' ? 90 : 10}}>
      <Text style={styles.mainText}>BMI Calculator</Text>
      <MaterialIcons name="refresh" size={30} style = {{alignSelf:"center", marginEnd:20}} />
      </View>
      
      <View style={styles.content}>
        <Surface style={styles.surface}>
          <MaterialCommunityIcons
            name="gender-male"
            size={70}
            style={{alignSelf: 'center'}}
          />
          <Text>Male</Text>
        </Surface>
        <Surface style={styles.surface}>
          <MaterialCommunityIcons
            name="gender-female"
            size={70}
            style={{alignSelf: 'center'}}
          />
          <Text>Female</Text>
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
          <Text style={styles.kg}>kg</Text>
          <Text style={styles.lb}>lb</Text>
        </View>
        <TextInput
          placeholder="0"
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          style={styles.kgInputStyle}
          value={kglbValue}
        />

        
      </View>

      <View style={styles.inputs}>
        <View style={styles.dimensions}>
          <Text style={styles.age}>Age</Text>
        </View>
        <TextInput
          placeholder="0"
          underlineColorAndroid="transparent"
          // keyboardType="numeric"
          style={styles.ageInputStyle}
          value={ageValue}
        />

        
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
    textAlignVertical:"center"
  },
  kgInputStyle: {
    textAlign: 'center',
    height: 50,
    width: 150,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    fontSize:20
  },
  ageInputStyle: {
    textAlign: 'center',
    color:"black",
    height: 50,
    width: 150,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginStart:30,
    fontSize:20
  },
  mainText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginStart: 20,
    
  },
  surface: {
    padding: 8,
    height: 180,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    marginTop: 15,
    marginStart: 5,
    marginEnd: 5,
    borderRadius:10
  },
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
