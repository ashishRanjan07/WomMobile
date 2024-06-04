import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppHeader from '../../Component/AppHeader';
import Colors from '../../Theme/Colors';
import {FontSize} from '../../Theme/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get_org_coupon_data} from '../../API_Services/org_API';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export default function StatisticsOpenCom({route, navigation}) {
  const [scannedCoupon, setScannedCoupon] = useState(0);
  const [sharedCoupon, setSharedCoupon] = useState(0);

  const data = route.params.e;
  const title = 'Your Partners';
  const leftIconText = 'Back';

  const leftIconBTN = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const fetchData = async () => {
      // console.log(data.partnership.organisation.org_id._id);
      const assigning_org_id = data?.partnership?.organisation?.org_id?._id;

      try {
        const assigned_org_id = await AsyncStorage.getItem('_id');
        const token = await AsyncStorage.getItem('token');
        const params = {
          assigning_org_id,
          assigned_org_id,
        };
        const couponData = await get_org_coupon_data(params);
        setScannedCoupon(couponData.data.coupons[0].scan_coupon.length);
        setSharedCoupon(couponData.data.coupons[0].shared_coupon.length);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Could not fetch coupon Details',
        });
      }
    };

    fetchData();
  }, []);

  const leftIcon = (
    <Ionicons name="chevron-back-outline" size={25} color="#fff" />
  );

  return (
    <SafeAreaView style={{backgroundColor:Colors.select_login_button,flex:1}}>
      <AppHeader
        title={title}
        leftIconBTN={leftIconBTN}
        leftIcon={leftIcon}
        leftIconText={leftIconText}
      />

      <ScrollView style={{backgroundColor:Colors.background}}>
        <View style={styles.card}>
          <View style={styles.top}>
            <Image
              source={require('../../Assets/Images/man.png')}
              style={styles.imageStyle}
            />
            <View style={{paddingLeft: 10,width:'70%', justifyContent: 'space-evenly'}}>
              <Text style={styles.companyName}>
                {data.partnership.organisation.org_id.name}
              </Text>
              {/* <Text style={styles.industryName}>{data.about}</Text> */}
              <Text>Area: {data.partnership.organisation.org_id.area}</Text>
              <Text>About: {data.partnership.organisation.org_id.about}</Text>
            </View>
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: Colors.managePartnerShipTopBarBackground,
              marginVertical: 15,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              marginTop: 50,
              marginBottom: 30,
              flex: 1,
              justifyContent: 'space-around',
              alignItems: 'center',
              width: Dimensions.get('screen').width / 1.2,
            }}>
            <View style={{marginVertical: 10, alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: Colors.black,
                  fontSize: FontSize.fontSize18,
                  marginVertical: 10,
                }}>
                {sharedCoupon}
              </Text>
              <Text style={{color: Colors.black}}>Coupons Issued</Text>
            </View>
            <View style={{marginVertical: 10, alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: Colors.black,
                  fontSize: FontSize.fontSize18,
                  marginVertical: 10,
                }}>
                {scannedCoupon}
              </Text>
              <Text style={{color: Colors.black}}>Coupons Accepted</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    // justifyContent: 'center',
    // alignItems: 'center',
    margin: 10,
    marginVertical: 30,
    borderRadius: 20,
    elevation: 3,
    padding: 10,
    marginBottom: 100,
  },
  top: {
    flex: 1,
    flexDirection: 'row',
  },
  imageStyle: {
    height: 100,
    width: 100,
  },
  companyName: {
    fontSize: FontSize.fontSize20,
    color: Colors.select_login_button,
    fontWeight: 'bold',
    // marginTop: 50,
  },
  industryName: {
    color: Colors.black,
    fontSize: FontSize.fontSize18,
    marginTop: 20,
    marginBottom: 30,
  },
});
