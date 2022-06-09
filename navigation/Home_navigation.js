import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Books from '../screens/Books.js'
import Profile from '../screens/Profile.js';
import ShoppingList from '../screens/Shopping_list.js';

import Ionicons from '../node_modules/@expo/vector-icons/Ionicons.js';
import MaterialCommunityIcons from '../node_modules/@expo/vector-icons/MaterialCommunityIcons.js';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js'


function ShoppingListScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Shopping List!</Text>
      </View>
    );
  }
  
  function AnanlyticsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Analytics!</Text>
      </View>
    );
  }
  
  function LendingScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Lending and Borrowing!</Text>
      </View>
    );
  }


  const Tab = createBottomTabNavigator();
  
  export default function Home_navigation() {
    return (
  
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Shopping List') {
              return (
                <Ionicons
                  name={
                    focused
                      ? 'list-circle'
                      : 'list-circle-outline'
                  }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Analytics') {
              return (
                <Ionicons
                name={
                  focused
                    ? 'bar-chart'
                    : 'bar-chart-outline'
                }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Books') {
              return (
                <MaterialCommunityIcons
                name={
                  focused
                    ? 'book-open-page-variant'
                    : 'book-open-page-variant-outline'
                }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'LendingAndBorrowing') {
              return (
                <MaterialCommunityIcons
                name={
                  focused
                    ? 'account-switch'
                    : 'account-switch-outline'
                }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Profile') {
              return (
                <FontAwesome
                name={
                  focused
                    ? 'user'
                    : 'user-o'
                }
                  size={size}
                  color={color}
                />
              );
            }
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'orange',
        })}
      >
          <Tab.Screen name="Shopping List" component={ShoppingList} />
          <Tab.Screen name="Analytics" component={AnanlyticsScreen} />
          <Tab.Screen name="Books" component={Books}/>
          <Tab.Screen name="LendingAndBorrowing" component={LendingScreen}/>
          <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    
    );
  }