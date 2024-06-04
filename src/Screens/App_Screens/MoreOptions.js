import React, {useContext} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  Alert,
  SafeAreaView,
} from 'react-native';

import Colors from '../../Theme/Colors';
import {AuthContext} from '../../Component/Context';

export default function MoreOptions({navigation}) {
  const {signOut} = useContext(AuthContext);

  const OptionList = [
    {
      id: 1,
      title: 'Manage Partnerships',
      logo: require('../../Assets/Images/image45.png'),
      handleBTN: 'ManagePartnerShip',
    },
    {
      id: 2,
      title: 'Manage Users',
      logo: require('../../Assets/Images/image46.png'),
      handleBTN: 'ManageUsers',
    },
    {
      id: 3,
      title: 'Customer List',
      logo: require('../../Assets/Images/image47.png'),
      handleBTN: 'CustomerList',
    },
    // { 'id': 4, "title": "My Coupons", "logo": require("../../Assets/Images/image48.png"), "handleBTN": "" },
  ];

  const handleLogOut = () => {
    Alert.alert('Do your want to Logout? ', ' ', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        // style: "cancel"
      },
      {
        text: 'Log Out',
        onPress: () => signOut(),
      },
    ]);
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{flex: 1, padding: 15}}>
        <StatusBar backgroundColor={Colors.black} barStyle="dark-content" />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          {OptionList.map((e, key) => (
            <TouchableOpacity
              key={key}
              style={styles.BoxCardContainer}
              onPress={() => navigation.navigate(e.handleBTN)}>
              <Text style={styles.cardViewText}>{e.title}</Text>
              <Image source={e.logo} style={styles.imageStyle} resizeMode='cover' />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.cardView}
          onPress={() => handleLogOut()}>
          <Text style={styles.cardViewText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    elevation: 5,
    borderRadius: 7,
    marginVertical: 10,
  },
  cardViewText: {
    fontWeight: '500',
    textAlign:'center'
  },
  BoxCardContainer: {
    backgroundColor: Colors.white,
    width: Dimensions.get('screen').width * 0.45,
    marginVertical: 10,
    padding: 5,
    elevation: 5,
    borderRadius: 7,
    alignItems:'center',
    gap:10
  },
  imageStyle: {
    width: '80%',
    height: 100,
    // marginTop: 30,
    // alignSelf: 'flex-end',
    marginVertical: 10,
  },
});
