import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// import Select_Login_Type from '../Screens/Auth_Screens/Select_Login_Type'
import Login from '../Screens/Auth_Screens/Login';
import SignUP_Agent_Details from '../Screens/Auth_Screens/SignUP_Agent_Details';
import Documents_Upload from '../Screens/Auth_Screens/Documents_Upload'
import SignUP_Organisation from '../Screens/Auth_Screens/SignUP_Organisation';
import ForgotPassword from '../Screens/Auth_Screens/ForgotPassword';


export default function AuthNavigation() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          {/* <Stack.Screen name="Select_Login_Type" component={Select_Login_Type} /> */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUP_Agent_Details" component={SignUP_Agent_Details} />
          <Stack.Screen name="Documents_Upload" component={Documents_Upload} />
          <Stack.Screen name="SignUP_Organisation" component={SignUP_Organisation} />
          
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}