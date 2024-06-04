import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import Toast from 'react-native-toast-message';

import Auth_srn_Title from '../../Component/Auth_srn_Title';
import Text_Input from '../../Component/Text_Input';
import Colors from '../../Theme/Colors';
import {FontSize} from '../../Theme/Fonts';
import {getAllIndustry} from '../../API_Services/org_API';
import LoginBTN from '../../Component/LoginBTN';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../Component/Responsive';

export default function SignUP_Organisation({navigation}) {
  const title = 'Sign Up';

  const [error, setError] = useState();

  const [showPassword, setShowPassword] = useState(true);
  const [checkBox, setCheckBox] = useState(false);

  const [name, setName] = useState();
  const [area, setArea] = useState();
  const [about, setAbout] = useState();
  const [industry_id, setIndustry_id] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const signUP = async () => {
    if (
      !name ||
      !area ||
      !about ||
      !username ||
      !password ||
      !industry_id ||
      name === '' ||
      area === '' ||
      about === '' ||
      username === '' ||
      password === '' ||
      industry_id === ''
    ) {
      setError('All fields are required');
      Toast.show({
        type: 'error',
        text1: 'All fields are required',
      });
    } else if (checkBox === false) {
      setError('Please Accept the CheckBox');
      Toast.show({
        type: 'error',
        text1: 'Please Accept the CheckBox',
      });
    } else {
      // setError('All Available')
      // console.log('name', name)
      // console.log('area', area)
      // console.log('about', about)
      // console.log('username', username)
      // console.log('password', password)
      // console.log('industry_id', industry_id)
      navigation.navigate('Documents_Upload', {
        name,
        area,
        about,
        username,
        password,
        industry_id,
      });
    }
  };

  const Login = () => {
    navigation.navigate('Login');
  };

  const [industryList, setIndustryList] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      getIndustry();
    }, 1000);
  }, []);

  const getIndustry = async () => {
    const resp = await getAllIndustry();
    // console.log('res', resp)

    if (resp.status) {
      setIndustryList(resp.data);
    } else {
      setIndustryList([]);
      Toast.show({
        type: 'error',
        text1: 'Industry are not fetched',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Auth_srn_Title title={title} />
        <View style={styles.inputContainer}>
          <Text_Input
            placeholder={'Company Name'}
            entered_data={e => setName(e)}
          />
          <Text_Input placeholder={'Area'} entered_data={e => setArea(e)} />
          <Text_Input placeholder={'About'} entered_data={e => setAbout(e)} />
          <Text_Input
            placeholder={'Email'}
            entered_data={e => setUserName(e)}
          />
          <View style={{width: '95%', alignSelf: 'center'}}>
            <SelectDropdown
              data={industryList}
              onSelect={(selectedItem, index) => {
                console.log('selectedItem', selectedItem._id);
                setIndustry_id(selectedItem._id);
              }}
              defaultButtonText={'Industry Sectors'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title.replace(/\b\w/g, x =>
                  x.toUpperCase(),
                );
              }}
              rowTextForSelection={(item, index) => {
                return item.title.replace(/\b\w/g, x => x.toUpperCase());
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return (
                  <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={Colors.grey}
                    size={20}
                  />
                );
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
              selectedRowStyle={styles.dropdown1SelectedRowStyle}
              search
              searchInputStyle={styles.dropdown1searchInputStyleStyle}
              searchPlaceHolder={'Search here'}
              searchPlaceHolderColor={'darkgrey'}
              renderSearchInputLeftIcon={() => {
                return (
                  <FontAwesome name={'search'} color={Colors.grey} size={20} />
                );
              }}
            />
          </View>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.inputStyle1}
              onChangeText={text => setPassword(text)}
              placeholder={'Password'}
              secureTextEntry={showPassword}
              placeholderTextColor={Colors.grey}
            />
            <TouchableOpacity
              style={{marginHorizontal: 5}}
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Ionicons name="ios-eye-off" size={30} color={Colors.black} />
              ) : (
                <Ionicons name="ios-eye" size={30} color={Colors.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.checkBoxContainer}>
          <TouchableOpacity onPress={() => setCheckBox(!checkBox)}>
            {!checkBox ? (
              <Fontisto
                name="checkbox-passive"
                size={responsiveFontSize(25)}
                color={Colors.grey}
              />
            ) : (
              <Fontisto
                name="checkbox-active"
                size={responsiveFontSize(25)}
                color={Colors.grey}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.checkBoxText}>
            I would like to receive your newsletter and other promotional
            information.
          </Text>
        </View>

        <Text style={{color: Colors.red, textAlign: 'center',marginVertical:responsivePadding(20)}}>
          {error}
        </Text>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <LoginBTN title={'Sign up'} handleBTN={() => signUP()} />
        </View>

        <View style={styles.bottumContainer}>
          <Text style={styles.bottumText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => Login()}>
            <Text style={styles.LinkText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputContainer: {
    width: '95%',
    alignSelf: 'center',
  },
  passwordInputContainer: {
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
  inputStyle: {
    flex: 1,
    letterSpacing: 0.5,
    paddingLeft: 10,
    color: Colors.black,
  },
  checkBoxContainer: {
    width:'85%',
    alignSelf:'center',
    flexDirection: 'row',
    marginVertical: 20,
    gap:10,
    alignItems: 'center',
  },
  checkBoxText: {
    width:'90%',
    fontSize:responsiveFontSize(16),
    color:Colors.grey,
    fontWeight:'400',
    textAlign:'justify'
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
  LinkText: {
    paddingVertical: 15,
    color: Colors.auth_btn_text,
    fontWeight: 'bold',
    fontSize: FontSize.fontSize16,
  },

  // dropdown menu start

  dropdown1BtnStyle: {
    marginVertical: 10,
    marginBottom: 20,
    width: '100%',
    backgroundColor: Colors.lightgrey,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.border_color,
    // padding:15
  },
  dropdown1BtnTxtStyle: {
    color: Colors.grey,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  dropdown1DropdownStyle: {
    backgroundColor: Colors.lightgrey,
  },
  dropdown1RowStyle: {
    backgroundColor: Colors.lightgrey,
    borderBottomColor: Colors.border_color,
  },
  dropdown1RowTxtStyle: {
    color: Colors.grey,
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    textAlign: 'left',
    paddingLeft: 10,
  },
  dropdown1SelectedRowStyle: {
    backgroundColor: Colors.border_color,
  },
  dropdown1searchInputStyleStyle: {
    backgroundColor: Colors.lightgrey,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border_color,
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
});
