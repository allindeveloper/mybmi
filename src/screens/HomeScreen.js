import * as React from 'react';
import {View, Text, StyleSheet, Platform, TextInput} from 'react-native';
import {Surface} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function HomeScreen() {
  return (
    <View style={{flex: 1, backgroundColor: '#FFC501'}}>
      <Text style={styles.mainText}>BMI Calculator</Text>
      <View style={styles.content}>
        <Surface style={styles.surface}>
          <MaterialIcons
            name="gender-male"
            size={70}
            style={{alignSelf: 'center'}}
          />
          <Text>Male</Text>
        </Surface>
        <Surface style={styles.surface}>
          <MaterialIcons
            name="gender-female"
            size={70}
            style={{alignSelf: 'center'}}
          />
          <Text>Female</Text>
        </Surface>
      </View>
      <View style={styles.inputs}>
      <TextInput
        // Adding hint in Text Input using Place holder.
        placeholder="Enter Text in TextInput"
        // Making the Under line Transparent.
        underlineColorAndroid="transparent"
        // Calling the custom TextInputStyleClass.
        style={styles.TextInputStyleClass}
      />
       <TextInput
        // Adding hint in Text Input using Place holder.
        placeholder="Enter Text in TextInput"
        // Making the Under line Transparent.
        underlineColorAndroid="transparent"
        // Calling the custom TextInputStyleClass.
        style={styles.TextInputStyleClass}
      />
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  inputs:{
    marginTop:20,
    display:"flex",
    justifyContent:"center",
    flexDirection:"row"
  },  
  TextInputStyleClass: {
    textAlign: 'center',
    height: 50,
    borderWidth: 2,
    borderColor: '#FF5722',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  mainText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginStart: 20,
    paddingTop: Platform.OS === 'ios' ? 90 : 10,
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
