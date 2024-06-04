import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  RefreshControl,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import AppHeader from '../../Component/AppHeader';
import Colors from '../../Theme/Colors';

import {orgstatisticspartner} from '../../API_Services/org_API';
import StatsticsViewTYPE from '../../Component/StatsticsViewTYPE';
import StatsticsAgentViewTYPE from '../../Component/StatsticsAgentViewTYPE';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../Component/Responsive';

export default function Statistics({navigation}) {
  const title = 'Your Partners';

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await orgstatisticspartner();

    if (response?.status) {
      // console.log('response statstic', JSON.stringify(response.data));

      setPartnerORGCompany(response.data.organisation);
      setPartnerAGENTCompany(response.data.agents);
    } else {
    }
  };

  const [partnerORGCompany, setPartnerORGCompany] = useState([]);
  const [partnerAGENTCompany, setPartnerAGENTCompany] = useState([]);

  const [agentView, setAgentView] = useState(false);

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

  return (
    <>
      <SafeAreaView style={styles.main} />
      <ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
        <AppHeader title={title} />

        <View style={styles.container}>
          <View style={styles.TopTabContainer}>
            <TouchableOpacity
              style={[
                styles.tapBarBTN,
                {
                  backgroundColor: agentView
                    ? Colors.managePartnerShipTopBarBackground
                    : Colors.white,
                },
              ]}
              onPress={() => setAgentView(false)}>
              <Text
                style={[
                  styles.topBarBTNText,
                  {fontWeight: agentView ? '400' : 'bold'},
                ]}>
                ORGANIZATION
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tapBarBTN,
                {
                  backgroundColor: agentView
                    ? Colors.white
                    : Colors.managePartnerShipTopBarBackground,
                },
              ]}
              onPress={() => setAgentView(true)}>
              <Text
                style={[
                  styles.topBarBTNText,
                  {fontWeight: agentView ? 'bold' : '400'},
                ]}>
                AGENT
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{backgroundColor: 'white'}}>
            {agentView ? (
              <StatsticsAgentViewTYPE
                title={'AGENT'}
                data={partnerAGENTCompany}
              />
            ) : (
              <StatsticsViewTYPE
                title={'ORGANIZATION'}
                data={partnerORGCompany}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.select_login_button,
  },
  container: {
    padding: responsivePadding(10),
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
    fontSize: responsiveFontSize(16),
    color: Colors.blackDark,
    // fontWeight: 'bold',
  },
});
