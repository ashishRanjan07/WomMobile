import React, { useEffect } from 'react'
import {
    View,
    StatusBar,
    Image,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../Component/Context';
import AuthNavigation from './AuthNavigation'
import AppNavigation from './App_Nav/AppNavigation';
import Colors from '../Theme/Colors';
import { log_out_admin } from '../API_Services/org_API';

export default function BaseRoutes() {

    const initialLoginState = {
        isLoading: true,
        details: null,
        userToken: null,
    };

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    details: action.details,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
        signIn: async (token, details) => {
            // setUserToken('ksdjhf');
            // setIsLoading(false);
            const userToken = token;
            const userName = JSON.stringify(details);
            // const userName = details.user;


            try {
                // console.log('Here');
                await AsyncStorage.setItem('userToken', userToken);
                // console.log('user token: ', userName);
                await AsyncStorage.setItem('details', userName);
                dispatch({ type: 'LOGIN', id: userName, token: userToken });

            } catch (e) {
                console.log(e);
            }

        },

        signOut: async () => {
            // setUserToken(null);
            // setIsLoading(false);
            try {
                const data = await AsyncStorage.getItem('user_id');
               const params={
                org_id:data
               }
                const logoutData=await log_out_admin(params);
                await AsyncStorage.removeItem('token');
                if(AsyncStorage.getItem('user_id')){
                    await AsyncStorage.removeItem('user_id');
                }
                if(AsyncStorage.getItem('_id')){
                    await AsyncStorage.removeItem('_id');
                }
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'LOGOUT' });
        },
        // signUp: () => {
        //   setUserToken('fgkj');
        //   setIsLoading(false);
        // },
        // signUp: () => {
        //   setUserToken('ksdjhf');
        //   setIsLoading(false);
        // },
    }), []);

    useEffect(() => {
        setTimeout(async () => {
            try {
                const token = await AsyncStorage.getItem('token');

                if (token !== null) {
                    const fetdetails = JSON.parse(await AsyncStorage.getItem('details'));
                    const details = fetdetails.user
                    // console.log('details', details)

                    dispatch({ type: 'RETRIEVE_TOKEN', token: token, details: details });

                } else {
                    // console.log('user token: ', token);
                    // console.log('Token Nhi Milla')
                    dispatch({ type: 'LOGOUT' });
                }

            } catch (e) {
                console.log(e);
            }

        }, 2000);
    }, []);

    if (loginState.isLoading) {
        return (
            <>
                <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white }}>
                    <Image source={require("../Assets/Images/wominsidelogo.png")} />
                </View>
            </>
        )
    }

    return (
        <AuthContext.Provider value={authContext}>

            {/* {loginState.userToken !== null
                    ?
                    <View style={{ flex: 1 }}>
                        {
                            loginState.details.role === 'org_user' && loginState.details?.default_pwd
                                ?
                                <CreatePassword />
                                :
                                <AppNavigation />
                        }
                        <Text>{loginState.details.role}</Text>
                    </View>
                    :
                    <AuthNavigation />
                } */}


            {/* <View style={{ flex: 1 }}>
                    {JSON.parse(loginState.details).user.role === 'org_user' && JSON.parse(loginState.details).user.default_pwd ?
                        <CreatePassword />
                        :
                        <View style={{ flex: 1 }}>
                            {JSON.parse(loginState.details).user.role === 'org_admin' && JSON.parse(loginState.details).user.default_pwd ?
                                <AppNavigation />
                                :
                                <Text>Other</Text>
                            }
                        </View>
                    }
                </View> */}


            {loginState.userToken !== null ? <AppNavigation /> : <AuthNavigation />}

        </AuthContext.Provider>
    )
}