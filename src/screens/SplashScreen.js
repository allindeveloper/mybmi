import * as React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Icon from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator, Colors } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

class SplashScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={}
  }

 

  async componentDidMount(){
    const weight = await AsyncStorage.getItem('@CurrentWeight');
    const bmi = await AsyncStorage.getItem('@CurrentBmi');
    if(weight !== null && bmi !== null){
      const defaultWeight = 0;
      const defaultBmi = 0;
      await AsyncStorage.setItem('@CurrentWeight', defaultWeight.toString());
      await AsyncStorage.setItem('@CurrentBmi', defaultBmi.toString());
    }
    
    setTimeout( async()=>{
      this.props.navigation.navigate('Home');
    },500)
  }
  
  
  render(){
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#FFC501' }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFC501" />
      <Text style={{fontSize:50}}>My BMI</Text>
      {/* <Icon name="stepforward" size={70} style = {{alignSelf:"center", marginTop:50, marginBottom:17}} color='white' /> */}
      <ActivityIndicator color={Colors.red800} />
      </SafeAreaView>
  );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default SplashScreen