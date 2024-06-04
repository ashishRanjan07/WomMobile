import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';

import AppHeader from '../../Component/AppHeader';
import Text_Input from '../../Component/Text_Input';
import Colors from '../../Theme/Colors';
import {FontSize} from '../../Theme/Fonts';
import {createcustomer} from '../../API_Services/org_API';
import AddImageBTN from '../../Component/AddImageBTN';

export default function CreateCustomer({navigation}) {
  const title = 'Your Customers';
  const leftIconText = 'Back';
  const leftIconBTN = () => {
    navigation.goBack();
  };
  const leftIcon = (
    <Ionicons name="chevron-back-outline" size={25} color="#fff" />
  );

  const [modalVisible, setModalVisible] = useState(false);

  const [error, setError] = useState();

  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const saveBTN = async () => {
    setError();
    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      fullName === '' ||
      email === '' ||
      phoneNumber === ''
    ) {
      setError('All fields are required');
    } else {
      const response = await createcustomer(fullName, email, phoneNumber);
      // console.log('response', response)

      if (response?.status) {
        Toast.show({
          type: 'success',
          text1: response.message,
        });
        setModalVisible(true);
        setTimeout(function () {
          setModalVisible(false);
          navigation.goBack();
        }, 2000);
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
    <SafeAreaView style={{backgroundColor:Colors.select_login_button,flex:1}}>
      <ScrollView style={{backgroundColor:Colors.background,flex:1}}>
        <AppHeader
          title={title}
          leftIconBTN={leftIconBTN}
          leftIcon={leftIcon}
          leftIconText={leftIconText}
        />

        <View style={styles.container}>
          <AddImageBTN />

          <Text_Input
            placeholder={'Full Name'}
            entered_data={e => setFullName(e)}
          />
          <Text_Input
            placeholder={'Phone Number'}
            keyboardType={'numeric'}
            entered_data={e => setPhoneNumber(e)}
          />
          <Text_Input placeholder={'Email'} entered_data={e => setEmail(e)} />

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

            <TouchableOpacity style={styles.btn} onPress={() => saveBTN()}>
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <Pressable
            style={styles.centeredView}
            onPress={() => setModalVisible(false)}>
            <View style={styles.modalView}>
              <View style={styles.LottieComp}>
                <LottieView
                  source={require('../../Assets/GIF/50465.json')}
                  autoPlay
                />
              </View>
              <Text style={styles.LottieText}>Coupon shared</Text>
            </View>
          </Pressable>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    margin: 20,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    elevation: 3,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  btn: {
    width: '48%',
    borderWidth: 2,
    borderRadius: 7,
    borderColor: Colors.black,
  },
  btnText: {
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: FontSize.fontSize18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: Colors.white,
    elevation: 5,
    borderRadius: 10,
  },
  LottieComp: {
    height: Dimensions.get('screen').width * 0.75,
    width: Dimensions.get('screen').width * 0.75,
  },
  LottieText: {
    textAlign: 'center',
    paddingBottom: 20,
    color: Colors.blackDark,
    fontSize: FontSize.fontSize20,
    fontWeight: 'bold',
  },
});
