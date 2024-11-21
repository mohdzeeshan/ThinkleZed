import React, {useEffect, useState, Dispatch, SetStateAction} from 'react';

import {View, Text, TouchableOpacity, StyleSheet, FlatList, Image} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const GraphView = ({
  population,
  selectedIndex,
}: {
  population: number[];
  selectedIndex: number;

}) => {
  const [disableMarker, setDisableMarker] = useState<number[]>([])
useEffect(() => {
  const indexArray = Array.from({ length: population.length }, (_, index) => index);

  const updatedArray = indexArray.filter(index => index !== selectedIndex);
  setDisableMarker(updatedArray)
}, [selectedIndex])


  return (
    <View>
      {population.length> 1 && <LineChart
        data={{
          labels: [],
          datasets: [
            {
              data: population,
            },
          ],
        }}
        fromNumber={300000000}
        width={screenWidth}
        height={500}
        yAxisLabel={undefined}
        yAxisSuffix={undefined} // No suffix

        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          strokeWidth: 3,
          barPercentage: 0.5,
          useShadowColorFromDataset: false,
          color: (opacity = 1) => `rgba(58, 157, 63, 1)`, // Green color for line
          // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          fillShadowGradientFrom: '#143D16',
          fillShadowGradientTo: '#080D0899',
          propsForBackgroundLines: {
            strokeDasharray: '',
            strokeOpacity: 0.0,
          },
        }}
        withHorizontalLabels={false}
        hidePointsAtIndex={disableMarker}
        
      
        style={{
          margin:0,
          padding: 0,
        }}
      />}
     
    </View>
  );
};

export default GraphView;
const styles = StyleSheet.create({
  flatList:{width:'68%', alignSelf:'center'},
  yearbtn: {
    margin: 5,
    borderWidth: 1,
    borderColor: '#5C5C5C',
    backgroundColor: '#070809',
    padding: 4,
    borderRadius: 20,
    paddingHorizontal:8
  },
});

