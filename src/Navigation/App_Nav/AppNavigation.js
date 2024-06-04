import React from 'react'
import { View, Text } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import CompanyProfile from '../../Screens/App_Screens/CompanyProfile';
import PartnerUp from '../../Screens/App_Screens/PartnerUp';
import Statistics from '../../Screens/App_Screens/Statistics';
import Colors from '../../Theme/Colors';
import StatisticsOpenCom from '../../Screens/App_Screens/StatisticsOpenCom';

import Documents_Upload from '../../Screens/Auth_Screens/Documents_Upload';
import ManageUsers from '../../Screens/App_Screens/ManageUsers';
import ManagePartnerShip from '../../Screens/App_Screens/ManagePartnerShip';
import EditUser from '../../Screens/App_Screens/EditUser';
import AddUser from '../../Screens/App_Screens/AddUser';
import OpenCompanyProfile from '../../Screens/App_Screens/OpenCompanyProfile';
import CustomerList from '../../Screens/App_Screens/CustomerList';
import CreateCustomer from '../../Screens/App_Screens/CreateCustomer';
import CustomerProfile from '../../Screens/App_Screens/CustomerProfile';
import GridOpenProfile from '../../Screens/App_Screens/GridOpenProfile';
import MoreOptions from '../../Screens/App_Screens/MoreOptions';
import CompanyProfilePartnershipRequirment from '../../Screens/App_Screens/CompanyProfilePartnershipRequirment';
import CreateCoupons from '../../Screens/App_Screens/CreateCoupons';
import EditCompanyProfile from '../../Screens/App_Screens/EditCompanyProfile';
import StatisticsOpenAgentProfile from '../../Screens/App_Screens/StatisticsOpenAgentProfile';


export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: Colors.select_login_button,

                    headerShown: false,
                    // tabBarShowLabel: false,
                    tabBarHideOnKeyboard: true,

                    // tabBarItemStyle: {
                    //     backgroundColor: '#00ff00',
                    //     margin: 5,
                    //     borderRadius: 10,
                    // },


                    // cardStyle: {
                    //     backgroundColor: 'red'
                    // },

                    // tabBarStyle: {
                    //     // backgroundColor: Colors.red,
                    //     marginVertical: 20,
                    //     margin: 10,
                    //     height: 80,
                    //     padding: 10,

                    // },

                }}


            >
                <Tab.Screen
                    name="CompanyProfileNavigation"
                    component={CompanyProfileNavigation}
                    options={{
                        tabBarLabel: 'Company Profile',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person-circle-outline" color={color} size={size} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="PartnerUpNavigation"
                    component={PartnerUpNavigation}
                    options={{
                        tabBarLabel: 'Partner Up',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="handshake-o" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="StatisticsNavigation"
                    component={StatisticsNavigation}
                    options={{
                        tabBarLabel: 'Statistics',
                        tabBarIcon: ({ color, size }) => (
                            <Entypo name="bar-graph" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="MoreOptionsNavigation"
                    component={MoreOptionsNavigation}
                    options={{
                        tabBarLabel: 'More Options',
                        tabBarIcon: ({ color, size }) => (
                            <Entypo name="menu" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export const CompanyProfileNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="CompanyProfile" component={CompanyProfile} />
            <Stack.Screen name="EditCompanyProfile" component={EditCompanyProfile} />

            <Stack.Screen name="CompanyProfilePartnershipRequirment" component={CompanyProfilePartnershipRequirment} />
            <Stack.Screen name="CreateCoupons" component={CreateCoupons} />


        </Stack.Navigator>
    )
}

export const PartnerUpNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="PartnerUp" component={PartnerUp} />

            <Stack.Screen name="GridOpenProfile" component={GridOpenProfile} />
        </Stack.Navigator>
    )
}

export const StatisticsNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Statistics" component={Statistics} />
            <Stack.Screen name="StatisticsOpenCom" component={StatisticsOpenCom} />
            <Stack.Screen name="StatisticsOpenAgentProfile" component={StatisticsOpenAgentProfile} />

            
        </Stack.Navigator>
    )
}

export const MoreOptionsNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="MoreOptions" component={MoreOptions} />
            <Stack.Screen name="ManageUsers" component={ManageUsers} />
            <Stack.Screen name="AddUser" component={AddUser} />
            <Stack.Screen name="EditUser" component={EditUser} />
            <Stack.Screen name="CustomerList" component={CustomerList} />
            <Stack.Screen name="CreateCustomer" component={CreateCustomer} />
            <Stack.Screen name="CustomerProfile" component={CustomerProfile} />
            <Stack.Screen name="ManagePartnerShip" component={ManagePartnerShip} />

            <Stack.Screen name="OpenCompanyProfile" component={OpenCompanyProfile} />



        </Stack.Navigator>
    )
}