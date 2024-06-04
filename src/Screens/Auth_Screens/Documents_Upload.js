import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Button,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DocumentPicker, {isInProgress} from 'react-native-document-picker';
import Toast from 'react-native-toast-message';

import Auth_srn_Title from '../../Component/Auth_srn_Title';
import Colors from '../../Theme/Colors';
import {FontSize} from '../../Theme/Fonts';
import {orgSignUp, uploadDocument} from '../../API_Services/org_API';
import {responsiveFontSize} from '../../Component/Responsive';

export default function Documents_Upload({route, navigation}) {
  const title = 'Upload Document';

  const name = route.params.name;
  const area = route.params.area;
  const about = route.params.about;
  const username = route.params.username;
  const password = route.params.password;
  const industry_id = route.params.industry_id;

  const [adharCard, setAdharCard] = useState();
  const [panCard, setPanCard] = useState();
  const [birthCer, setBirthCer] = useState();

  const [error, setError] = useState();

  const Submit = async () => {
    if (
      !adharCard ||
      !panCard ||
      !birthCer ||
      adharCard === '' ||
      panCard === '' ||
      birthCer === ''
    ) {
      setError('Please Upload All Files');
      Toast.show({
        type: 'error',
        text1: 'Please Upload All Files',
      });
    } else {
      setError();

      var data = new FormData();
      data.append('name', name);
      data.append('area', area);
      data.append('about', about);
      data.append('username', username);
      data.append('password', password);
      data.append('industry_id', industry_id);
      data.append('files', adharCard.uri);
      data.append('files', panCard.uri);
      data.append('files', birthCer.uri);

      const response = await orgSignUp(data);
      // console.log('response', response)

      let repMSG = JSON.parse(JSON.stringify(response.message));
      // console.log('repMSG', repMSG[0].msg)

      if (response?.status) {
        navigation.navigate('Login');
        Toast.show({
          type: 'success',
          text1: response.message,
        });
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

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const AdharCard = async () => {
    // console.log('Adhar Card')

    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      // console.log('AdharCard File', pickerResult)
      setAdharCard(pickerResult);
    } catch (e) {
      handleError(e);
    }
  };

  const PanCard = async () => {
    // console.log('Pan Card')

    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      setPanCard(pickerResult);
    } catch (e) {
      handleError(e);
    }
  };

  const BirthCer = async () => {
    // console.log('Birth Certificate')

    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      setBirthCer(pickerResult);
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Auth_srn_Title title={title} />
        <View style={styles.subTitleHolder}>
          <Text style={styles.subTitle}>Upload the required documents</Text>
          <Text style={styles.subTitle}>securely here.</Text>
        </View>
        <View style={styles.buttonHolder}>
          {adharCard ? (
            <View style={styles.docViewContainer}>
              <View style={styles.docViewContainerOne}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={responsiveFontSize(30)}
                  color={Colors.green}
                />
                <Text style={styles.uploadBTNText}>{adharCard.name}</Text>
              </View>
              <TouchableOpacity onPress={() => setAdharCard(null)}>
                <AntDesign
                  name="delete"
                  size={responsiveFontSize(30)}
                  color={Colors.red}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
            onPress={() => AdharCard()}
              style={styles.Touchbutton}>
              <Text style={styles.buttonText}>Upload Aadhar Card</Text>
            </TouchableOpacity>
          )}

          {panCard ? (
            <View style={styles.docViewContainer}>
              <View style={styles.docViewContainerOne}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={responsiveFontSize(30)}
                  color={Colors.green}
                />
                <Text style={styles.uploadBTNText}>{panCard.name}</Text>
              </View>
              <TouchableOpacity onPress={() => setPanCard(null)}>
                <AntDesign
                  name="delete"
                  size={responsiveFontSize(30)}
                  color={Colors.red}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => PanCard()}
              style={styles.Touchbutton}>
              <Text style={styles.buttonText}>Upload Pan Card</Text>
            </TouchableOpacity>
          )}

          <View style={{marginVertical: 10}}>
            {birthCer ? (
              <View style={styles.docViewContainer}>
                <View style={styles.docViewContainerOne}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={responsiveFontSize(30)}
                    color={Colors.green}
                  />
                  <Text style={styles.uploadBTNText}>{birthCer.name}</Text>
                </View>
                <TouchableOpacity onPress={() => setBirthCer(null)}>
                  <AntDesign
                    name="delete"
                    size={responsiveFontSize(30)}
                    color={Colors.red}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
              onPress={() => BirthCer()}
              style={styles.Touchbutton}>
              <Text style={styles.buttonText}>Upload Birth Certificate</Text>
            </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={{color: Colors.red, textAlign: 'center', marginTop: 5}}>
          {error}
        </Text>

        <TouchableOpacity
          style={styles.TouchableOpacity_Container}
          onPress={() => Submit()}>
          <Text style={styles.touchableOpacity_Text}>Submit for review</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 10,
  },
  subTitleHolder: {
    margin: 10,
  },
  subTitle: {
    color: Colors.black,
    fontSize: FontSize.fontSize16,
  },
  buttonHolder: {
    margin: 10,
    marginVertical: 20,
    gap: 10,
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
  uploadBTN: {
    backgroundColor: Colors.lightgrey,
    borderColor: Colors.border_color,
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBTNText: {
    color: Colors.black,
    fontSize: FontSize.fontSize16,
    padding: 10,
    textAlign: 'justify',
  },
  docViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  docViewContainerOne: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
  },
  Touchbutton: {
    borderWidth: 2,
    padding: 10,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    borderColor: Colors.grey,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: responsiveFontSize(18),
    color: Colors.white,
    fontWeight: 'bold',
  },
});
