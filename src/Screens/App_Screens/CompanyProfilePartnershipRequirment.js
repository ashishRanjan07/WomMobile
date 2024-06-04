import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  Animated,
  RefreshControl,
  Image,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppHeader from '../../Component/AppHeader';
import Colors from '../../Theme/Colors';
import DiscountCouponSection from '../../Component/DiscountCouponSection';
import BrandAwarenessPamphlet from '../../Component/BrandAwarenessPamphlet';
import FreeSampleSection from '../../Component/FreeSampleSection';
import DiscountCouponCardAMT from '../../Component/DiscountCouponCardAMT';
import DiscountBrandAwarenessPamphletOne from '../../Component/DiscountBrandAwarenessPamphletOne';
import DiscountBrandAwarenessPamphletTwo from '../../Component/DiscountBrandAwarenessPamphletTwo';
import DiscountFreeSampleOne from '../../Component/DiscountFreeSampleOne';
import DiscountFreeSampleTwo from '../../Component/DiscountFreeSampleTwo';
import CouponCardPercent from '../../Component/CouponCardPercent';
import {ImageURL} from '../../API_Services/server_Address';

export default function CompanyProfilePartnershipRequirment({
  navigation,
  route,
}) {
  const data = route.params.data;
  console.log(data,"Line 33")
  const APItype = route.params.APItype;

  const title = 'Your Coupons';
  const leftIconText = 'Back';
  const leftIconBTN = () => {
    navigation.goBack();
  };
  const leftIcon = (
    <Ionicons name="chevron-back-outline" size={25} color="#fff" />
  );

  const [dcshow, setDCshow] = useState(false);
  const [dcData, setDCData] = useState();

  const [bapshow, setBAPshow] = useState(false);
  const [bapData, setBAPData] = useState();

  const [fsshow, setFSshow] = useState(false);
  const [fsData, setFSData] = useState();

  useEffect(() => {
    if (data.find(e => e.coupon_type === 'Discount Coupons')) {
      let IndVal = data.findIndex(e => e.coupon_type === 'Discount Coupons');
      if (IndVal > -1) {
        setDCshow(true);
        setDCData(data[IndVal]);
      }
    }

    if (data.find(e => e.coupon_type === 'Brand Awareness Pamphlet')) {
      let IndVal = data.findIndex(e => e.coupon_type === 'Free Sample');
      if (IndVal > -1) {
        setBAPshow(true);
        setBAPData(data[IndVal]);
      }
    }

    if (data.find(e => e.coupon_type === 'Free Sample')) {
      let IndVal = data.findIndex(e => e.coupon_type === 'Free Sample');
      if (IndVal > -1) {
        setFSshow(true);
        setFSData(data[IndVal]);
      }
    }
  });

  //refreshing the screen
  const [refreshing, setRefreshing] = useState(false)
  const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(() => {
      setRefreshing(true)
      wait(2000).then(() => setRefreshing(false))
  }, [])
  let scrollY = new Animated.Value(0)
  // refreshing the screen end

  return (
    <SafeAreaView style={{backgroundColor:Colors.select_login_button,flex:1}}>
    <ScrollView
    onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
    )}
    refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >
      <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
      <AppHeader
        title={title}
        leftIconBTN={leftIconBTN}
        leftIcon={leftIcon}
        leftIconText={leftIconText}
      />

      <View style={{padding: 10}}>
        {dcshow ? (
          <>
            {/* {
                                dcData.template_name === 'amount' ?
                                    <DiscountCouponCardAMT />
                                    :
                                    <CouponCardPercent />
                            } */}
            <View
              style={style.coupoonHolder}>
              <Image
                source={{uri: ImageURL + dcData.template_url}}
                resizeMode="stretch"
                style={style.imageStyle}
              />
            </View>
          </>
        ) : (
          <DiscountCouponSection title={'Discount Coupons'} APItype={APItype} />
        )}

        {bapshow ? (
          <View style={style.coupoonHolder}>
            <Image
              source={{uri: ImageURL + bapData.template_url}}
              style={style.imageStyle}
              resizeMode="stretch"
            />
          </View>
        ) : (
          <BrandAwarenessPamphlet
            title={'Brand Awareness Pamphlet'}
            APItype={APItype}
          />
        )}

        {fsshow ? (
          <View style={style.coupoonHolder}>
            <Image
              source={{uri: ImageURL + fsData.template_url}}
              style={style.imageStyle}
              resizeMode="stretch"
            />
          </View>
        ) : (
          <FreeSampleSection title={'Free Sample'} APItype={APItype} />
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  coupoonHolder: {
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imageStyle:{
    height: 200, 
    width: '100%'
  }
});
