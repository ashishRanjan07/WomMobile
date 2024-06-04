import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import AppHeader from '../../Component/AppHeader';
import Colors from '../../Theme/Colors';
import {FontSize} from '../../Theme/Fonts';
import Text_Input from '../../Component/Text_Input';
import {membercreate} from '../../API_Services/org_API';
import AddImageBTN from '../../Component/AddImageBTN';
import { responsiveFontSize, responsivePadding } from '../../Component/Responsive';

export default function AddUser({navigation}) {
  const title = 'Your Users';
  const leftIconText = 'Back';
  const leftIconBTN = () => {
    navigation.goBack();
  };
  const leftIcon = (
    <Ionicons name="chevron-back-outline" size={25} color="#fff" />
  );

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUserName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [designation, setDesignation] = useState();

  const [error, setError] = useState();

  const createUser = async () => {
    if (
      !firstName ||
      !lastName ||
      !username ||
      !phoneNumber ||
      !designation ||
      firstName === '' ||
      lastName === '' ||
      username === '' ||
      phoneNumber === '' ||
      designation === ''
    ) {
      setError('All fields are required');
    } else {
      // console.log(firstName,lastName,username,phoneNumber,designation,"Line 49")
      const response = await membercreate(
        firstName,
        lastName,
        username,
        phoneNumber,
        designation,
      );
      // console.log(response,"Line 51")
      let repMSG = JSON.parse(JSON.stringify(response.message));

      if (response.status) {
        Toast.show({
          type: 'success',
          text1: response.message,
        });
        navigation.goBack();
      } else {
        let type = typeof response.message;
        if (type === 'string') {
          setError(response.message);
          Toast.show({
            type: 'error',
            text1: response.message,
          });
        } else {
          let repMSG = JSON.parse(JSON.stringify(response.message))[0].msg;
          setError(repMSG);
          Toast.show({
            type: 'error',
            text1: repMSG,
          });
        }
      }
    }
  };

  return (
    <SafeAreaView
      style={{backgroundColor: Colors.select_login_button, flex: 1}}>
      <AppHeader
        title={title}
        leftIconBTN={leftIconBTN}
        leftIcon={leftIcon}
        leftIconText={leftIconText}
      />
      <ScrollView style={{backgroundColor: Colors.background, flex: 1}}>
        <View style={styles.container}>
          <AddImageBTN />

          <Text_Input
            placeholder={'First Name'}
            entered_data={e => setFirstName(e)}
          />
          <Text_Input
            placeholder={'Last Name'}
            entered_data={e => setLastName(e)}
          />
          <Text_Input
            placeholder={'Email'}
            entered_data={e => setUserName(e)}
          />
          <Text_Input
            placeholder={'Phone Number'}
            keyboardType={'numeric'}
            entered_data={e => setPhoneNumber(e)}
          />
          <Text_Input
            placeholder={'Designation'}
            entered_data={e => setDesignation(e)}
          />

          <Text style={{color: Colors.red, textAlign: 'center', margin: 10}}>
            {error}
          </Text>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.goBack()}>
              <Text style={[styles.btnText, {color: Colors.black}]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => createUser()}>
              <Text
                style={[
                  styles.btnText,
                  {color: Colors.white, backgroundColor: Colors.black},
                ]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: responsivePadding(20),
    padding: responsivePadding(10),
    backgroundColor: Colors.white,
    borderRadius: responsivePadding(10),
    elevation: responsivePadding(3),
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsivePadding(20),
  },
  btn: {
    width: '48%',
    borderWidth: responsivePadding(2),
    borderRadius: responsivePadding(7),
    borderColor: Colors.black,
  },
  btnText: {
    padding: responsivePadding(10),
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(18),
  },
});
