import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Auth_srn_Title from '../../Component/Auth_srn_Title'
import Text_Input from '../../Component/Text_Input'
import Colors from '../../Theme/Colors'
import { FontSize } from '../../Theme/Fonts'


export default function SignUP_Agent_Details({ navigation }) {

  const title = 'Sign Up';

  // const entered_data = text => {
  //   console.log('text', text)
  // }

  const [name, setName] = useState('');
  const [dob, setDOB] = useState('');
  const [occupation, setOccupation] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(true)
  const [checkBox, setCheckBox] = useState(false);

  const signUP = () => {
    console.log('Name', name)
    console.log('DOB', dob)
    console.log('Occupation', occupation)
    console.log('Password', password)
    console.log('checkBox', checkBox)

    navigation.navigate('SignUP_Agent_Documents');

  }

  const Login = () => {
    // console.log('Login')
    navigation.navigate('Login');
  }

  // const checkBoxBTN = () => {
  //   setCheckBox(!checkBox)

  // }

  return (
    <View style={styles.container}>
      <Auth_srn_Title title={title} />

      <View style={styles.inputContainer}>
        <Text_Input placeholder={'Email'} entered_data={(e) => setName(e)} />
        <Text_Input placeholder={'D.O.B'} entered_data={(e) => setDOB(e)} />
        <Text_Input placeholder={'Occupation'} entered_data={(e) => setOccupation(e)} />

        {/* <Text_Input placeholder={'Password'} secureTextEntry={true} /> */}
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(e) => setPassword(e)}
            placeholder={'Password'}
            secureTextEntry={showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Ionicons name="ios-eye-off" size={30} color={Colors.black} />
            ) : (
              <Ionicons name="ios-eye" size={30} color={Colors.black} />
            )}
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.checkBoxContainer}>
        <TouchableOpacity onPress={() => setCheckBox(!checkBox)} >
          {
            !checkBox ?
              <Fontisto name="checkbox-passive" size={25} color={Colors.select_login_button} />
              :
              <Fontisto name="checkbox-active" size={25} color={Colors.select_login_button} />
          }
        </TouchableOpacity>

        <Text style={styles.checkBoxText}>I would like to receive your newsletter and other promotional information.</Text>
      </View>

      <TouchableOpacity style={styles.TouchableOpacity_Container} onPress={() => signUP()} >
        <Text style={styles.touchableOpacity_Text}>Sign up</Text>
      </TouchableOpacity>

      <View style={styles.bottumContainer}>
        <Text style={styles.bottumText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => Login()} >
          <Text style={styles.LoginText}>Log In</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10,
  },
  inputContainer: {
    // margin: 10,
    marginTop: 30,
  },
  inputStyle: {
    flex: 1,
    letterSpacing: 0.5,
    paddingLeft: 10,
    color: Colors.black
  },
  passwordInputContainer: {
    // margin: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Colors.border_color,
    borderWidth: 1,
    backgroundColor: Colors.lightgrey,
    borderRadius: 5,
    paddingRight: 7,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkBoxText: {
    textAlign: 'justify',
    // backgroundColor: 'red',
  },
  TouchableOpacity_Container: {
    backgroundColor: Colors.select_login_button,
    padding: 10,
    margin: 10,
    marginVertical: 30,
    width: Dimensions.get('window').width * 0.9,
    borderRadius: 7,
    elevation: 5,

  },
  touchableOpacity_Text: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: FontSize.fontSize20,
    fontWeight: 'bold',
  },
  bottumContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    // marginVertical: 50,
    flexDirection: 'row',
  },
  bottumText: {
    color: Colors.black,
    // backgroundColor: 'red',
    paddingVertical: 15,
    fontWeight: 'bold',
    fontSize: FontSize.fontSize16,
  },
  LoginText: {
    paddingVertical: 15,
    color: Colors.select_login_button,
    fontWeight: 'bold',
    fontSize: FontSize.fontSize16,
  }
})