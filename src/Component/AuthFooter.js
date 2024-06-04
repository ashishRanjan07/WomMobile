import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../Theme/Colors'
import { FontSize } from '../Theme/Fonts'


export default function AuthFooter() {

    const btnClick = () => {
        console.log('click')
    }

    return (
        <View style={styles.bottumContainer}>
            <Text style={styles.staticText}>Vik</Text>
            <TouchableOpacity onPress={() => btnClick()}>
                <Text style={styles.LinkText}>Vik</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bottumContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        // marginVertical: 50,
        flexDirection: 'row',
    },
    staticText: {
        color: Colors.black,
        // backgroundColor: 'red',
        paddingVertical: 15,
        fontWeight: 'bold',
        fontSize: FontSize.fontSize16,
    },
    LinkText: {
        paddingVertical: 15,
        color: Colors.select_login_button,
        fontWeight: 'bold',
        fontSize: FontSize.fontSize16,
    }
})