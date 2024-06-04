import React from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppHeader from '../../Component/AppHeader';
import Colors from '../../Theme/Colors';
import { Fonts, FontSize } from '../../Theme/Fonts';


export default function CustomerProfile({ route, navigation }) {

    const leftIconText = "Back";
    const leftIconBTN = () => { navigation.goBack() }
    const leftIcon = <Ionicons name="chevron-back-outline" size={25} color="#fff" />;

    const data = route.params.e

    return (
        <ScrollView>
            <AppHeader leftIconBTN={leftIconBTN} leftIcon={leftIcon} leftIconText={leftIconText} />

            <View style={styles.topContainer}>
                <View style={styles.imageContainer}>
                    {/* <Image source={{ uri: route.params.e.image }} style={styles.imageStyle} /> */}
                    <Image source={{ uri: "https://picsum.photos/200" }} style={styles.imageStyle} />
                </View>
                <Text style={styles.title}>{data.full_name}</Text>
            </View>

            <View style={styles.personalInformationContainer}>
                <Text style={styles.PItitle}>Personal Information</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                    <Text style={styles.PIKey}>Phone Number</Text>
                    <Text style={styles.PIValue}>{data.phone}</Text>
                </View>
                <View style={{ backgroundColor: Colors.managePartnerShipTopBarBackground, height: 1 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                    <Text style={styles.PIKey}>Email</Text>
                    <Text style={styles.PIValue}>{data.email}</Text>
                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: Colors.black,
        alignItems: 'center'
    },
    imageContainer: {
        marginTop: -20,
        marginVertical: 10,
        backgroundColor: Colors.white,
        borderRadius: 200,
    },
    imageStyle: {
        height: Dimensions.get('screen').width * 0.4,
        width: Dimensions.get('screen').width * 0.4,
        borderRadius: 200
    },
    title: {
        color: Colors.white,
        fontSize: FontSize.fontSize20,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 15
    },
    subtitle: {
        color: '#BDBDBD',
        marginVertical: 10,
        fontSize: FontSize.fontSize16,
    },
    personalInformationContainer: {
        backgroundColor: Colors.white,
        marginVertical: 20,
        padding: 10,
        width: Dimensions.get('window').width * 0.9,
        alignSelf: 'center',
        borderRadius: 10
    },
    PItitle: {
        color: Colors.blackDark,
        fontSize: FontSize.fontSize18,
        fontWeight: 'bold',
    },
    PIKey: {
    },
    PIValue: {
        color: Colors.blackDark,
    },
    TouchableOpacity_Container: {
        backgroundColor: Colors.select_login_button,
        padding: 10,
        margin: 10,
        marginVertical: 30,
        width: Dimensions.get('window').width * 0.9,
        borderRadius: 7,
        elevation: 5,
        alignSelf: 'center'
    },
    touchableOpacity_Text: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: FontSize.fontSize20,
        fontWeight: 'bold',
    },
})