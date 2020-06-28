import * as React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Icon from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator, Colors } from 'react-native-paper';


function SplashScreen(props) {

  React.useEffect(()=>{
    setTimeout(()=>{
      console.log("opening welcome page");
      props.navigation.navigate('Home');
    },500)
  })
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#FFC501' }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFC501" />
      <Text style={{fontSize:50}}>My BMI</Text>
      {/* <Icon name="stepforward" size={70} style = {{alignSelf:"center", marginTop:50, marginBottom:17}} color='white' /> */}
      <ActivityIndicator color={Colors.red800} />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default SplashScreen