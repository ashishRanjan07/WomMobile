import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Animated,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Toast from 'react-native-toast-message';

import AppHeader from '../../Component/AppHeader';
import Colors from '../../Theme/Colors';
import AddImageBTN from '../../Component/AddImageBTN';
import {getTemplate} from '../../API_Services/org_API';
import DiscountCouponComponent from '../../Component/DiscountCouponComponent';
import BrandAwarenessCouponCOomponent from '../../Component/BrandAwarenessCouponCOomponent';
import FreeSampleCouponComponent from '../../Component/FreeSampleCouponComponent';

export default function CreateCoupons({navigation, route}) {
  const title = route.params.title;
  const APItype = route.params.APItype;

  const leftIconText = 'Back';
  const leftIconBTN = () => {
    navigation.goBack();
  };
  const leftIcon = (
    <Ionicons name="chevron-back-outline" size={25} color="#fff" />
  );

  const [loading, setLoading] = useState(true);

  const [templateID, setTemplateID] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await getTemplate(title);

    if (response.status) {
      setTemplateID(response.data._id);
    } else {
      Toast.show({
        type: 'error',
        text1: response.message,
      });
    }
    setLoading(false);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
      <AppHeader
        title={title}
        leftIconBTN={leftIconBTN}
        leftIcon={leftIcon}
        leftIconText={leftIconText}
      />

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.black} />
        </View>
      ) : (
        <>
          <AddImageBTN />

          <View style={{padding: 10}}>
            {title === 'Discount Coupons' ? (
              <DiscountCouponComponent
                templateID={templateID}
                coupon_type={title}
                APItype={APItype}
              />
            ) : title === 'Brand Awareness Pamphlet' ? (
              <BrandAwarenessCouponCOomponent
                templateID={templateID}
                coupon_type={title}
                APItype={APItype}
              />
            ) : title === 'Free Sample' ? (
              <FreeSampleCouponComponent
                templateID={templateID}
                coupon_type={title}
                APItype={APItype}
              />
            ) : (
              <></>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}
