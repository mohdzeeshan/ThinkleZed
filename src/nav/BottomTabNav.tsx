import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomePage';
import {Image, View} from 'react-native';
import {
  HomeIcon,
  InActiveHomeIcon,
  InActiveTrendsIcon,
  TrendsIcon,
} from '../screens/assets';
import TrendsData from '../screens/TrendsPage';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';



const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#000', justifyContent: 'space-evenly', height: 60, borderTopWidth: 0.5, borderTopColor: 'rgba(81, 81, 81, 1)',  alignSelf:'center' , width:'100%'}}>
      <View style={{width:'70%', flexDirection:'row'}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const iconSource = (() => {
          if (route.name === 'Home') {
            return isFocused ? HomeIcon : InActiveHomeIcon;
          } else if (route.name === 'Trends') {
            return isFocused ? TrendsIcon : InActiveTrendsIcon;
          }
          return null;
        })();

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}
          >
            <Image source={iconSource} style={{ width: 24, height: 24, marginBottom: 5 }} />
            <Text style={{ color: isFocused ? 'white' : 'gray', fontSize: 12, fontWeight: 'bold' }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}

      </View>
      
    </View>
  );
}


const MyTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
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
          tabBarLabel: 'Home',
          
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
