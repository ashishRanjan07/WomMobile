import React from 'react'
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

import Colors from '../Theme/Colors'
import DiscountBrandAwarenessPamphletOne from './DiscountBrandAwarenessPamphletOne';
import DiscountBrandAwarenessPamphletTwo from './DiscountBrandAwarenessPamphletTwo';

export default function BrandAwarenessPamphlet({ title, APItype }) {

    const navigation = useNavigation();

    return (
        <View>
            <Text style={{ color: Colors.blackDark, fontWeight: 'bold' }}>{title}</Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                <DiscountBrandAwarenessPamphletOne />
                <DiscountBrandAwarenessPamphletTwo />

                {/* <ImageBackground source={require('./../Assets/Images/CardBg.png')} style={styles.BrandAwarePamphlet}>
                    <TouchableOpacity onPress={() => console.warn('Add New Brand Awareness Pamphlet')} >
                        <Entypo name="plus" size={Dimensions.get('screen').width * 0.3} color={Colors.plusIcon} />
                    </TouchableOpacity>
                </ImageBackground> */}

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
    BrandAwarePamphlet: {
        width: Dimensions.get('screen').width * 0.85,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})