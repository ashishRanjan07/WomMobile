import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getallcustomer} from '../../API_Services/org_API';

import AppHeader from '../../Component/AppHeader';
import Colors from '../../Theme/Colors';
import {Fonts, FontSize} from '../../Theme/Fonts';
import { responsiveFontSize, responsivePadding } from '../../Component/Responsive';

export default function CustomerList({navigation}) {
  const title = 'Your Customers';
  const leftIconText = 'Back';
  const leftIconBTN = () => {
    navigation.goBack();
  };
  const leftIcon = (
    <Ionicons name="chevron-back-outline" size={responsiveFontSize(30)} color="#fff" />
  );

  const [isLoading, setIsLoading] = useState(false);

  const [list, setList] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData();
    });

    getData();
  }, [navigation]);

  const getData = async () => {
    setIsLoading(true);

    try {
      const response = await getallcustomer();
      // console.log('response', response);
      if (response?.status) {
        setList(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      // console.log(error)
      setIsLoading(true);
    }
  };

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
    <SafeAreaView style={{backgroundColor:Colors.select_login_button,flex:1}}>
        <StatusBar barStyle={"dark-content"} backgroundColor={Colors.select_login_button}/>
    <ScrollView style={{backgroundColor:Colors.background,flex:1}}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: false,
      })}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <AppHeader
        title={title}
        leftIconBTN={leftIconBTN}
        leftIcon={leftIcon}
        leftIconText={leftIconText}
      />

      <View style={{padding: responsivePadding(15)}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateCustomer')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons
            name="add-circle-outline"
            size={Dimensions.get('screen').width * 0.2}
            color="#000"
          />
          <Text style={{color: Colors.black, fontSize: FontSize.fontSize16}}>
            Create Customer
          </Text>
        </TouchableOpacity>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.black} />
          </View>
        ) : (
          <>
            {list.length ? (
              <>
                {list.map((e, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        navigation.navigate('CustomerProfile', {e})
                      }
                      style={styles.listContainer}>
                      <View style={{margin: 5}}>
                        {/* <Image source={{ uri: e.image }} style={styles.imageStyle} /> */}
                        <Image
                          source={{uri: 'https://picsum.photos/200'}}
                          style={styles.imageStyle}
                        />
                      </View>

                      <View style={{paddingLeft: 10}}>
                        <Text style={styles.title}>{e.full_name}</Text>
                        <Text>{e.email}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </>
            ) : (
              <View style={{justifyContent: 'center'}}>
                <Text> </Text>
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    height: Dimensions.get('screen').width * 0.165,
    width: Dimensions.get('screen').width * 0.165,
    borderRadius: 100,
  },
  title: {
    fontSize: FontSize.fontSize18,
    color: Colors.black,
    fontWeight: 'bold',
  },
});

// const list = [
//     { "id": "1", "name": "One", "image": "https://picsum.photos/200", "email": "One@gmail.com" },
//     { "id": "2", "name": "Two", "image": "https://picsum.photos/200", "email": "Two@gmail.com" },
//     { "id": "3", "name": "Three", "image": "https://picsum.photos/200", "email": "Three@gmail.com" },
//     { "id": "4", "name": "Four", "image": "https://picsum.photos/200", "email": "Four@gmail.com" },
//     { "id": "5", "name": "Five", "image": "https://picsum.photos/200", "email": "Five@gmail.com" },
//     { "id": "6", "name": "Six", "image": "https://picsum.photos/200", "email": "Six@gmail.com" },
//     { "id": "7", "name": "Seven", "image": "https://picsum.photos/200", "email": "Seven@gmail.com" },
//     { "id": "8", "name": "Eight", "image": "https://picsum.photos/200", "email": "Eight@gmail.com" },
//     { "id": "9", "name": "Nine", "image": "https://picsum.photos/200", "email": "Nine@gmail.com" },
//     { "id": "10", "name": "Ten", "image": "https://picsum.photos/200", "email": "Ten@gmail.com" },
//     { "id": "11", "name": "Eleven", "image": "https://picsum.photos/200", "email": "Eleven@gmail.com" },
//     { "id": "12", "name": "Twelve", "image": "https://picsum.photos/200", "email": "Twelve@gmail.com" },
//     { "id": "13", "name": "Thirteen", "image": "https://picsum.photos/200", "email": "Thirteen@gmail.com" },
//     { "id": "14", "name": "Fourteen", "image": "https://picsum.photos/200", "email": "Fourteen@gmail.com" },
//     { "id": "15", "name": "Fifteen", "image": "https://picsum.photos/200", "email": "Fifteen@gmail.com" },
//     { "id": "16", "name": "Sixteen", "image": "https://picsum.photos/200", "email": "Sixteen@gmail.com" },
//     { "id": "17", "name": "Seventeen", "image": "https://picsum.photos/200", "email": "Seventeen@gmail.com" },
//     { "id": "18", "name": "Eighteen", "image": "https://picsum.photos/200", "email": "Eighteen@gmail.com" },
//     { "id": "19", "name": "Nineteen", "image": "https://picsum.photos/200", "email": "Nineteen@gmail.com" },
//     { "id": "20", "name": "Twenty", "image": "https://picsum.photos/200", "email": "Twenty@gmail.com" },
//     { "id": "21", "name": "Twenty One", "image": "https://picsum.photos/200", "email": "TwentyOne@gmail.com" },
//     { "id": "22", "name": "Twenty Two", "image": "https://picsum.photos/200", "email": "TwentyTwo@gmail.com" }
// ]
