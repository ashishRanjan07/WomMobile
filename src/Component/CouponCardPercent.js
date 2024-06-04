import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'

import Colors from '../Theme/Colors'
import { FontSize } from '../Theme/Fonts'

export default function CouponCardPercent() {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardFirstView}>
                <Image source={{ uri: "https://picsum.photos/200" }} style={styles.imageStyle} />
                <Text style={{ paddingLeft: 7, color: Colors.white, fontSize: FontSize.fontSize16 }}>Company name</Text>
            </View>
            <View style={styles.CardSecView}>
                <View style={styles.CardSecFirstView}>
                    <Text style={{
                        fontSize: FontSize.fontSize20, fontWeight: 'bold',
                        paddingVertical: 7,
                    }}>Offer Title</Text>
                    <Text style={{ paddingVertical: 7 }}>Term & Conditions</Text>
                </View>
                <View style={styles.CardSecSecView}>
                    <Text style={{ fontWeight: 'bold', fontSize: FontSize.fontSize30 }}>25% Off</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: Colors.white,
        width: Dimensions.get('screen').width * 0.85,
        marginHorizontal: 5,
        marginVertical: 10,
        elevation: 5,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardFirstView: {
        backgroundColor: Colors.green,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    CardSecView: {
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageStyle: {
        height: 50,
        width: 50,
        borderRadius: 100
    },
    CardSecFirstView: {
        width: '55%',
    },
    CardSecSecView: {
        width: '45%',
    }
})