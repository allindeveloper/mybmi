import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import {Surface, Button} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {appHelpers} from '../appHelpers';
import AsyncStorage from '@react-native-community/async-storage';
import {color} from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import { Snackbar } from "react-native-paper";
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import AppDatabase from '../../AppDatabase';

const db = new AppDatabase();
const initialState = {
      maleCardColor: 'white',
      femaleCardColor: 'white',
      cmColor: 'white',
      ftColor: 'black',
      kgColor: 'white',
      lbColor: 'black',
      feetCentimeterValue: null,
      kglbValue: null,
      ageValue: null,
      bmiData:null,
      gender:"",
      bmiData: [],
}
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maleCardColor: 'white',
      femaleCardColor: 'white',
      cmColor: 'white',
      ftColor: 'black',
      kgColor: 'white',
      lbColor: 'black',
      feetCentimeterValue: null,
      kglbValue: null,
      ageValue: null,
      bmiData:null,
      gender:"",
      bmiData: [],
      };
    
  }

  async componentDidMount(){
    // this.saveProduct();
    this.getProducts();
    try {
      const bookmarksString = await AsyncStorage.getItem('@MyStore:bookmarks');
      if (bookmarksString !== null){
        // We have data!!
        let bookmarksArray = JSON.parse(bookmarksString);

        this.setState({bmiData:bookmarksArray},()=>{
          console.log("bookmarksArray",  bookmarksArray)
          console.log("bmi Data state from storage",  this.state.bmiData)

        })
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  saveProduct(reportId,gender,bmi,age,weight, creatdeddate) {
    let data = {
      ReportId: reportId,
      Gender: gender,
      Bmi: bmi,
      Age: age,
      Weight: weight,
      CreatedDate: creatdeddate
    }
    db.addProduct(data).then((result) => {
      console.log("response after adding",result);
      this.setState({
        isLoading: false,
      });
     
    }).catch((err) => {
      console.log("eror in saving",err);
      this.setState({
        isLoading: false,
      });
    })
  }


  getProducts() {
    let products = [];
    db.listProduct().then((data) => {
      products = data;
      this.setState({
        products,
        isLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }
  // const [maleCardColor, setMaleCardColor] = React.useState("white");
  // const [femaleCardColor, setFemaleCardColor] = React.useState("white");
  // const [cmColor, setcmColor] = React.useState("white");
  // const [ftColor, setftColor] = React.useState("black");
  // const [kgColor, setkgColor] = React.useState("white");
  // const [lbColor, setlbColor] = React.useState("black");
  // const [feetCentimeterValue, setFeetCentimeterValue] = React.useState(null);
  // const [kglbValue, setkglbValue] = React.useState(null);
  // const [ageValue, setAgeValue] = React.useState(null);

  saveBookmarks = async (bookmarksArray) => {
    try {
      const bookmarksString = JSON.stringify(bookmarksArray);
      await AsyncStorage.setItem('@MyStore:bookmarks',bookmarksString);
    } catch (error) {
      // Error saving data
    }
  };
  toggleCm = () => {
    const {cmColor,feetCentimeterValue} = this.state;
    if (cmColor === 'white') {
      this.setState({cmColor: 'black', ftColor: 'white'});
      // convert value from cm to feet
      const feet = appHelpers.centimetertoFeet(feetCentimeterValue);
      this.setState({feetCentimeterValue: feet.toString()});
      // setFeetCentimeterValue(feet.toString());
      console.log('center to feet');
    } else {
      this.setState({cmColor: 'white', ftColor: 'black'});
      // setcmColor("white");
      // setftColor("black");
      // convert value from feet back to centimeter
      const centimeter = appHelpers.feettoCentimeter(feetCentimeterValue);
      // setFeetCentimeterValue(centimeter.toString());
      this.setState({feetCentimeterValue: centimeter.toString()});
    }
  };

  toggleFt = () => {
    const {ftColor,feetCentimeterValue} = this.state;
    if (ftColor === 'black') {
      // setftColor('white');
      // setcmColor('black');
      this.setState({ftColor:"white",cmColor:"black"})
      // convert value from cm to feet
      const feet = appHelpers.centimetertoFeet(feetCentimeterValue);
      console.log('feet right now', feet);
      // setFeetCentimeterValue(feet.toString());
      this.setState({feetCentimeterValue:feet.toString()})
    } else {
      // setftColor('black');
      // setcmColor('white');
      this.setState({ftColor:"white",cmColor:"whitw"})
      // convert value from feet back to centimeter
      const centimeter = appHelpers.feettoCentimeter(feetCentimeterValue);
      // setFeetCentimeterValue(centimeter.toString());
      this.setState({feetCentimeterValue:centimeter.toString()})
    }
  };

  toggleKg = () => {
    const {kgColor,kglbValue} = this.state
    if (kgColor === 'white') {
      // setkgColor('black');
      // setlbColor('white');
      this.setState({kgColor:"black",lbColor:"white"})
      // convert value from kilogram to pounds (lb)
      const kg = appHelpers.kilogramstoPounds(kglbValue);
      // setkglbValue(kg.toString());
      this.setState({kglbValue:kg.toString()})
      console.log('center to kgg', kg);
    } else {
      // setkgColor('white');
      // setlbColor('black');
      this.setState({kgColor:'white',lbColor:'black'})
      // convert value from pounds back to kilograms
      const pounds = appHelpers.poundstoKilograms(kglbValue);
      console.log('value here', pounds);
      // setkglbValue(pounds.toString());
      this.setState({kglbValue:pounds.toString()})
    }
  };

  toggleLb = () => {
    const {lbColor,kglbValue} = this.state;
    if (lbColor === 'black') {
      // setlbColor('white');
      // setkgColor('black');
      this.setState({lbColor:'white',kgColor:'black'})
      // convert value from Pounds to Kilograms
      const kg = appHelpers.kilogramstoPounds(kglbValue);
      console.log('value here---', kg);
      // setkglbValue(kg.toString());
      this.setState({kglbValue:kg.toString()})
    } else {
      // setkgColor('white');
      // setlbColor('black');
      this.setState({kgColor:'white',lbColor:'black'})
      // convert value from pounds back to kilograms
      const pounds = appHelpers.poundstoKilograms(kglbValue);
      console.log('value haa', pounds);
      // setkglbValue(pounds.toString());
      this.setState({kglbValue:pounds.toString()})
    }
  };

  handleFeetCentimeterChange = text => {
    // setFeetCentimeterValue(text);
    this.setState({feetCentimeterValue:text})
  };
  handleKilogramPoundsChange = text => {
    // setkglbValue(text);
    this.setState({kglbValue:text})
  };

  calculateBmi = async () => {
    const {cmColor,kglbValue,kgColor,lbColor,feetCentimeterValue,ftColor,ageValue,bmiData, gender} = this.state;

    const bmiValidator = appHelpers.validateBmiCalculation(this);
    if(bmiValidator.isValid === false){
      this.setState({showSnack:true, snackText:bmiValidator.message})
      return;
    }
    // updating the user's weight
    await AsyncStorage.setItem('@CurrentWeight', kglbValue.toString());
    // const gottenData = await AsyncStorage.getItem('bmiData');
    // bmi formula = kg / height^2
    if (cmColor === 'white' && kgColor === 'white') {
      const heightMeters = appHelpers.centimeterToMeter(feetCentimeterValue);
      console.log('heightMeters:1', heightMeters, kglbValue);
      const bmi = kglbValue / Math.pow(heightMeters, 2);
      console.log('Your bmi 1 :', bmi.toPrecision(4));
      // get the bmi data
      const bmiObj = {
        CreatedDate: moment().format(),
        Weight: kglbValue,
        Bmi: bmi,
        Age: ageValue,
      };
      await AsyncStorage.setItem('@CurrentBmi', bmiObj.Bmi.toString());
      this.saveProduct(uuidv4(),gender,bmi,ageValue, bmiObj.Weight, bmiObj.CreatedDate);
      this.props.navigation.navigate('Details', {bmiObj});
      return;
    }
    if (cmColor === 'black' && kgColor === 'white') {
      const heightMeters = appHelpers.feetToMeter(feetCentimeterValue);
      const bmi = kglbValue / Math.pow(heightMeters, 2);
      console.log('Your bmi 2 :', bmi);
      const bmiObj = {
        CreatedDate: moment().format(),
        Weight: kglbValue,
        Bmi: bmi,
        Age: ageValue,
      };
      await AsyncStorage.setItem('@CurrentBmi', bmiObj.Bmi.toString());
      this.saveProduct(uuidv4(),gender,bmi,ageValue, bmiObj.Weight, bmiObj.CreatedDate);
      this.props.navigation.navigate('Details', {bmiObj});
      return;
    }
    if (kgColor === 'black' && cmColor === 'black') {
      const poundstoKilograms = appHelpers.poundstoKilograms(kglbValue);
      const heightMeters = appHelpers.feetToMeter(feetCentimeterValue);
      const bmi = poundstoKilograms / Math.pow(heightMeters, 2);
      console.log('Your bmi 3 :', bmi);
      const bmiObj = {
        CreatedDate: moment().format(),
        Weight: kglbValue,
        Bmi: bmi,
        Age: ageValue,
      };
      await AsyncStorage.setItem('@CurrentBmi', bmiObj.Bmi.toString());
      this.saveProduct(uuidv4(),gender,bmi,ageValue, bmiObj.Weight, bmiObj.CreatedDate);
      this.props.navigation.navigate('Details', {bmiObj});
      return;
    }
    if (kgColor === 'black' && cmColor === 'white') {
      const poundstoKilograms = appHelpers.poundstoKilograms(kglbValue);
      const heightMeters = appHelpers.centimeterToMeter(feetCentimeterValue);
      const bmi = poundstoKilograms / Math.pow(heightMeters, 2);
      console.log('Your bmi 4 :', bmi);
      const bmiObj = {
        CreatedDate: moment().format(),
        Weight: kglbValue,
        Bmi: bmi,
        Age: ageValue,
      };
      await AsyncStorage.setItem('@CurrentBmi', bmiObj.Bmi.toString());
      this.saveProduct(uuidv4(),gender,bmi,ageValue, bmiObj.Weight, bmiObj.CreatedDate);
      this.props.navigation.navigate('Details', {bmiObj});
      return;
    }
  };

  handleAgeChange = text => {
    // setAgeValue(text);
    this.setState({ageValue:text})
  };

  addHandler = () => {
    const {ageValue} = this.state;
    const newValue = parseInt(ageValue) + 1;
    // setAgeValue(newValue.toString());
    this.setState({ageValue:newValue.toString()})
  };
  minusHandler = () => {
    const {ageValue} = this.state;
    const newValue = parseInt(ageValue) - 1;
    if (newValue < 0) {
      // setAgeValue('0');
      this.setState({ageValue:'0'})
    } else {
      // setAgeValue(newValue.toString());
      this.setState({ageValue:newValue.toString()})
    }
  };

  femaleCardHandler = () => {
    const {femaleCardColor} = this.state;
    if (femaleCardColor === 'white') {
      // setFemaleCardColor('#bdbdbd');
      // setMaleCardColor('white');
      this.setState({femaleCardColor:"#bdbdbd",maleCardColor:"white",gender:"female"})
    } else {
      // setFemaleCardColor('white');
      // setMaleCardColor('#bdbdbd');
      this.setState({femaleCardColor:"white",maleCardColor:"#bdbdbd",gender:"male"})
    }
  };
  maleCardHandler = () => {
    const {maleCardColor} = this.state;
    if (maleCardColor === 'white') {
      this.setState({maleCardColor:"#bdbdbd",femaleCardColor:"white", gender:"male"})
      // setMaleCardColor('#bdbdbd');
      // setFemaleCardColor('white');
    } else {
      this.setState({maleCardColor:"white",femaleCardColor:"#bdbdbd",gender:"female"})
      // setMaleCardColor('white');
      // setFemaleCardColor('#bdbdbd');
    }
  };

  _onDismissSnackBar = () => this.setState({ showSnack: false });

  showDetails = () =>{
    this.props.navigation.navigate('Details');
  }

  refresh = () =>{
    this.setState({...initialState})
  }
  render() {
    const {cmColor,ftColor, feetCentimeterValue,femaleCardColor,maleCardColor,kgColor,kglbValue,lbColor,ageValue} = this.state
    const {showSnack, snackText} = this.state;

    console.log("all products", this.state.products)
    console.log("---products--- after")
    return (
      <View style={{flex: 1, backgroundColor: '#FFC501'}}>
        <Animatable.View
          animation="slideInLeft"
          style={{flex: 1}}
          useNativeDriver={true}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              marginTop: Platform.OS === 'ios' ? 90 : 10,
            }}>
            <Text style={styles.mainText}>BMI Calculator</Text>
            <MaterialIcons
              onPress={this.refresh}
              name="refresh"
              size={30}
              style={{alignSelf: 'center', marginEnd: 20}}
            />
            <MaterialIcons
              onPress={this.showDetails}
              name="arrow-forward"
              size={30}
              style={{alignSelf: 'center'}}
            />
          </View>

          <View style={styles.content}>
            <Surface
              style={StyleSheet.flatten([styles.surface(maleCardColor)])}>
              <TouchableOpacity
                onPress={this.maleCardHandler}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: 180,
                  width: 180,
                }}>
                <MaterialCommunityIcons
                  name="gender-male"
                  size={70}
                  style={{alignSelf: 'center'}}
                />
                <Text style={{textAlign: 'center'}}>Male</Text>
              </TouchableOpacity>
            </Surface>

            <Surface
              style={StyleSheet.flatten([styles.surface(femaleCardColor)])}>
              <TouchableOpacity
                onPress={this.femaleCardHandler}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: 180,
                  width: 180,
                }}>
                <MaterialCommunityIcons
                  name="gender-female"
                  size={70}
                  style={{alignSelf: 'center'}}
                />
                <Text style={{textAlign: 'center'}}>Female</Text>
              </TouchableOpacity>
            </Surface>
          </View>
          <ScrollView>
            <View style={styles.inputs}>
              <View style={styles.dimensions}>
                <Text
                  onPress={this.toggleCm}
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    margin: 10,
                    fontSize: 20,
                    color: cmColor,
                  }}>
                  cm
                </Text>
                <Text
                  onPress={this.toggleFt}
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    margin: 10,
                    fontSize: 20,
                    color: ftColor,
                  }}>
                  ft
                </Text>
              </View>
              <TextInput
                placeholder="0"
                underlineColorAndroid="transparent"
                style={styles.cmInputStyle}
                onChangeText={this.handleFeetCentimeterChange}
                value={feetCentimeterValue}
              />
            </View>

            <View style={styles.inputs}>
              <View style={styles.dimensions}>
                <Text
                  onPress={this.toggleKg}
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    margin: 10,
                    fontSize: 20,
                    color: kgColor,
                  }}>
                  kg
                </Text>
                <Text
                  onPress={this.toggleLb}
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    margin: 10,
                    fontSize: 20,
                    color: lbColor,
                  }}>
                  lb
                </Text>
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
                onChangeText={this.handleKilogramPoundsChange}
              />
              {/* <MaterialIcons onPress={addHandler} name="add-circle" size={30} style = {{alignSelf:"center", color:"white",marginLeft:-10}} />
      </View> */}
            </View>

            <View style={styles.inputs}>
              <View style={styles.dimensions}>
                <Text style={styles.age}>Age</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginLeft: 60,
                }}>
                <MaterialCommunityIcons
                  onPress={this.minusHandler}
                  name="minus-circle"
                  size={30}
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    marginRight: -40,
                  }}
                />
                <TextInput
                  placeholder="0"
                  underlineColorAndroid="transparent"
                  keyboardType="numeric"
                  style={styles.ageInputStyle}
                  value={ageValue}
                  onChangeText={this.handleAgeChange}
                />
                <MaterialIcons
                  onPress={this.addHandler}
                  name="add-circle"
                  size={30}
                  style={{alignSelf: 'center', color: 'white', marginLeft: -10}}
                />
              </View>
            </View>

            <View style={{display: 'flex', margin: 60}}>
              <Button
                icon="camera"
                style={{backgroundColor: 'black'}}
                mode="contained"
                onPress={this.calculateBmi}>
                Calculate BMI
              </Button>
            </View>
          </ScrollView>
          <Snackbar
          style={{
            flex: 1,
            backgroundColor:"#ff5252",
            justifyContent: 'space-between',
          }}
          visible={showSnack}
          duration={1500}
          onDismiss={this._onDismissSnackBar}
        >
          {snackText}
        </Snackbar>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  age: {
    margin: 10,
    fontSize: 20,
    marginStart: 30,
  },
  cm: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
    fontSize: 20,
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
  cmInputStyle: {
    textAlign: 'center',
    height: 50,
    width: 150,
    borderRadius: 20,
    backgroundColor: 'white',
    fontSize: 20,
    textAlignVertical: 'center',
    marginLeft: 20,
  },
  kgInputStyle: {
    textAlign: 'center',
    height: 50,
    width: 150,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    marginLeft: 20,
  },
  ageInputStyle: {
    textAlign: 'center',
    overflow: 'hidden',
    color: 'black',
    height: 50,
    width: 150,
    borderRadius: 120,
    backgroundColor: '#FFFFFF',
    marginStart: 30,
    fontSize: 20,
  },
  mainText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginStart: 20,
  },
  surface: reaction => ({
    padding: 8,
    height: Platform.OS === 'ios' ? 180 : 150,
    width: Platform.OS === 'ios' ? 180 : 150,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    marginTop: 15,
    marginStart: 5,
    marginEnd: 5,
    borderRadius: 10,
    backgroundColor: reaction,
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
