import React, { useState } from 'react'
import { View, Text, Dimensions, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Toast from 'react-native-toast-message';

import Colors from '../Theme/Colors';
import { FontSize } from '../Theme/Fonts';
import Text_Input from './Text_Input';
import LoginBTN from './LoginBTN';
import { sendpartnershiprequestforagent } from '../API_Services/org_API';
import { responsivePadding } from './Responsive';

export default function AgentRequestSendModal({ handleModalView, user }) {

    const [radioValue, setRadioValue] = useState(null);
    const [profitSharing, setProfitSharing] = useState(null)
    const [fixedPrice, setFixedPrice] = useState(null)

    const handleSendReqBTN = async () => {
        const agent_id = user._id;

        var data = {
            "agent_id": agent_id,
            "fixed_price": fixedPrice,
            "profit_sharing": profitSharing,
        }

        if (profitSharing > 100) {
            Toast.show({
                type: 'error',
                text1: 'Please Enter valid Profit Sharing'
            })
        } else if (
            !fixedPrice && !profitSharing
        ) {
            Toast.show({
                type: 'error',
                text1: 'Please Enter Value'
            })
        }
        else {

            const response = await sendpartnershiprequestforagent(data)

            if (response?.status) {
                Toast.show({
                    type: 'success',
                    text1: response.message
                })
                handleModalView()
            } else {
                let type = typeof (response.message)
                if (type === 'string') {
                    Toast.show({
                        type: 'error',
                        text1: response.message
                    })
                } else {
                    let repMSG = JSON.parse(JSON.stringify(response.message))[0].msg
                    Toast.show({
                        type: 'error',
                        text1: repMSG
                    })
                }
                handleModalView()
            }

        }

    }

    return (
        <Pressable
            style={styles.modalContainer}
            onPress={() => handleModalView()}
        >
            <Pressable style={styles.modalView}>
                <Text style={styles.modalTitle}>
                    How would you like to Partner up
                </Text>

                <View style={styles.radioContainer}>
                    <TouchableOpacity style={styles.radioBTN} onPress={() => setRadioValue('PS')}>
                        <Fontisto name={radioValue === 'PS' ? "radio-btn-active" : "radio-btn-passive"} size={30} color={Colors.black} />
                        <Text style={styles.radioBTNText}>Profit Sharing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.radioBTN} onPress={() => setRadioValue('FP')}>
                        <Fontisto name={radioValue === 'FP' ? "radio-btn-active" : "radio-btn-passive"} size={30} color={Colors.black} />
                        <Text style={styles.radioBTNText}>Fixed Price</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.lineView} />

                {
                    radioValue === 'PS' ?
                        <View>
                            <Text_Input
                                placeholder={'% Per Billing'}
                                keyboardType={'numeric'}
                                entered_data={(text) => setProfitSharing(text)}
                            />
                            <Text style={{ color: Colors.red }}>
                                {
                                    profitSharing > 100 ?
                                        'Not more than 100%'
                                        :
                                        null
                                }
                            </Text>
                            <LoginBTN title={'Submit'} handleBTN={() => handleSendReqBTN()} />
                        </View>
                        : radioValue === 'FP' ?
                            <View>
                                <Text_Input
                                    placeholder={'₹ Per Coupon Shared'}
                                    keyboardType={'numeric'}
                                    entered_data={(text) => setFixedPrice(text)}
                                />
                                <LoginBTN title={'Submit'} handleBTN={() => handleSendReqBTN()} />
                            </View>
                            :
                            <View />
                }

            </Pressable>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: responsivePadding(20),
        justifyContent: 'center',
    },
    modalView: {
        width:'95%',
        alignSelf:'center',
        backgroundColor: Colors.white,
        padding: responsivePadding(15),
        borderRadius: responsivePadding(7),
        paddingVertical: responsivePadding(20),
        justifyContent: 'space-evenly',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
          width: 0,
          height: responsivePadding(2),
        },
        shadowRadius: responsivePadding(3),
        elevation: responsivePadding(10),
    },
    modalTitle: {
        textAlign: 'center',
        fontSize: FontSize.fontSize17,
        width: '90%',
        color: Colors.dark_black,
        alignSelf: 'center'
    },
    radioContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: responsivePadding(20),
    },
    lineView: {
        height: 1,
        backgroundColor: Colors.black,
        marginTop: responsivePadding(10),
        marginBottom: responsivePadding(20),
    },
    radioBTN: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioBTNText: {
        paddingLeft: responsivePadding(5),
    },

})