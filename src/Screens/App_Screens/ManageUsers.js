import React, {useState, useEffect, useCallback} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

import {getallmember, deletemember} from '../../API_Services/org_API';
import AppHeader from '../../Component/AppHeader';
import Colors from '../../Theme/Colors';

export default function ManageUsers({navigation}) {
  const title = 'Your Users';
  const leftIconText = 'Back';
  const leftIconBTN = () => {
    navigation.goBack();
  };
  const leftIcon = (
    <Ionicons name="chevron-back-outline" size={25} color="#fff" />
  );

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

  const getData = async () => {
    let resp = await getallmember();
    // console.log('resp vik', resp.data)
    setList(resp.data);
  };

  const [list, setList] = useState([]);

  const longPress = _id => {
    Alert.alert(
      'Do your want to delete this user ? ',
      'You cannot undo this action',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          // style: "cancel"
        },
        {
          text: 'Delete',
          onPress: () => dltmember(_id),
        },
      ],
    );
  };

  const dltmember = async _id => {
    // console.log('id', _id)
    const response = await deletemember(_id);

    Toast.show({
      type: 'success',
      text1: 'Member deleted Successfully.',
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{backgroundColor:Colors.select_login_button,flex:1}}>
      <ScrollView style={{backgroundColor:Colors.background,flex:1}}
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

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('AddUser')}>
            <Ionicons
              name="add-circle-outline"
              size={Dimensions.get('screen').width * 0.25}
              color="#000"
              style={{margin: 12}}
            />
            <Text style={[styles.titleText, {marginTop: -15}]}>Add New</Text>
          </TouchableOpacity>

          {list.length ? (
            <>
              {list.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onLongPress={() => longPress(item._id)}
                    activeOpacity={1.5}
                    onPress={() => navigation.navigate('EditUser', {item})}>
                    <Image
                      source={{uri: 'https://picsum.photos/200'}}
                      style={styles.imageComp}
                    />

                    <View
                      style={{
                        alignSelf: 'flex-end',
                        alignItems: 'flex-end',
                        marginTop: -40,
                        marginRight: 15,
                        borderRadius: 50,
                        backgroundColor: Colors.green,
                      }}>
                      <MaterialIcons
                        name="edit"
                        size={20}
                        color="#fff"
                        style={{padding: 5}}
                      />
                    </View>

                    <Text style={styles.titleText}>
                      {item.org_user_first_name} {item.org_user_last_name}
                    </Text>
                    <Text style={{textAlign: 'center'}}>
                      {item.designation}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </>
          ) : (
            <View style={{justifyContent: 'center'}}>
              <Text> </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageComp: {
    height: Dimensions.get('screen').width * 0.25,
    width: Dimensions.get('screen').width * 0.25,
    margin: 12,
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: 50,
  },
  titleText: {
    color: Colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
