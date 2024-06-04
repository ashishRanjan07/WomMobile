import React from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Colors from '../Theme/Colors'
import { FontSize } from '../Theme/Fonts'
import AddDisImage from './AddDisImage';

export default function DiscountBrandAwarenessPamphletOne() {
    return (
        <ImageBackground source={require('../Assets/Images/image12.png')} style={styles.bgImageComp}>
            <View style={{ flexDirection: 'row', paddingTop: 5, }}>
                <Text style={styles.titleCard}>Here goes taglines</Text>
                <View style={{ width: '30%' }}>
                    <Image source={{ uri: "https://picsum.photos/200" }} style={styles.ImageView} />
                </View>
            </View>

            <Text style={styles.subTitle}>About us:</Text>
            <Text style={styles.abtText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>

            <Text style={styles.subTitle}>Our Service:</Text>

            <AddDisImage />

            <View style={styles.rowView}>
                <FontAwesome name="phone" size={30} color={Colors.white} />
                <Text style={{ fontSize: FontSize.fontSize16, color: Colors.white, paddingLeft: 10 }}>+91 87xxxxxx56</Text>
            </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    bgImageComp: {
        width: Dimensions.get('screen').width * 0.85,
        marginVertical: 10,
        marginHorizontal: 5,
        padding: 10,
        justifyContent: 'space-between',
    },
    rowView: {
        flexDirection: 'row',
        paddingBottom: 15,
        alignItems: 'center',
    },
    titleCard: {
        fontSize: FontSize.fontSize25,
        fontWeight: '700',
        color: Colors.white,
        width: '70%'
    },
    ImageView: {
        width: 90,
        height: 90,
        borderRadius: 100,
    },
    subTitle: {
        fontSize: FontSize.fontSize16,
        fontWeight: '700',
        color: Colors.white,
        paddingVertical: 10,
    },
    abtText: {
        color: Colors.white,
    }
})