import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Colors from '../Theme/Colors';

export const toastConfig = {
    customSuccessToast: ({ text1, text2, props }) => (
        <View style={{ opacity: 0.95 }}>
            <View style={styles.container}>
                <Text style={[styles.headerText, { color: '#45B649' }]}>{text1}</Text>
                <Text>{text2}</Text>
            </View>
        </View>
    ),
    customErrorToast: ({ text1, text2, props }) => (
        <View style={{ opacity: 0.95 }}>
            <View style={styles.container}>
                <Text style={[styles.headerText, { color: '#e52d27' }]}>{text1}</Text>
                <Text>{text2}</Text>
            </View>
        </View>
    ),
    customInfoToast: ({ text1, text2, props }) => (
        <View style={{ opacity: 0.95 }}>
            <View style={styles.container}>
                <Text style={[styles.headerText, { color: '#12c2e9' }]}>{text1}</Text>
                <Text>{text2}</Text>
            </View>
        </View>
    ),
    customWarningToast: ({ text1, text2, props }) => (
        <View style={{ opacity: 0.95 }}>
            <View style={styles.container}>
                <Text style={[styles.headerText, { color: Colors.blue }]}>{text1}</Text>
                <Text>{text2}</Text>
            </View>
        </View>
    ),
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width * 0.95,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 5,
        elevation: 20,
        marginVertical: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
    },
})
