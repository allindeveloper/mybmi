import React from 'react';
import { View, Text } from 'react-native';
import {LineChart, ProgressChart} from 'react-native-chart-kit';


const LineChart = () =>{

    return(
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
                data: [100,9],
              },
            ],
          }}
          width={Dimensions.get('window').width - 4} // from react-native
          width={Platform.OS === 'ios' ? 400 : 330}
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 13,
            marginLeft: 10,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        
      </View>
    )
}

export default LineChart