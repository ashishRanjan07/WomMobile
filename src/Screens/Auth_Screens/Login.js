import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthContext} from '../../Component/Context';
import Colors from '../../Theme/Colors';
import {FontSize} from '../../Theme/Fonts';
import Auth_srn_Title from '../../Component/Auth_srn_Title';
import Text_Input from '../../Component/Text_Input';
import {orgLogin} from '../../API_Services/org_API';
import LoginBTN from '../../Component/LoginBTN';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../Component/Responsive';

export default function Login({navigation}) {
  const {signIn} = React.useContext(AuthContext);

  const [userDetail, setUserDetail] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(true);

  const forgetPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const catchUserDetail = (text, name) => {
    setUserDetail(prevState => ({
      ...prevState,
      [name]: text,
    }));
  };

  const LoginBTNAction = async () => {
    if (
      !userDetail.username ||
      !userDetail.password ||
      userDetail.username === '' ||
      userDetail.password === ''
    ) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required',
      });
    } else {
      console.log(userDetail,"Line 63")
      const response = await orgLogin(userDetail);
      console.log(response, 'Line 52');
      if (response?.success) {
        if (response.user.role === 'org_admin') {
          const token = response.token;
          const details = response;

          AsyncStorage.setItem('token', token);
          AsyncStorage.setItem('user_id', details?.user?._id);
          if (details?.user?.org_admin_id?._id) {
            AsyncStorage.setItem('_id', details?.user?.org_admin_id?._id);
          }
          signIn(token, details);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Please use valid Credentials for Admin APP',
          });
        }
      } else {
        let type = typeof response.message;
        if (type === 'string') {
          Toast.show({
            type: 'error',
            text1: response.message,
          });
        } else {
          let repMSG = JSON.parse(JSON.stringify(response.message))[0].msg;
          Toast.show({
            type: 'error',
            text1: repMSG,
          });
        }
      }
    }
  };

  const signUP = () => {
    navigation.navigate('SignUP_Organisation');
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View style={{marginVertical:10}}>
      <Image source={require('../../Assets/Images/wominsidelogo.png')} resizeMode='contain' style={{height:responsivePadding(150),width:responsivePadding(250)}}/>
      </View>
     
      <View>
        <Auth_srn_Title title={'Log in'} />
      </View>
      <View style={{width: '95%', marginVertical: 10, gap: 10}}>
        <Text_Input
          placeholder={'Email'}
          entered_data={text => catchUserDetail(text, 'username')}
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.inputStyle1}
            onChangeText={text => catchUserDetail(text, 'password')}
            placeholder={'Password'}
            secureTextEntry={showPassword}
            placeholderTextColor={Colors.grey}
          />
          <TouchableOpacity
            style={{marginHorizontal: 5}}
            onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Ionicons name="eye-off" size={30} color={Colors.black} />
            ) : (
              <Ionicons name="eye" size={30} color={Colors.black} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.forgetPasswordConotainer}
        onPress={() => forgetPassword()}>
        <Text style={styles.forgetPassword}>Forgot password?</Text>
        <View style={{borderWidth: 1, width: '80%', alignSelf: 'center'}} />
      </TouchableOpacity>
      <View style={{width: '90%',marginVertical:responsivePadding(20)}}>
        <LoginBTN title={'Log In'} handleBTN={() => LoginBTNAction()} />
      </View>
      <View style={styles.bottumContainer}>
                <Text style={styles.bottumText}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => signUP()} >
                    <Text style={styles.signUPText}> Sign up</Text>
                </TouchableOpacity>
            </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  inputStyle1: {
    width: '85%',
    borderColor: Colors.grey,
    backgroundColor: Colors.lightgrey,
    borderRightWidth: responsivePadding(1),
    letterSpacing: 0.5,
    color: Colors.black,
    padding: responsivePadding(15),
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
  },
  passwordInputContainer: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Colors.border_color,
    borderWidth: 1,
    backgroundColor: Colors.lightgrey,
    borderRadius: 5,
    paddingRight: 7,
  },
  forgetPasswordConotainer: {
    marginTop: 10,
    width: '50%',
    gap: 5,
    alignSelf: 'flex-end',
  },
  forgetPassword: {
    textAlign: 'center',
    color: Colors.black,
    letterSpacing: 0.5,
    fontSize: responsiveFontSize(18),
  },
  bottumContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  bottumText: {
    color: Colors.black,
    paddingVertical: 15,
    fontWeight: 'bold',
    fontSize: FontSize.fontSize16,
  },
  signUPText: {
    paddingVertical: 15,
    color: Colors.auth_btn_text,
    fontWeight: 'bold',
    fontSize: FontSize.fontSize16,
  },
});
