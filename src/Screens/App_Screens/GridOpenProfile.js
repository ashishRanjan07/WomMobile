import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import {sendpartnershiprequest} from '../../API_Services/org_API';
import AppHeader from '../../Component/AppHeader';
import SwipeablePartnerUp from '../../Component/SwipeablePartnerUp';

import LoginBTN from '../../Component/LoginBTN';
import AgentRequestSendModal from '../../Component/AgentRequestSendModal';
import Colors from '../../Theme/Colors';
import {responsivePadding} from '../../Component/Responsive';

export default function GridOpenProfile({route, navigation}) {
  const title = route.params.u.name;
  const data = route.params.u;
  const viewType = route.params.viewType;

  const [agentModalVisible, setAgentModalVisible] = useState(false);

  const leftIconText = 'Back';
  const leftIconBTN = () => {
    navigation.goBack();
  };
  const leftIcon = (
    <Ionicons name="chevron-back-outline" size={25} color="#fff" />
  );

  const sedReq = async () => {
    let partner_id = data._id;
    const response = await sendpartnershiprequest(partner_id);
    // console.log('response', response)

    if (response?.status) {
      Toast.show({
        type: 'success',
        text1: response.message,
      });
      // navigation.navigate('PartnerUp')
      leftIconBTN();
    } else {
      let type = typeof response.message;
      if (type === 'string') {
        Toast.show({
          type: 'error',
          text1: response.message,
        });
      } else {
        let repMSG = JSON.parse(JSON.stringify(response.message))[0].msg;
        Toast.show({
          type: 'error',
          text1: repMSG,
        });
      }
    }
  };

  const sedReqBTN = async () => {
    if (viewType === 'ORG') {
      sedReq();
    } else {
      setAgentModalVisible(!agentModalVisible);
    }
  };

  const handleModalView = () => {
    setAgentModalVisible(!agentModalVisible);
    leftIconBTN();
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.select_login_button}
      />
      <ScrollView style={{backgroundColor: Colors.background}}>
        <AppHeader
          title={title}
          leftIconBTN={leftIconBTN}
          leftIcon={leftIcon}
          leftIconText={leftIconText}
        />

        <SwipeablePartnerUp data={data} viewType={viewType} />

        <View style={styles.BTNView}>
          <LoginBTN
            title={'Send Partnership Request'}
            handleBTN={() => sedReqBTN()}
          />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={agentModalVisible}
          onRequestClose={() => {
            setAgentModalVisible(!agentModalVisible);
          }}>
          <AgentRequestSendModal
            handleModalView={() => handleModalView()}
            user={data}
          />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  BTNView: {
    width: '95%',
    margin: responsivePadding(10),
  },
  main: {
    flex: 1,
    backgroundColor: Colors.select_login_button,
  },
});
