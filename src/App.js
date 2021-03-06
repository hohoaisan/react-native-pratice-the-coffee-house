import React, {useMemo, useContext, useEffect} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {HomeScreen, OrderPlacing, ShopMap, Profile} from './screens';
import {firebase} from './firebase';
import {AuthProvider, AuthContext} from './contexts/AuthContext';

const Tab = createBottomTabNavigator();
export default function App() {
  const tabScreens = useMemo(() => [
    {
      component: HomeScreen,
      title: 'Tin tức',
      name: 'HomeScreen',
      icon: 'newspaper-outline',
    },
    {
      component: OrderPlacing,
      name: 'OrderPlacing',
      title: 'Đặt hàng',
      icon: 'cafe-outline',
    },
    {
      component: ShopMap,
      title: 'Cửa hàng',
      name: 'ShopMap',
      icon: 'home-outline',
    },
    {
      component: Profile,
      title: 'Tài khoản',
      name: 'Profile',
      icon: 'person-outline',
    },
  ]);

  return (
    <>
      <AuthProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="HomeScreen"
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}>
            {tabScreens.map((item, index) => (
              <Tab.Screen
                key={index}
                name={item.name}
                component={item.component}
                options={{
                  tabBarLabel: item.title,
                  tabBarIcon: ({color, size}) => (
                    <Ionicons name={item.icon} size={size} color={color} />
                  ),
                }}
              />
            ))}
          </Tab.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </>
  );
}
