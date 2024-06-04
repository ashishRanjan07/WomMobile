import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';

import Auth_srn_Title from '../../Component/Auth_srn_Title';
import Text_Input from '../../Component/Text_Input';
import Colors from '../../Theme/Colors';
import {responsiveFontSize, responsivePadding} from '../../Component/Responsive';

export default function ForgotPassword({navigation}) {
  const title = 'Forgot Password';
  const [email, setEmail] = useState();

  const Submit = () => {
    console.log('email', email);
  };

  const backtoLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View style={{marginVertical:10}}>
      <Image source={require('../../Assets/Images/wominsidelogo.png')} resizeMode='contain' style={{height:responsivePadding(150),width:responsivePadding(250)}}/>
      </View>
      <Auth_srn_Title title={title} />
      <View style={{width: '95%'}}>
        <Text_Input placeholder={'Email'} entered_data={e => setEmail(e)} />
      </View>
      <TouchableOpacity
        style={styles.TouchableOpacity_Container}
        onPress={() => Submit()}>
        <Text style={styles.touchableOpacity_Text}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.bottumContainer}>
        <Text style={styles.bottumText}>Back to </Text>
        <TouchableOpacity onPress={() => backtoLogin()}>
          <Text style={styles.changeText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: responsivePadding(10),
  },
  TouchableOpacity_Container: {
    backgroundColor: Colors.select_login_button,
    padding: responsivePadding(10),
    marginVertical: responsivePadding(15),
    width: '80%',
    borderRadius: responsivePadding(10),
    elevation: 5,
  },
  touchableOpacity_Text: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
  },
  bottumContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  bottumText: {
    color: Colors.black,
    paddingVertical: responsivePadding(15),
    fontWeight: 'bold',
    fontSize: responsiveFontSize(16),
  },
  changeText: {
    paddingVertical: responsivePadding(15),
    color: Colors.auth_btn_text,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(16),
  },
});
