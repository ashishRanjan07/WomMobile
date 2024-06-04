import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../Theme/Colors'
import { FontSize } from '../Theme/Fonts'
import { responsivePadding } from './Responsive'


export default function Auth_srn_Title(props) {
    return (
        <View>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: Colors.black,
        fontSize: FontSize.fontSize30,
        fontWeight: 'bold',
        margin: responsivePadding(10),
    },
})