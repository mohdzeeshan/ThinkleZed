import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomePage';
import {Image} from 'react-native';
import {
  HomeIcon,
  InActiveHomeIcon,
  InActiveTrendsIcon,
  TrendsIcon,
} from '../screens/assets';
import TrendsData from '../screens/TrendsPage';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused
              ? HomeIcon // Active icon image for Home
              : InActiveHomeIcon; // Inactive icon image for Home
          } else if (route.name === 'Trends') {
            iconSource = focused
              ? TrendsIcon // Active icon image for Trends
              : InActiveTrendsIcon; // Inactive icon image for Trends
          }

          // Return the custom icon as an image
          return <Image source={iconSource} style={{width: 24, height: 24}} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0.5,
          borderTopColor:'rgba(81, 81, 81, 1)'
          
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarItemStyle: {
          width: 80,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home1',
          
        }}
      />
      <Tab.Screen
        name="Trends"
        component={TrendsData}
        options={{
          headerShown: false,
          tabBarLabel: 'Trends',
        }}
      />
    </Tab.Navigator>
  );
};
export default MyTabs;
