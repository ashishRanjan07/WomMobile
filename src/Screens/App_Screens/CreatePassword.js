import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'

import { createPassword } from '../../API_Services/org_API';
import Auth_srn_Title from '../../Component/Auth_srn_Title';
import Text_Input from '../../Component/Text_Input'
import Colors from '../../Theme/Colors'
import { FontSize } from '../../Theme/Fonts'

import { AuthContext } from '../../Component/Context';

export default function CreatePassword({ navigation, route }) {

    // const loginType = route.params.loginType
    const title = 'Create Password';

    const { signOut } = useContext(AuthContext);

    const [error, setError] = useState();

    const [email, setEmail] = useState();
    const [confirmEmail, setConfirmEmail] = useState();

    const Submit = async () => {

        if (
            !email ||
            !confirmEmail ||
            !email === '' ||
            !confirmEmail === ''
        ) {
            setError('Both fields are required')
        } else if (email === confirmEmail) {

            const response = await createPassword(email)
            // console.log('response Create Password: ', response)

            if (response?.status) {
                signOut()
            } else {
                setError('Network issue please try after few minutes')
            }

        } else {
            setError('Both Email are different')

        }

    }

    return (
        <View style={styles.container}>
            <Auth_srn_Title title={title} />

            <View style={styles.inputContainer}>
                <Text_Input placeholder={'Enter Password'} entered_data={(e) => setEmail(e)} />
                <Text_Input placeholder={'Re-enter Password'} entered_data={(e) => setConfirmEmail(e)} />
            </View>

            <Text style={{ color: Colors.red, textAlign: 'center', marginTop: 5 }}>{error}</Text>

            <TouchableOpacity style={styles.TouchableOpacity_Container} onPress={() => Submit()} >
                <Text style={styles.touchableOpacity_Text}>Submit</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 10,
    },
    inputContainer: {
        marginVertical: 30,
    },
    TouchableOpacity_Container: {
        backgroundColor: Colors.select_login_button,
        padding: 10,
        margin: 10,
        marginVertical: 30,
        width: Dimensions.get('window').width * 0.9,
        borderRadius: 7,
        elevation: 5,

    },
    touchableOpacity_Text: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: FontSize.fontSize20,
        fontWeight: 'bold',
    },
    bottumContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        // marginVertical: 50,
        flexDirection: 'row',
    },
    bottumText: {
        color: Colors.black,
        // backgroundColor: 'red',
        paddingVertical: 15,
        fontWeight: 'bold',
        fontSize: FontSize.fontSize16,
    },
    changeText: {
        paddingVertical: 15,
        color: Colors.auth_btn_text,
        fontWeight: 'bold',
        fontSize: FontSize.fontSize16,
    }
})