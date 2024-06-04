import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Entypo from 'react-native-vector-icons/Entypo';

import Colors from '../Theme/Colors'
import { FontSize } from '../Theme/Fonts'

export default function AppHeader(props) {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 10 }}>
                <TouchableOpacity onPress={props.leftIconBTN}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    {props.leftIcon}
                    <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: FontSize.fontSize18 }}>{props.leftIconText}</Text>
                </TouchableOpacity>

            </View>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: Colors.select_login_button,
    },
    title: {
        // marginTop: 100,
        color: Colors.white,
        fontSize: FontSize.fontSize24,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
    },
})