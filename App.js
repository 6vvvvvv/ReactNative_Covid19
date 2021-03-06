import React from 'react';
import {Home} from './components/Home';
import {Map} from './components/Map';
// import {Global} from './components/Global';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
// const MapStack = createStackNavigator();

// const HomeStackScreen = () => {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen name="Home" component={Home} />
//       <HomeStack.Screen name="Map" component={Map} />
//     </HomeStack.Navigator>
//   );
// };

// const MapStackScreen = () => {
//   return (
//     <MapStack.Navigator>
//       <MapStack.Screen name="Map" component={Map} />
//       <MapStack.Screen name="Home" component={Home} />>
//     </MapStack.Navigator>
//   );
// };

// <Tab.Navigator>
// <Tab.Screen name="Home" component={HomeStackScreen} />
// <Tab.Screen name="Map" component={Global} />
// </Tab.Navigator>

export default function App() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen name="Covid-19" component={Home} />
        <HomeStack.Screen name="Map" component={Map} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}
