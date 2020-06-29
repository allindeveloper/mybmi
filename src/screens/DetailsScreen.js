import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Surface, Button, Badge} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {appHelpers} from '../appHelpers';
import {color} from 'react-native-reanimated';
import {ProgressCircle} from 'react-native-svg-charts';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {LineChart, ProgressChart} from 'react-native-chart-kit';
const DetailsScreen = props => {
  const [bmiColor, setbmiColor] = React.useState(null);
  
  const bmiValue = 50;
  React.useEffect(()=>{
    // console.log("props",props.route.params)
    if(bmiValue <15){
      setbmiColor("orange");
    }
    else if(bmiValue>=15 && bmiValue <16){
      setbmiColor("orange");
    }else if(bmiValue>16 && bmiValue <18.5){
      setbmiColor("orange");
    }
    else if(bmiValue>18.5 && bmiValue < 25){
      setbmiColor("green");
    }
    else if(bmiValue>25 && bmiValue < 30){
      setbmiColor("orange");
    }
    else if(bmiValue >30 && bmiValue <35){
      setbmiColor("red");
    }
    else if(bmiValue > 35 && bmiValue < 40){
      setbmiColor("red")
    }
    else{
      setbmiColor("red");
    }
  },[])

  const progressData = [21.5];

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#000000',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };
  const progressChartConfig = {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#000000',
    backgroundGradientTo: '#000000',
    color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`,
  };

  const graphStyle = {
    marginVertical: 8,
    margin: 5,
    ...progressChartConfig.style,
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FFC501'}}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: Platform.OS === 'ios' ? 90 : 10,
        }}>
        <Text style={styles.mainText}>Weight Diary</Text>

        <MaterialIcons
          name="add-circle"
          size={30}
          style={{alignSelf: 'center', marginEnd: 20}}
        />
      </View>

      <View style={{marginTop: 20}}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <Text>Statistics</Text>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{marginLeft: 5}}>month</Text>
            <Text style={{marginLeft: 5}}>year</Text>
            <Text style={{marginLeft: 5}}>all</Text>
          </View>
        </View>
        <LineChart
          data={{
            labels: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'June',
              'July',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            datasets: [
              {
                data: [100, 5, 50, 30.5, 80.9, 10, 15.9, 50, 50, 30, 40, 55],
              },
            ],
          }}
          // width={Dimensions.get("window").width} // from react-native
          width={400}
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 13,
            margin: 5,
          }}
        />
        <View />
        
      </View>
      <View style={{display:"flex",justifyContent:"center",flexDirection:"row"}}>
        <View>
          
     <Text style={{margin:10}}>Bmi</Text>
      <View style={styles.progressStyle}>
        <View>
        <Text style={{display:"flex", fontSize:20, marginStart:10, textAlign:"left", marginTop:-50}}>{bmiValue.toFixed(4)}</Text>

      <ProgressCircle style={{ height: 140 ,paddingTop:10,paddingBottom:10}} progress={0.7} progressColor={bmiColor} />
      </View>
      </View>
      </View>
      <View>
     <Text style={{margin:10}}>Current Weight</Text>
      <View style={styles.progressStyle}>
      <Text style={{
       fontSize:50,
       fontWeight:"bold",
       display:"flex",
       textAlign:"center", 
       justifyContent:"center",
       alignSelf:"center"}}>80.3</Text>
      
      </View>
      </View>
      </View>

      
      {/* <View /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginStart: 20,
  },
  surface: {
    padding: 8,
    height: 400,
    width: 400,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  progressStyle:{
    justifyContent:"center",
    display:"flex",
    height:250,
    width:180,
    borderRadius: 13,
    borderColor: '#ddd',
    backgroundColor:"white",
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    marginStart:5
  }
});

export default DetailsScreen;
