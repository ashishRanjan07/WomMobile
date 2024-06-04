import React, { useState, useEffect, useCallback } from 'react'
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Dimensions, Animated, Image, StatusBar, ActivityIndicator, Modal, Pressable, SafeAreaView
} from 'react-native'

import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';

import { getuserdetailsID } from '../../API_Services/org_API'
import { ImageURL } from '../../API_Services/server_Address'

import Colors from '../../Theme/Colors';
import { FontSize, Fonts } from '../../Theme/Fonts';
import { responsivePadding } from '../../Component/Responsive';

export default function CompanyProfile({ navigation }) {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      getData();
    });

    return willFocusSubscription;
  }, []);


  const getData = async () => {
    const response = await getuserdetailsID()
    // console.log('response get user details ID', JSON.stringify(response))

    if (response.status) {
      setData(response.data)
      setLoading(false)
    } else {
      Toast.show({
        type: 'error',
        text1: response.message
      })
    }

  }

  //refreshing the screen
  const [refreshing, setRefreshing] = useState(false)
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getData()
    wait(2000).then(() => setRefreshing(false))
  }, [])
  let scrollY = new Animated.Value(0)
  // refreshing the screen end

  const handleEditProfileBTN = async () => {
    setModalVisible(false)
    navigation.navigate('EditCompanyProfile', { data })
  }

  return (
   <SafeAreaView style={{flex:1,backgroundColor:Colors.select_login_button}}>
    <StatusBar barStyle={"dark-content"} backgroundColor={Colors.select_login_button}/>
     <ScrollView style={{flex:1,backgroundColor:Colors.background}}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
       {
        loading ?
          <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
            <ActivityIndicator size="large" color={Colors.black} />
          </View>
          :
          <>
            <View style={{ flex: 1, backgroundColor: Colors.select_login_button, alignItems: 'flex-end', padding: 10, height: Dimensions.get('window').height / 4 }} />

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
              <View style={styles.card}>
                <Pressable onPress={() => setModalVisible(true)} style={styles.editIcon}>
                  <Entypo name="dots-three-vertical" size={30} color={Colors.black} style={{ alignSelf: 'flex-end', }} />
                </Pressable>

                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(false);
                  }}
                >
                  <Pressable style={styles.centeredView} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalView}>
                      <TouchableOpacity onPress={() => handleEditProfileBTN()}>
                        <Text style={styles.modalText}>Edit Profile</Text>
                      </TouchableOpacity>
                    </View>
                  </Pressable>
                </Modal>

                <Image source={{
                  // uri: "https://picsum.photos/200",
                  // uri: ImageURL + data.profile_img,
                  uri: data.profile_img ? ImageURL + data.profile_img : "https://picsum.photos/200",
                  height: Dimensions.get('screen').width * 0.4,
                  width: Dimensions.get('screen').width * 0.4,
                }}
                  style={styles.imageStyle}
                />


                <Text style={styles.companyName}>
                  {data.name ? (data.name).toUpperCase() : "Company Name"}
                </Text>
              </View>
            </View>

            <View style={{ margin: 15 }} >
              <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={styles.heading}>About Company</Text>
              </View>
              <Text style={{ textAlign: 'justify', marginTop: 15, color: Colors.black, letterSpacing: 0.5 }}>
                {data.about ? data.about : "About"}
              </Text>
            </View>

            <View style={{ margin: 15 }} >
              <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={styles.heading}>Industry Sector</Text>
              </View>
              <Text style={{ textAlign: 'justify', marginTop: 15, color: Colors.black, letterSpacing: 0.5 }}>
                {data.industry_id.title ? data.industry_id.title : "Industry"}
              </Text>
            </View>

            <View style={{ margin: 15 }} >
              <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={styles.heading}>Area</Text>
              </View>
              <Text style={{ textAlign: 'justify', marginTop: 15, color: Colors.black, letterSpacing: 0.5 }}>
                {data.area ? data.area : "Area"}
              </Text>
            </View>
          </>
      }

      <TouchableOpacity style={styles.footerComp} onPress={() => navigation.navigate('CompanyProfilePartnershipRequirment', { data: data.partnership_offers, APItype: 'Offer' })} >
        <Text style={{ fontWeight: '600' }}>Partnership Offers</Text>
        <Entypo name="chevron-right" size={30} color={Colors.blackDark} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerComp} onPress={() => navigation.navigate('CompanyProfilePartnershipRequirment', { data: data.partnership_required, APItype: 'Required' })} >
        <Text style={{ fontWeight: '600' }}>Partnership Required</Text>
        <Entypo name="chevron-right" size={30} color={Colors.blackDark} />
      </TouchableOpacity>

    </ScrollView>

   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    width: Dimensions.get('screen').width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -Dimensions.get('window').height / 4,
    padding: 10,
    borderRadius: 10,
    elevation: 5
  },
  imageStyle: {
    borderWidth: 1,
    borderRadius: 1000,
    borderColor: Colors.lightgrey,
    backgroundColor: Colors.white,
  },
  companyName: {
    fontSize: FontSize.fontSize22,
    color: Colors.select_login_button,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  industryName: {
    color: Colors.black,
    fontSize: FontSize.fontSize18,
    marginVertical: 5,
  },
  heading: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: FontSize.fontSize20
  },
  editIcon: {
    alignSelf: 'flex-end',
    paddingTop: 8
  },
  footerComp: {
   marginVertical:5,
    backgroundColor: Colors.warm_grey,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
    shadowRadius: responsivePadding(3),
    elevation: responsivePadding(5),
  },
























  centeredView: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: 'center',
    elevation: 5,
    width: Dimensions.get('screen').width * 0.5,
    alignSelf: 'flex-end'
  },
  modalText: {
    textAlign: "center",
    color: Colors.black,
    fontWeight: '500',
    fontSize: FontSize.fontSize16,
  }
});