import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,

} from 'react-native';
import GraphView from './components/GraphView';
import HeaderComponent from './components/HeaderComp';
import {useFetchPopulationData} from "../hooks/fetchDataHook"


function calculatePercentageIncrease(oldValue: number, newValue: number) {
  const percentageIncrease = ((newValue - oldValue) / oldValue) * 100;
  return percentageIncrease.toFixed(2);
}

const CardView = ({
  year1,
  year2,
  population1,
  population2,
}: {
  year1: string;
  year2: string;
  population1: number;
  population2: number;
}): JSX.Element => {
  return (
    <View style={styles.cardView}>
     {year2 && <>
      <Text style={styles.greyText}>
        {year1} to {year2}
      </Text>
      <Text style={styles.cardText}>
        + {population2 - population1}
      </Text>
      <Text style={styles.perText}> {calculatePercentageIncrease(population1,population2 )}% increase</Text>
      </>}
    
    </View> 
  );
};
const PopulationData: React.FC = () => {
  const { data, loading, error} = useFetchPopulationData();

  const [visibleData, setVisibleData] = useState<PopulationDataItem[]>([])
  const [selectedYear, setSelectedYear] = useState<string>('2015');
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(2)
  const [currentYearPopulation, setCurrentYearPopulation] = useState<number>(0)

  useEffect(() => {
    if(data && data.length> 2)
    setCurrentYearPopulation(data[2].Population)

  }, [data])
  

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderComponent />
      <View style={{position: 'absolute', top: 100, left: 20}}>
        <Text style={styles.title}>US Population Insignts</Text>
        <Text style={styles.largeText}>{Intl.NumberFormat('en-US').format(currentYearPopulation)}</Text>
        <Text style={styles.line3}>
          {currentYearPopulation -visibleData[0]?.Population} ({calculatePercentageIncrease(visibleData[0]?.Population,currentYearPopulation )})  <Text style={styles.greyTxt}>since {visibleData[0]?.Year}</Text>
        </Text>
      </View>

     {visibleData.length>1 && <GraphView
        population={visibleData?.map(item => item.Population)}
        selectedIndex={selectedYearIndex}
      />}
      <FlatList
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={({ viewableItems }) => {
          // if (viewableItems && viewableItems.length > 0) {
            const visibleItems = viewableItems.map(item => item.item);
            setVisibleData(visibleItems);
            console.log('first', visibleItems)

      
            const index = visibleItems.findIndex(
              item => item.Year === selectedYear
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
                setCurrentYearPopulation(item.Population)
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

      <Text style={styles.text400}>Key statistics</Text>
      <View style={styles.row}>
         <CardView
          year1={visibleData[0]?.Year}
          year2={visibleData[selectedYearIndex]?.Year}
          population1={visibleData[0]?.Population}
          population2={visibleData[selectedYearIndex]?.Population}
        />
        <CardView
          year1={visibleData[0]?.Year}
          year2={visibleData[visibleData.length-1]?.Year}
          population1={visibleData[0]?.Population}
          population2={visibleData[visibleData.length-1]?.Population}
        />

      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
    flatList:{
      width:'90%', alignSelf:'center', flexDirection:'row', 
      // marginTop: -30
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
    margin: 8,

    borderRadius: 16,
    backgroundColor: '#171717',
    padding: 16,
    flex: 1,
  },
  row: {flexDirection: 'row'},
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
    backgroundColor: 'black',
    // backgroundColor: 'grey',
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'AvenirLTStd-Heavy'
  },
  largeText: {
    marginTop:8,
    fontSize: 48,
    color: 'white',
    fontFamily: 'AvenirLTStd-Book'
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
  line3:{
    fontSize: 16,
    lineHeight: 24,
    color: '#03AD00',
    fontFamily: 'AvenirLTStd-Book'

  },
});

export default PopulationData;
