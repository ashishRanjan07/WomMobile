import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

import Colors from '../Theme/Colors'
import CouponCardPercent from './CouponCardPercent'
import DiscountCouponCardAMT from './DiscountCouponCardAMT'

export default function DiscountCouponSection({ title, APItype }) {

    const navigation = useNavigation();

    return (
        <View>
            <Text style={{ color: Colors.blackDark, fontWeight: 'bold' }}>{title}</Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                <CouponCardPercent />
                <DiscountCouponCardAMT />

                <TouchableOpacity style={styles.DiscountCpnCard} onPress={() => navigation.navigate('CreateCoupons', { title, APItype })} >
                    <Entypo name="plus" size={Dimensions.get('screen').width * 0.3} color={Colors.plusIcon} />
                </TouchableOpacity>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    DiscountCpnCard: {
        backgroundColor: Colors.white,
        width: Dimensions.get('screen').width * 0.85,
        marginHorizontal: 5,
        marginVertical: 10,
        elevation: 5,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
})