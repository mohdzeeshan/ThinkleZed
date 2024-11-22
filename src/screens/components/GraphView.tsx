
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-svg-charts";
import { Defs, LinearGradient, Stop, Path, Circle } from "react-native-svg";

// Gradient definition for the area below the line
const Gradient = () => (
  <Defs>
    <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
      <Stop offset="0%" stopColor="#00FF00" stopOpacity="0.8" />
      <Stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
    </LinearGradient>
  </Defs>
);

// Custom area renderer for the gradient fill below the line
const CustomArea = ({ line }) => (
  <Path
    d={`${line} L${Dimensions.get("window").width},400 L0,400 Z`}
    fill="url(#gradient)"
    stroke="none"
  />
);

// Custom markers to display only at the selected index
const CustomMarkers = ({ x, y, data, selectedIndex }) => {
  const value = data[selectedIndex];

  if (value !== undefined) {
    return (
      <>
      {/* Gradient Definition */}
      <Defs>
        <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="rgba(20, 61, 22, 1)" stopOpacity="1" />
          <Stop offset="50%" stopColor="#080D08" stopOpacity="0.4" />
        </LinearGradient>
      </Defs>

      {/* Outer Circle with Gradient */}
      <Circle
        cx={x(selectedIndex)} 
        cy={y(value)}         
        r={25}                
        stroke="url(#grad1)"
        fill="url(#grad1)"    
      />
      <Circle
        cx={x(selectedIndex)} 
        cy={y(value)}         
        r={16}                
        stroke="rgba(8, 13, 8, 0.1)"
        fill="rgba(8, 13, 8, 0.1)"    
      />

      {/* Inner Solid Circle */}
      <Circle
        cx={x(selectedIndex)}
        cy={y(value)}
        r={8}     
        stroke="#03AD00"
        fill="rgba(3, 173, 0, 1)"
      />
    </>
    );
  }
  return null;
};

const GradientLineChart = ({
  population,
  selectedIndex,
}: {
  population: number[];
  selectedIndex: number;
}) => {
  const data = population; // Population data

  return (
    <View style={styles.container}>
      <LineChart
        style={{ height: 400, width: Dimensions.get("window").width }}
        data={data}
        svg={{
          stroke: "#00FF00", // Line color
          strokeWidth: 2,
        }}
        contentInset={{ top: 20, bottom: 20 }}
        yMax={Math.max(...data)} 
      >
        <Gradient />
        <CustomArea />
        <CustomMarkers
          x={(index) => index * 20}  // Adjust the x-axis position calculation if needed
          y={(value) => value / 1000000} // Scale y values if necessary
          data={data}
          selectedIndex={selectedIndex}
        />
      </LineChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 450,
  },
});

export default GradientLineChart;

