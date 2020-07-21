import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
  Dimensions,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Surface, Button, Badge} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {appHelpers} from '../appHelpers';
import * as Animatable from 'react-native-animatable';
import {color} from 'react-native-reanimated';
import {ProgressCircle} from 'react-native-svg-charts';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import AppDatabase from '../../AppDatabase';

const db = new AppDatabase();
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

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bmiColor: null,
      bmiData: null,
      bmiValue: 30,
      CurrentWeight: '00.0',
      CurrentBmi: 0,
    };
  }

  componentDidMount() {
    console.log('hehhhhh');
    AsyncStorage.getItem('@CurrentWeight', (error, result) => {
      this.setState({CurrentWeight: result});
    });
    AsyncStorage.getItem('@CurrentBmi', (error, result) => {
      this.setState({CurrentBmi: parseInt(result)});
    });

    let bmiData = [];
    db.listProduct()
      .then(data => {
        bmiData = data;
        this.setState(
          {
            bmiData,
            isLoading: false,
          },
          () => {
            const bmiValue = parseInt(this.state.CurrentBmi);
            if (bmiValue < 15) {
              this.setState({bmiColor: 'orange'});
            } else if (bmiValue >= 15 && bmiValue < 16) {
              this.setState({bmiColor: 'orange'});
            } else if (bmiValue > 16 && bmiValue < 18.5) {
              this.setState({bmiColor: 'orange'});
            } else if (bmiValue > 18.5 && bmiValue < 25) {
              this.setState({bmiColor: 'orange'});
            } else if (bmiValue > 25 && bmiValue < 30) {
              this.setState({bmiColor: 'orange'});
            } else if (bmiValue > 30 && bmiValue < 35) {
              this.setState({bmiColor: 'orange'});
            } else if (bmiValue > 35 && bmiValue < 40) {
              this.setState({bmiColor: 'orange'});
            } else {
              this.setState({bmiColor: 'orange'});
            }
          },
        );
      })
      .catch(err => {
        console.log(err);
        this.setState = {
          isLoading: false,
        };
      });
  }

  renderBmiList = (item, index) => {
    return (
      <View style={styles.bmiList}>
        <View>
          <Text style={{fontSize: 20, color: 'white'}}>
            {moment(item.CreatedDate).format('dddd')}{' '}
          </Text>
          <Text style={{fontSize: 15}}>
            {moment(item.CreatedDate).format('MMMM DD')}
          </Text>
        </View>
        <View>
          <Text style={{fontSize: 20, color: 'white'}}>{item.Weight}</Text>
          <Text style={{alignSelf: 'flex-end'}}>kg</Text>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          {/* <FeatherIcons
            name="arrow-up-right"
            size={30}
            style={{marginEnd: 10}}
          /> */}
          <Text style={{fontSize: 20, color: 'white'}}>
            {item.Bmi.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  renderEmpty = () => {
    return (
      <>
        <View
          style={{justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
          <Text>No Bmi Records...</Text>
        </View>
      </>
    );
  };
  openHomeScreen = () => {
    console.log('opening home screen');
    this.props.navigation.navigate('Home');
  };

  render() {
    const {bmiData, bmiColor, bmiValue, CurrentWeight, CurrentBmi} = this.state;
    console.log('bmiData', typeof bmiData);
    console.log('currentbmit state', this.state.CurrentBmi);
    return (
      <View style={{flex: 1, backgroundColor: '#FFC501'}}>
        <Animatable.View
          animation="slideInLeft"
          style={{flex: 1}}
          useNativeDriver={true}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginTop: Platform.OS === 'ios' ? 90 : 10,
            }}>
            <MaterialIcons
              onPress={this.openHomeScreen}
              name="arrow-back"
              size={30}
              style={{alignSelf: 'center', marginStart: 10}}
            />
            <Text style={styles.mainText}>Weight Diary</Text>

            <MaterialIcons
              name="add-circle"
              size={30}
              style={{alignSelf: 'center', marginEnd: 20}}
            />
          </View>

          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View>
              <Text style={{margin: 10}}>Bmi</Text>
              <View style={styles.progressStyle}>
                <View>
                  <Text
                    style={{
                      display: 'flex',
                      fontSize: 20,
                      marginStart: 10,
                      textAlign: 'left',
                      marginTop: -50,
                    }}>
                    {CurrentBmi.toFixed(4)}
                  </Text>

                  <ProgressCircle
                    style={{height: 140, paddingTop: 10, paddingBottom: 10}}
                    progress={0.7}
                    progressColor={bmiColor}
                  />
                </View>
                <View style={styles.reportText}>
                  <Text>Over Weight</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={{margin: 10}}>Current Weight</Text>
              <View style={styles.progressStyle}>
                <Text
                  style={{
                    fontSize: 50,
                    fontWeight: 'bold',
                    display: 'flex',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  {CurrentWeight}
                </Text>
              </View>
            </View>
          </View>
          <View style={Liststyles.container}>
            <FlatList
              style={{width: '100%', height: 300}}
              keyExtractor={(item, index) => index.toString()}
              data={bmiData}
              showsVerticalScrollIndicator={false}
              // onEndReached={() => this.loadMoreData()}
              onEndReachedThreshold={Platform.OS === 'ios' ? 0.6 : 0}
              contentContainerStyle={{
                flexGrow: Platform.OS === 'ios' ? 0.08 : 2,
              }}
              renderItem={({item, index}) => this.renderBmiList(item, index)}
              ItemSeparatorComponent={() => (
                <View style={Liststyles.separator} />
              )}
              ListEmptyComponent={this.renderEmpty}
              // ListFooterComponent={this.renderFooter.bind(this)}
              //Adding Load More button as footer component
              // refreshControl={
              //   <RefreshControl
              //     refreshing={this.state.loading}
              //     onRefresh={this.onRefresh.bind(this)}
              //   />
              // }
            />
          </View>
        </Animatable.View>
      </View>
    );
  }
}

const Liststyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  item: {
    padding: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginLeft: 25,
    marginRight: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
const styles = StyleSheet.create({
  bmiList: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginStart: 20,
    marginEnd: 20,
    padding: 8,
  },
  mainText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginStart: 0,
  },
  surface: {
    padding: 8,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  progressStyle: {
    justifyContent: 'center',
    display: 'flex',
    height: Platform.OS === 'ios' ? 250 : 250,
    width: Platform.OS === 'ios' ? 180 : 165,
    borderRadius: 13,
    borderColor: '#ddd',
    backgroundColor: 'white',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    marginStart: 5,
  },

  reportText: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    fontSize:10,
    fontWeight:"200"
  },
});

export default DetailsScreen;
