import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as ImagePicker from 'react-native-image-picker';

import AppHeader from '../../Component/AppHeader';
import Colors from '../../Theme/Colors';
import { FontSize } from '../../Theme/Fonts';
import { updateMember } from '../../API_Services/org_API';
import { responsiveFontSize } from '../../Component/Responsive';

export default function EditUser({ route, navigation }) {
  const data = route.params.item;

  const title = 'Your Users';
  const leftIconText = 'Back';
  const leftIconBTN = () => {
    navigation.goBack();
  };
  const leftIcon = <Ionicons name="chevron-back-outline" size={25} color="#fff" />;

  const [firstName, setFirstName] = useState(data.org_user_first_name);
  const [lastName, setLastName] = useState(data.org_user_last_name);
  const [email, setEmail] = useState(data.username);
  const [phoneNumber, setPhoneNumber] = useState(data.org_user_phone);
  const [designation, setDesignation] = useState(data.designation);
  const [profileImageURI, setProfileImageURI] = useState(data.profileImageURI || '');

  const editDetails = async () => {
    let id = data._id;
    console.log('id', id);
    const response = await updateMember(
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      designation
    );
    console.log('response', response);
    navigation.goBack();
  };

  const changeUserProfileImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  
    ImagePicker.launchCamera(options, (response) => {
      if (response && response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        const uri = selectedImage.uri;
        console.log('Image URI:', uri);
        setProfileImageURI(uri);
      } else {
        console.log('Invalid response from ImagePicker:', response);
      }
    });
  };
  return (
    <SafeAreaView style={{backgroundColor:Colors.select_login_button,flex:1}}>
       <AppHeader
        title={title}
        leftIconBTN={leftIconBTN}
        leftIcon={leftIcon}
        leftIconText={leftIconText}
      />
    <ScrollView style={{backgroundColor:Colors.background}} showsVerticalScrollIndicator={false}>
     

      <View style={styles.container}>
        <View style={styles.imageComp}>
          {profileImageURI ? (
            <Image source={{ uri: profileImageURI }} style={styles.imageStyle} />
          ) : (
            <Image
              source={{ uri: 'https://picsum.photos/150' }}
              style={styles.imageStyle}
            />
          )}
          <TouchableOpacity style={styles.cameraIcon} onPress={changeUserProfileImage}>
            <EvilIcons name="camera" size={25} color="#fff" style={{ padding: 5 }} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>First Name</Text>
        <TextInput
          style={styles.inputComp}
          onChangeText={(e) => setFirstName(e)}
          value={firstName}
          placeholder="First Name"
        />

        <Text style={styles.title}>Last Name</Text>
        <TextInput
          style={styles.inputComp}
          onChangeText={(e) => setLastName(e)}
          value={lastName}
          placeholder="Last Name"
        />

<Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.inputComp}
          onChangeText={(e) => setEmail(e)}
          value={email}
          placeholder="Email"
        />


        <Text style={styles.title}>Phone Number</Text>
        <TextInput
          style={styles.inputComp}
          onChangeText={(e) => setPhoneNumber(e)}
          value={phoneNumber}
          placeholder="Phone Number"
        />

        <Text style={styles.title}>Designation</Text>
        <TextInput
          style={styles.inputComp}
          onChangeText={(e) => setDesignation(e)}
          value={designation}
          placeholder="Designation"
        />

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
            <Text style={[styles.btnText, { color: Colors.black }]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => editDetails()}>
            <Text style={[styles.btnText, { color: Colors.white, backgroundColor: Colors.black }]}>
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
    margin: 20,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    elevation: 3,
    gap:10,
  },
  imageComp: {
    alignSelf: 'center',
    padding: 15,
  },
  imageStyle: {
    height: Dimensions.get('screen').width * 0.3,
    width: Dimensions.get('screen').width * 0.3,
    borderRadius: 1000,
  },
  cameraIcon: {
    alignSelf: 'flex-end',
    marginTop: -30,
    marginRight: 10,
    borderRadius: 1000,
    backgroundColor: Colors.black,
  },
  title: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize:responsiveFontSize(18)
  },
  inputComp: {
    borderBottomWidth: 1,
    marginBottom: 15,
    fontSize:responsiveFontSize(18)
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
});
