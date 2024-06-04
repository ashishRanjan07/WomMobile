import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  RefreshControl,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

import {
  getAllIndustry,
  update_org,
  uploadorgprofile,
} from '../../API_Services/org_API';
import AddImageBTN from '../../Component/AddImageBTN';
import AppHeader from '../../Component/AppHeader';
import Text_Input from '../../Component/Text_Input';
import Colors from '../../Theme/Colors';
import LoginBTN from '../../Component/LoginBTN';
import {GET_USER_DETAILS} from '../../API_Services/API_service';
import {ImageURL} from '../../API_Services/server_Address';

export default function EditCompanyProfile({navigation, route}) {
  const title = 'Edit Profile';
  const leftIconText = 'Back';
  const leftIconBTN = () => {
    navigation.goBack();
  };
  const leftIcon = (
    <Ionicons name="chevron-back-outline" size={25} color="#fff" />
  );

  const [industry_id, setIndustry_id] = useState();
  const [indName, setIndName] = useState(null);

  const [name, setName] = useState();
  const [area, setArea] = useState();
  const [about, setAbout] = useState();
  const [oldIMG, setOldImg] = useState();
  const [newIMG, setNewIMG] = useState();

  const [industryList, setIndustryList] = useState([]);

  useEffect(() => {
    getIndustry();

    let data = route.params.data;

    setName(data.name);
    setIndName(data.industry_id.title);
    setArea(data.area);
    setAbout(data.about);
    setOldImg(
      data.profile_img
        ? ImageURL + data.profile_img
        : 'https://picsum.photos/200',
    );

    // setTimeout(() => {
    //     getIndustry()
    // }, 1000);
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

  const updateORGDetails = async () => {
    const response = await update_org(industry_id, name, area, about);

    if (response?.status) {
      Toast.show({
        type: 'success',
        text1: response.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: response.message,
      });
    }
  };

  const uploadORGProfileImage = async () => {
    let details = await GET_USER_DETAILS();
    let orgID = details.org_admin_id._id;
    let roleFORflag = details.role;
    let flagVlaue = roleFORflag === 'org_admin' ? '0' : '1';
    // flag value org_admnin k lea 0 pass krni h o r member k lea 1

    let data = new FormData();
    data.append('_id', orgID);
    data.append('profile_pic', {
      uri: newIMG.uri,
      type: newIMG.type,
      name: newIMG.fileName,
    });
    data.append('flag', flagVlaue);
    data.append('img_key', oldIMG);

    const response = await uploadorgprofile(data);

    if (response.status) {
      Toast.show({
        type: 'success',
        text1: 'Image Update Successfully',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: response.message,
      });
    }
  };

  const handleUpdateBTN = async () => {
    if (newIMG == null) {
      updateORGDetails();
      leftIconBTN();
    } else {
      updateORGDetails();
      uploadORGProfileImage();
      leftIconBTN();
    }
  };

  const AddImage = async e => {
    setNewIMG(e);
  };

  return (
    <SafeAreaView style={{backgroundColor:Colors.select_login_button,flex:1}}>
      <ScrollView>
        <AppHeader
          title={title}
          leftIconBTN={leftIconBTN}
          leftIcon={leftIcon}
          leftIconText={leftIconText}
        />

        <View style={styles.container}>
          <AddImageBTN
            newIMGURI={e => AddImage(e)}
            imageLink={newIMG ? newIMG.uri : oldIMG}
          />

          <Text_Input
            placeholder={'Name'}
            value={name}
            entered_data={e => setName(e)}
          />

          <SelectDropdown
            data={industryList}
            onSelect={(selectedItem, index) => {
              // console.log('selectedItem', selectedItem._id);
              setIndustry_id(selectedItem._id);
            }}
            // defaultButtonText={'Select Industry'}
            defaultButtonText={indName ? indName : 'Select Industry'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.title;
            }}
            rowTextForSelection={(item, index) => {
              return item.title;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={Colors.black}
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
                <FontAwesome name={'search'} color={Colors.black} size={20} />
              );
            }}
          />

          <Text_Input
            placeholder={'Area'}
            value={area}
            entered_data={e => setArea(e)}
          />
          <Text_Input
            placeholder={'About'}
            value={about}
            entered_data={e => setAbout(e)}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={{width: '48%'}}>
              <LoginBTN title={'Cancel'} handleBTN={() => leftIconBTN()} />
            </View>
            <View style={{width: '48%'}}>
              {/* <LoginBTN title={'Update'} handleBTN={() => updateORGDetails()} /> */}
              {/* <LoginBTN title={'Update Image'} handleBTN={() => uploadORGProfileImage()} /> */}
              <LoginBTN title={'Update'} handleBTN={() => handleUpdateBTN()} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    elevation: 5,
  },

  // dropdown menu start

  dropdown1BtnStyle: {
    // margin: 10,
    marginVertical: 10,
    // width: Dimensions.get('window').width * 0.95,
    width: '100%',
    backgroundColor: Colors.lightgrey,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.border_color,
  },
  dropdown1BtnTxtStyle: {
    color: Colors.black,
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
    color: Colors.black,
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

  // dropdown menu close
});
