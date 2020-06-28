import * as React from 'react';
import {View, Text, StyleSheet, Platform, TextInput, ScrollView} from 'react-native';
import {Surface, Button} from 'react-native-paper';
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
      <ScrollView>
      <View style={styles.inputs}>
        <View style={styles.dimensions}>
          <Text style={styles.cm}>cm</Text>
          <Text style={styles.ft}>ft</Text>
        </View>
        <TextInput
          placeholder="0"
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
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
          style={styles.TextInputStyleClass}
        />

        
      </View>

      <View style={styles.inputs}>
        <View style={styles.dimensions}>
          <Text style={styles.age}>Age</Text>
        </View>
        <TextInput
          placeholder="0"
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          style={styles.ageInputStyle}
        />

        
      </View>

      <View style={{display:"flex", margin:60}}>
      <Button icon="camera" style={{backgroundColor:"black"}} mode="contained" onPress={() => console.log('Pressed')}>
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
    fontSize: 20,
  },
  ft: {
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
  TextInputStyleClass: {
    textAlign: 'center',
    height: 50,
    width: 150,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  ageInputStyle: {
    textAlign: 'center',
    height: 50,
    width: 150,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginStart:30
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
