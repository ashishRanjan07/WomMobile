import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../Theme/Colors';
import { FontSize } from '../Theme/Fonts';
import { responsiveFontSize, responsivePadding } from './Responsive';

export default function StatsticsViewTYPE({ title, data }) {
  const navigation = useNavigation();

  const touch_button = (e) => {
    navigation.navigate('StatisticsOpenCom', { e });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.length > 0 ? (
        data.map((industry, index) => (
          <View key={index} style={styles.industryContainer}>
            <Text style={styles.industryTitle}>{industry.industry_title.toUpperCase()}</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {industry.items.map((item, key) => (
                <Pressable key={key} style={styles.card} onPress={() => touch_button(item)}>
                  <Image source={require('../Assets/Images/man.png')} style={styles.imageStyle} />
                  <View style={styles.detailsContainer}>
                    <Text style={styles.companyName}>{item.partnership.organisation.org_id.name}</Text>
                    <View style={styles.detailsText}>
                      <Text style={styles.bottomText}>Area: </Text>
                      <Text style={styles.bottomText}>{item.partnership.organisation.org_id.area}</Text>
                    </View>
                    <View style={styles.detailsText}>
                      <Text style={styles.bottomText}>About: </Text>
                      <Text style={styles.bottomText}>{item.partnership.organisation.org_id.about}</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        ))
      ) : (
        <Text style={styles.notDataAvailable}>Partnership with {title} not Available</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  industryContainer: {
    marginTop:responsivePadding(10),
    padding:responsivePadding(10),
    gap:responsivePadding(5),
  },
  industryTitle: {
    color: Colors.blackDark,
    fontWeight: 'bold',
    marginBottom: responsivePadding(10),
    fontSize:responsiveFontSize(16),
    textAlign:'center'
  },
  imageStyle:{
    height:responsivePadding(100),
    width:responsivePadding(100)
  }, 
  card: {
    alignSelf:'center',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
    shadowRadius: responsivePadding(3),
    elevation: responsivePadding(3),
    borderRadius: responsivePadding(10),
    width: '90%', // Adjust as needed
    flexDirection: 'row',
    marginVertical: responsivePadding(7),
    marginHorizontal:responsivePadding(10),
    padding: responsivePadding(10),
  },
  imageStyle: {
    height: responsivePadding(100),
    width: responsivePadding(100),
  },
  bottomText: {
    fontSize: responsiveFontSize(16),
  },
  companyName: {
    fontSize: responsiveFontSize(20),
    color: Colors.black,
    flexShrink: 1,
  },
  detailsContainer: {
    paddingLeft: responsivePadding(10),
    justifyContent: 'space-evenly',
  },
  detailsText: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'85%'
  },
  notDataAvailable: {
    paddingVertical: responsivePadding(20),
    fontWeight: '500',
    textAlign: 'center',
  },
});
