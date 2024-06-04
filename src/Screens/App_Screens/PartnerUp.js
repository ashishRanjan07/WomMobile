import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  ActivityIndicator,
  Image,
  Animated,
  RefreshControl,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

import Colors from '../../Theme/Colors';
import {FontSize, Fonts} from '../../Theme/Fonts';

import {
  getallorg,
  sendpartnershiprequest,
  getfilterpartnerup,
  get_agent_partner_up,
} from '../../API_Services/org_API';
import SwipePartnerUp from '../../Component/SwipePartnerUp';
import IndDropDownComp from '../../Component/IndDropDownComp';
import PRDropDownComp from '../../Component/PRDropDownComp';
import ModeDropDownComp from '../../Component/ModeDropDownComp';
import AgentRequestSendModal from '../../Component/AgentRequestSendModal';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../Component/Responsive';

export default function PartnerUp({navigation}) {
  const [isLoading, setIsLoading] = useState(false);

  const [partnerCompanydetail, setPartnerCompanydetail] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipesRef = useRef(null);
  const [swipe, setSwipe] = useState(true);

  const [agentList, setAgentList] = useState([]);

  const [viewType, setViewType] = useState('ORG');
  const [agentModalVisible, setAgentModalVisible] = useState(false);

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
    navigation.addListener('focus', () => {
      getData();
    });

    getData();
  }, [navigation]);

  useEffect(() => {
    console.log(partnerCompanydetail.length || null);
  }, [partnerCompanydetail]);

  const getData = async () => {
    setIsLoading(true);

    try {
      const response = await getallorg();
      // console.log('response', response);
      setPartnerCompanydetail(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      // Alert.alert('Error getting users', '', [{ text: 'Retry', onPress: () => fetchUsers() }])
      setIsLoading(true);
    }
  };

  const handleLike = async () => {
    // console.log('like')

    let user = partnerCompanydetail[currentIndex];
    let partner_id = user._id;
    // console.log('partner_id', partner_id)

    const response = await sendpartnershiprequest(partner_id);
    // console.log('response', response)

    if (response?.status) {
      Toast.show({
        type: 'success',
        text1: response.message,
      });
      getData();
    } else {
      Toast.show({
        type: 'error',
        text1: response.message,
      });
    }

    nextUser();
  };

  const handleLikeBTN = async () => {
    if (viewType === 'ORG') {
      handleLike();
    } else {
      setAgentModalVisible(!agentModalVisible);
    }
  };

  function handlePass() {
    Toast.show({
      type: 'success',
      text1: 'Next Profile',
    });
    nextUser();
  }

  function nextUser() {
    const nextIndex =
      partnerCompanydetail.length - 2 === currentIndex ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  }

  const handleINDFilter = async e => {
    setIsLoading(true);
    let data = {industries: e};
    const response = await getfilterpartnerup(data);
    if (response.status) {
      setPartnerCompanydetail(response.data);
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: response.message,
      });
      setIsLoading(false);
    }
  };

  const handleCouPonFilter = async e => {
    setIsLoading(true);
    let data = {coupon_types: e};
    const response = await getfilterpartnerup(data);
    if (response.status) {
      setPartnerCompanydetail(response.data);
      setIsLoading(false);
    } else {
      console.log(response);
      Toast.show({
        type: 'error',
        text1: response.message,
      });
      setIsLoading(false);
    }
  };

  const handleModeFilter = async e => {
    setViewType(e);

    if (e === 'ORG') {
      getData();
    } else {
      setIsLoading(true);

      const response = await get_agent_partner_up();

      if (response.status) {
        setAgentList(response.data);
      } else {
        Toast.show({
          type: 'error',
          text1: response.message,
        });
      }

      setIsLoading(false);
    }
  };

  const handleModalView = () => {
    setAgentModalVisible(!agentModalVisible);
    getData();
  };

  return (
    <SafeAreaView>
      <ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <StatusBar
          backgroundColor={Colors.select_login_button}
          barStyle="dark-content"
        />
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 15}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => setSwipe(true)}
              style={[styles.filterBTNStyle, {marginHorizontal: 5}]}>
              <MaterialCommunityIcons
                name="gesture-swipe"
                size={25}
                color={Colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSwipe(false)}
              style={[styles.filterBTNStyle, {marginHorizontal: 5}]}>
              <Feather name="grid" size={25} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{alignItems: 'center', padding: 10}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <Text style={styles.companyName}>Filters</Text>
          <IndDropDownComp
            tittle={'Industry'}
            handleBTN={e => handleINDFilter(e)}
          />
          <PRDropDownComp
            tittle={'Partnership Required'}
            handleBTN={e => handleCouPonFilter(e)}
          />
          <ModeDropDownComp
            tittle={'Mode'}
            handleBTN={e => handleModeFilter(e)}
          />
        </ScrollView>

        <ScrollView
          style={{marginBottom: Dimensions.get('screen').height * 0.07}}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.blue} />
              <Text>Loding data please wait...</Text>
            </View>
          ) : (
            <View>
              {viewType === 'ORG' ? (
                <View>
                  {partnerCompanydetail.length > 1 ? (
                    <View>
                      {swipe ? (
                        partnerCompanydetail.map(
                          (u, i) =>
                            currentIndex === i && (
                              <SwipePartnerUp
                                viewType={viewType}
                                key={i}
                                ref={swipesRef}
                                currentIndex={currentIndex}
                                data={partnerCompanydetail}
                                handleLike={handleLikeBTN}
                                handlePass={handlePass}
                              />
                            ),
                        )
                      ) : (
                        <View style={styles.gridContaier}>
                          {partnerCompanydetail.map((u, i) => (
                            <TouchableOpacity
                              key={i}
                              style={styles.viewGridComp}
                              onPress={() =>
                                navigation.navigate('GridOpenProfile', {
                                  u,
                                  viewType,
                                })
                              }>
                              <Image
                                source={require('../../Assets/Images/man.png')}
                                style={styles.imageGridStyle}
                              />
                              <Text style={styles.companyName}>{u.name}</Text>
                              <Text style={styles.industryName}>{u.about}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  ) : (
                    <Text style={styles.NotAvailable}>DATA NOT AVAILABLE</Text>
                  )}
                </View>
              ) : (
                <View>
                  {agentList.length > 1 ? (
                    <View>
                      {swipe ? (
                        <View>
                          {agentList.map(
                            (u, i) =>
                              currentIndex === i && (
                                <SwipePartnerUp
                                  viewType={viewType}
                                  key={i}
                                  ref={swipesRef}
                                  currentIndex={currentIndex}
                                  data={agentList}
                                  handleLike={handleLikeBTN}
                                  handlePass={handlePass}
                                />
                              ),
                          )}
                        </View>
                      ) : (
                        <View style={styles.gridContaier}>
                          {agentList.map((u, i) => (
                            <TouchableOpacity
                              key={i}
                              style={styles.viewGridComp}
                              onPress={() =>
                                navigation.navigate('GridOpenProfile', {
                                  u,
                                  viewType,
                                })
                              }>
                              <Image
                                source={require('../../Assets/Images/man.png')}
                                style={styles.imageGridStyle}
                              />
                              <Text style={styles.companyName}>{u.name}</Text>
                              <Text style={styles.industryName}>
                                {u.occupation}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  ) : (
                    <Text>DATA NOT AVAILABLE</Text>
                  )}
                </View>
              )}
            </View>
          )}
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={agentModalVisible}
          onRequestClose={() => {
            setAgentModalVisible(!agentModalVisible);
          }}>
          <AgentRequestSendModal
            handleModalView={() => handleModalView()}
            user={agentList[currentIndex]}
          />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterBTNStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.select_login_button,
    padding: responsivePadding(10),
    paddingHorizontal: responsivePadding(15),
    borderRadius: responsivePadding(10),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
    shadowRadius: responsivePadding(3),
    elevation: responsivePadding(10),
  },
  companyName: {
    fontSize: FontSize.fontSize18,
    color: Colors.blackDark,
    fontWeight: 'bold',
  },
  industryName: {
    color: Colors.black,
    // fontSize: FontSize.fontSize18,
  },
  gridContaier: {
    width: Dimensions.get('screen').width * 0.95,
    // backgroundColor: 'red',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  viewGridComp: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: responsivePadding(7),
    width: Dimensions.get('screen').width * 0.43,
  },
  imageGridStyle: {
    height: Dimensions.get('screen').width * 0.37,
    width: Dimensions.get('screen').width * 0.37,
  },
  NotAvailable: {
    backgroundColor: Colors.white,
    height: Dimensions.get('screen').width,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(18),
    margin: responsivePadding(20),
    elevation: responsivePadding(3),
    borderRadius: responsivePadding(8),
  },
  loadingContainer: {
    alignItems: 'center',
    gap: responsivePadding(10),
    marginTop: responsivePadding(10),
  },
});
