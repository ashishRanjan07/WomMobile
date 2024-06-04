import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, } from 'react-native'

import Colors from '../Theme/Colors'
import { FontSize } from '../Theme/Fonts'

export default function DiscountFreeSampleOne() {
    return (
        <View style={styles.container}>
            <View style={styles.containerOne}>
                <Image source={{ uri: "https://picsum.photos/200" }} style={styles.ImageView} />
            </View>
            <View style={styles.containerTwo}>
                <Text style={styles.title}>Company Name</Text>

                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                    <View style={{ alignSelf: 'center' }}>
                        <Text>BUY</Text>
                        <Text>GET</Text>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{
                            color: Colors.blackDark,
                            fontWeight: '600',
                            fontSize: FontSize.fontSize40,
                            paddingHorizontal: 5
                        }}>1</Text>
                        <Text style={{ alignSelf: 'center' }}>FREE</Text>
                    </View>
                </View>

                <Text style={styles.TC}>Terms & Conditions</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width * 0.85,
        backgroundColor: Colors.white,
        marginVertical: 10,
        marginHorizontal: 5,
        padding: 10,
        elevation: 5,
        borderRadius: 7,
        flexDirection: 'row',
        height: Dimensions.get('screen').width * 0.37,
    },
    containerOne: {
        paddingRight: 10,
        alignSelf: 'center',
        width: '35%'
    },
    containerTwo: {
        padding: 10,
        justifyContent: 'space-between',
        borderLeftWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#BDBDBD',
        width: '65%'
    },
    ImageView: {
        height: Dimensions.get('screen').width * 0.25,
        width: Dimensions.get('screen').width * 0.25,
        borderRadius: 100,
    },
    title: {
        color: Colors.blackDark,
        fontSize: FontSize.fontSize16,
        fontWeight: '700'
    },
    TC: {
        color: '#8B8179'
    }
})