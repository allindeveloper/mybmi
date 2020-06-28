import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.content}>
      <Surface style={styles.surface}>
      <MaterialIcons name="gender-male" size={70} style = {{alignSelf:"center"}}/>
      <Text>Male</Text>
      </Surface>
      <Surface style={styles.surface}>
      <MaterialIcons name="gender-female" size={70} style = {{alignSelf:"center"}}/>
      <Text>Female</Text>
      </Surface>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 180,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    marginTop:15,
    marginStart:5,
    marginEnd:5,
  },
  content: {
    display:"flex",
    flexDirection:"row",
    alignContent:"center",
    alignItems:"center",
    justifyContent:"center"
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});

export default HomeScreen