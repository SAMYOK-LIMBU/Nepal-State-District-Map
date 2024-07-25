import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import FirstScreen from './FirstScreen';
import District from './District';
import Municipality from './Munipacility';
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="First"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="First" component={FirstScreen} />
        <Stack.Screen name="District" component={District} />
        <Stack.Screen name="Municipality" component={Municipality} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
