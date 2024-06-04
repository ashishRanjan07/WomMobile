import React from 'react'
import { Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View, Text, StyleSheet, Image } from 'react-native'

import Colors from '../Theme/Colors'
import { FontSize } from '../Theme/Fonts'

export default function PartnershipRequiredOffer({ partnerShipModelValue }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Discount Coupons</Text>

            <View style={styles.card}>
                <View style={styles.CardTopComp}>
                    <Image source={{ uri: "https://picsum.photos/200" }} style={styles.companyLogo} />
                    <Text style={styles.CardTitle}>Company Name</Text>
                </View>

                <View style={styles.CardBottomComp}>
                    <View style={styles.CardBottomFirstComp}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.DiscountValue, { fontSize: FontSize.fontSize30 }]}>25%</Text>
                            <Text style={[styles.DiscountValue, { fontSize: FontSize.fontSize20, textAlignVertical: 'bottom', paddingLeft: 5 }]}>OFF</Text>
                        </View>
                        <Text style={styles.TandC}>Terms & Conditions</Text>
                    </View>
                    <View style={styles.CardBottomSecComp}>
                        <TouchableOpacity style={styles.shopNowComp}>
                            <Text style={styles.shopNowText}>Shop Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 10,
        elevation: 10,
    },
    title: {
        color: Colors.black,
        fontWeight: 'bold',
        fontSize: FontSize.fontSize25,
    },
    companyLogo: {
        height: Dimensions.get('screen').width * 0.12,
        width: Dimensions.get('screen').width * 0.12,
        borderRadius: 100,
    },
    card: {
        marginVertical: 20,
        // backgroundColor: Colors.white,
        elevation: 10,
    },
    CardTopComp: {
        flexDirection: 'row',
        backgroundColor: '#029457',
        padding: 10,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        alignItems: 'center',
    },
    CardTitle: {
        paddingLeft: 10,
        color: Colors.white,
    },
    CardBottomComp: {
        padding: 10,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
    },
    CardBottomFirstComp: {
        width: '60%',
        justifyContent: 'center',
    },
    CardBottomSecComp: {
        // backgroundColor: 'pink',
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shopNowComp: {
        backgroundColor: Colors.black,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    shopNowText: {
        color: Colors.white,
    },
    DiscountValue: {
        color: Colors.blackDark,
        fontWeight: 'bold',
        // fontSize: FontSize.fontSize30,
    },
    TandC: {
        color: '#8B8179'
    }
})