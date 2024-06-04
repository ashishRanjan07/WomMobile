import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  RefreshControl,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import AppHeader from '../../Component/AppHeader';
import ManagePartnerShipRecived from '../../Component/ManagePartnerShipRecived';
import ManagePartnerShipSent from '../../Component/ManagePartnerShipSent';
import Colors from '../../Theme/Colors';
import {FontSize} from '../../Theme/Fonts';
import {
  acceptpartnershiprequest,
  declinepartnershiprequest,
  getorgpartnershipRequest,
  declineagentpartnershiprequest,
  accept_agent_partnership_request,
} from '../../API_Services/org_API';
import { responsiveFontSize, responsivePadding } from '../../Component/Responsive';

export default function ManagePartnerShip({navigation}) {
  const title = 'Your Partnersips';
  const leftIconText = 'Back';
  const leftIconBTN = () => {
    navigation.goBack();
  };
  const leftIcon = (
    <Ionicons name="chevron-back-outline" size={25} color="#fff" />
  );

  const [sentView, setSentView] = useState(false);
  const [receivedRequestList, setReceivedRequestList] = useState([]);
  const [sentRequestList, setSentRequestList] = useState([]);

  //refreshing the screen
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  let scrollY = new Animated.Value(0);
  // refreshing the screen end

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resp = await getorgpartnershipRequest();

    if (resp.status) {
      setReceivedRequestList(resp.data.received_request);
      setSentRequestList(resp.data.sent_request);
    } else {
      Toast.show({
        type: 'error',
        text1: resp.message,
      });
      setReceivedRequestList([]);
      setSentRequestList([]);
    }
  };

  const requestWidrawBTN = async (selectedID, cancelResion, validity) => {
    if (selectedID.user_type === 'organisation') {
      widrowORGReq(selectedID, cancelResion, validity);
    } else if (selectedID.user_type === 'agent') {
      widrowAGENTReq(selectedID, cancelResion, validity);
    } else {
      Toast.show({
        type: 'error',
        text1: 'INVALD USER TYPE',
      });
    }
  };

  const widrowORGReq = async (selectedID, cancelResion, validity) => {
    let id = selectedID.org_id._id;
    let req_id = selectedID.requested_id;

    const response = await declinepartnershiprequest(
      id,
      req_id,
      cancelResion,
      validity,
    );

    if (response.status) {
      getData();
      // navigation.goBack()
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

  const widrowAGENTReq = async (selectedID, cancelResion, validity) => {
    let id = selectedID.agent_id._id;
    let req_id = selectedID.requested_id;

    const response = await declineagentpartnershiprequest(id, req_id);

    if (response.status) {
      getData();
      // navigation.goBack()
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

  const requestAcceptORG = async e => {
    let id = e.org_id._id;
    let req_id = e.requested_id;

    const response = await acceptpartnershiprequest(id, req_id);
    // console.log('response', response)

    if (response.status) {
      // navigation.goBack()
      Toast.show({
        type: 'success',
        text1: response.message,
      });
      getData();
    }
    if (!response.status) {
      // navigation.goBack()
      Toast.show({
        type: 'error',
        text1: response.message,
      });
      getData();
    }
  };

  const requestAcceptAgent = async e => {
    let id = e.agent_id._id;
    let req_id = e.requested_id;

    const response = await accept_agent_partnership_request(id, req_id);
    // console.log('response', response)

    if (response.status) {
      // navigation.goBack()
      Toast.show({
        type: 'success',
        text1: response.message,
      });
      getData();
    }
  };

  const handleRequsetAcceptBTN = async e => {
    if (e.user_type === 'organisation') {
      requestAcceptORG(e);
    } else if (e.user_type === 'agent') {
      requestAcceptAgent(e);
    } else {
      Toast.show({
        type: 'error',
        text1: 'INVALD USER TYPE',
      });
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: Colors.select_login_button}}>
      <ScrollView
        style={{backgroundColor: Colors.background}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <AppHeader
          title={title}
          leftIconBTN={leftIconBTN}
          leftIcon={leftIcon}
          leftIconText={leftIconText}
        />

        <View style={styles.container}>
          <View style={styles.TopTabContainer}>
            <TouchableOpacity
              style={[
                styles.tapBarBTN,
                {
                  backgroundColor: sentView
                    ? Colors.managePartnerShipTopBarBackground
                    : Colors.white,
                },
              ]}
              onPress={() => setSentView(false)}>
              <Text
                style={[
                  styles.topBarBTNText,
                  {fontWeight: sentView ? '400' : 'bold'},
                ]}>
                {' '}
                Received{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tapBarBTN,
                {
                  backgroundColor: sentView
                    ? Colors.white
                    : Colors.managePartnerShipTopBarBackground,
                },
              ]}
              onPress={() => setSentView(true)}>
              <Text
                style={[
                  styles.topBarBTNText,
                  {fontWeight: sentView ? 'bold' : '400'},
                ]}>
                Sent
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{backgroundColor: 'white'}}>
            {sentView ? (
              <View>
                {sentRequestList.length > 0 ? (
                  <ManagePartnerShipSent
                    sentRequestList={sentRequestList}
                    requestWidrawBTN={requestWidrawBTN}
                    RFPlease={() => getData()}
                  />
                ) : (
                  <Text style={styles.NotDataText}>
                    Not Send Data Available
                  </Text>
                )}
              </View>
            ) : (
              <View>
                {receivedRequestList.length > 0 ? (
                  <ManagePartnerShipRecived
                    receivedRequestList={receivedRequestList}
                    requestWidrawBTN={requestWidrawBTN}
                    RFPlease={() => getData()}
                    requestAccept={handleRequsetAcceptBTN}
                  />
                ) : (
                  <Text style={styles.NotDataText}>
                    Not Recived Data Available
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: responsivePadding(20),
  },
  TopTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tapBarBTN: {
    backgroundColor: Colors.white,
    width: '47%',
    borderTopLeftRadius: responsivePadding(10),
    borderTopRightRadius: responsivePadding(10),
  },
  topBarBTNText: {
    padding: responsivePadding(10),
    textAlign: 'center',
    fontSize: responsiveFontSize(18),
    color: Colors.black,
    // fontWeight: 'bold',
  },
  NotDataText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: Dimensions.get('screen').width / 2,
    color: Colors.dark_black,
    fontWeight: 'bold',
    fontSize: FontSize.fontSize18,
  },
});
