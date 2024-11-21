import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,

} from 'react-native';
import axios from 'axios';
import GraphView from './components/GraphView';
import HeaderComponent from './components/HeaderComp';
import {useFetchPopulationData} from "../hooks/fetchDataHook"


const TrendsData: React.FC = () => {
  const {data, loading, error} = useFetchPopulationData();

  const [visibleData, setVisibleData] = useState<PopulationDataItem[]>([])
  const [selectedYear, setSelectedYear] = useState<string>('2015');
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(2)
  const [currentYearPopulation, setCurrentYearPopulation] = useState<number>(0)
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;


const calculateGrowthRates = (data: PopulationDataItem[]) => {
  const growthRates = [];
  for (let index = data.length - 1; index > 0; index--) {
    const currentYear = data[index];
    const previousYear = data[index - 1];
    const growthRate =
      ((currentYear.Population - previousYear.Population) /
        previousYear.Population) *
      100;

    growthRates.push({
      years: `${currentYear.Year}-${previousYear.Year}`,
      growthRate: growthRate.toFixed(2),
    });
  }
  return growthRates;
};
 
const growthRates = calculateGrowthRates(data);

  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <HeaderComponent />
      <View style={{position: 'absolute', top: 100, left: 20}}>
        <Text style={styles.title}>Population trends</Text>
      </View>

      {visibleData.length > 1 && (
        <GraphView
          population={visibleData?.map(item => item.Population)}
          selectedIndex={selectedYearIndex}
        />
      )}
      <FlatList
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={({viewableItems}) => {
          // if (viewableItems && viewableItems.length > 0) {
          const visibleItems = viewableItems.map(item => item.item);
          setVisibleData(visibleItems);
          console.log('first', visibleItems);

          const index = visibleItems.findIndex(
            item => item.Year === selectedYear,
          );
          setSelectedYearIndex(index !== -1 ? index : 0);
          // }
        }}
        style={styles.flatList}
        data={data}
        horizontal
        renderItem={({
          item,
          index,
        }: {
          item: PopulationDataItem;
          index: number;
        }) => {
          return (
            <TouchableOpacity
              style={{
                ...styles.yearbtn,
                borderWidth: selectedYear == item.Year ? 1 : 0,
              }}
              key={index}
              onPress={() => {
                setSelectedYear(item.Year);
                let index = visibleData.findIndex(
                  vItem => vItem.Year == item.Year,
                );
                setSelectedYearIndex(index);
                setCurrentYearPopulation(item.Population);
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                  fontFamily: 'AvenirLTStd-Book',
                }}>
                {item.Year}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <View
        style={[
          styles.cardView,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '96%',
          },
        ]}>
        <View>
          <Text style={styles.cardTitle}>Total Growth</Text>
          <Text style={styles.cardTitle}>{selectedYear}</Text>
        </View>
        <Text style={styles.largeText}>
          {Intl.NumberFormat('en-US').format(
            data[selectedYearIndex].Population - data[0].Population,
          )}
        </Text>
      </View>

      <View
        style={[
          {flexDirection:'column',
            margin: 8,
            borderRadius: 16,
            backgroundColor: '#171717',
            padding: 16,
            height: 180,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '96%',
          },
        ]}>
        <View>
          <Text style={styles.cardTitle}>Recent Growth rate</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{height: 200, flexGrow:1}}
            data={growthRates}
            keyExtractor={item => item.years}
            renderItem={({item}) => (
              <View style={styles.row}>
                <Text style={styles.years}>{item.years}</Text>
                <Text style={styles.growthRate}>{item.growthRate}%</Text>
              </View>
            )}
          />
        </View>
      </View>

    </ScrollView>
    </SafeAreaView>
    
  );
};
const styles = StyleSheet.create({
  flatList:{
    width:'90%', alignSelf:'center', flexDirection:'row', 
    marginTop: -30
  },
  years: {
    color: "#838383",
    fontSize: 14,
    lineHeight:18,
    fontFamily:'AvenirLTStd-Medium'
  },
  growthRate: {
    color: "#03AD00", // Green color for positive growth
    fontSize: 14,
    lineHeight:18,

    fontFamily:'AvenirLTStd-Heavy'

  },
  yearbtn: {
    margin: 5,
    borderWidth: 1,
    borderColor: '#5C5C5C',
    backgroundColor: '#070809',
    padding: 4,
    borderRadius: 20,
    paddingHorizontal:8,
    height:35,
    justifyContent:'center',
    alignItems:'center'
  },
perText: {
  color: '#03AD00',
  fontSize: 13,
  lineHeight: 16,
},
greyText: {
  color: '#838383',
  fontSize: 14,
  lineHeight: 17,
},
cardText: {
  paddingVertical:5,
  color: 'white',
  fontSize: 22,
  lineHeight: 26,
  letterSpacing: -1,
},
cardView: {
  flexDirection:'column',
  margin: 8,
  borderRadius: 16,
  backgroundColor: '#171717',
  padding: 16,
},
row: {flexDirection: 'row', justifyContent:'space-between', alignItems: 'flex-start'},
headerRow: {
  flexDirection: 'row',
  padding: 12,
  justifyContent: 'space-between',
  alignItems: 'center',
},
container: {
  flexGrow: 1,
  justifyContent: 'flex-start',
  padding: 16,
  // backgroundColor: 'black',
  backgroundColor: 'white',
},
title: {
  fontSize: 32,
  color: 'white',
  fontFamily: 'AvenirLTStd-Heavy'
},
largeText: {
  fontSize: 28,
  color: '#03AD00',
  fontFamily: 'AvenirLTStd-Heavy'
},
text400: {
  marginTop:30,
  marginBottom:10,
  fontSize: 20,
  lineHeight: 24,
  color: 'white',
  fontFamily: 'AvenirLTStd-Medium'
},
greyTxt:{
  color: '#696969',
  fontFamily: 'AvenirLTStd-Book',
},
cardTitle:{
  fontSize: 16,
  lineHeight: 24,
  color: 'white',
  fontFamily: 'AvenirLTStd-Book'

},
});

export default TrendsData;
