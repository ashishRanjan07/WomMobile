import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, StatusBar, ScrollView } from 'react-native'
import Colors from '../../Theme/Colors';
import { FontSize, Fonts } from '../../Theme/Fonts';

export default function Select_Login_Type({ navigation }) {

    const agentBTN = () => {
        console.log('Agent BTN');
        navigation.navigate('Login', { loginType: 'Agent' });
    }

    const organisationBTN = () => {
        console.log('Organisation BTN');
        navigation.navigate('Login', { loginType: 'Organisation' });
    }

    return (
        <ScrollView>
            <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.image_container}>
                    {/* <Text>Logo Image Here</Text> */}
                    <Image source={require("../../Assets/Images/wominsidelogo.png")} />
                </View>
                <View style={styles.head_container}>
                    <Text style={styles.head_container_Text}>Welcome!</Text>
                </View>
                <View style={styles.text_Container}>
                    <Text style={styles.text_Container_Text}>Lorem Ipsum Dolor and here goes a beautiful tagline of the company.</Text>
                </View>
                <View style={styles.button_Container}>
                    <TouchableOpacity style={styles.TouchableOpacity_Container} onPress={() => agentBTN()} >
                        <Text style={styles.touchableOpacity_Text}>Agent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableOpacity_Container} onPress={() => organisationBTN()} >
                        <Text style={styles.touchableOpacity_Text}>Organisation</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 10,
        marginBottom: 30,
    },
    image_container: {
        // backgroundColor: Colors.lightgrey,
        backgroundColor: Colors.white,
        margin: 10,
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 3,
    },
    head_container: {
        marginTop: 50,
        // marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    head_container_Text: {
        fontSize: FontSize.fontSize35,
        fontWeight: 'bold',
        color: Colors.black,
        // fontFamily: Fonts.serif
    },
    text_Container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        // backgroundColor: 'red',
        margin: 30,
    },
    text_Container_Text: {
        fontSize: FontSize.fontSize16,
        // fontWeight: 'bold',
        color: Colors.black,
        textAlign: 'center',
    },
    button_Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
    TouchableOpacity_Container: {
        backgroundColor: Colors.select_login_button,
        padding: 10,
        width: Dimensions.get('window').width / 2 * 0.85,
        borderRadius: 7,
        elevation: 5,

    },
    touchableOpacity_Text: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: FontSize.fontSize20,
    }
});