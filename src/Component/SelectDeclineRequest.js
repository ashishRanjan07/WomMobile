import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Colors from '../Theme/Colors'
import { FontSize } from '../Theme/Fonts';
import LoginBTN from './LoginBTN';

export default function SelectDeclineRequest({ modalView, handleWidrawModal }) {

    const [radioValue, setRadioValue] = useState()

    const [cancelResion, setCancelResion] = useState()
    const [validity, setValidity] = useState(null)

    const handleWidraw = async () => {
        modalView()
        handleWidrawModal(cancelResion, validity)
    }

    return (
        <Pressable
            style={{
                flex: 1,
                padding: 20,
                justifyContent: 'center',
            }}
            onPress={() => modalView()}
        >
            <Pressable style={{
                backgroundColor: Colors.white,
                elevation: 10,
                padding: 15,
                borderRadius: 7,
                // height: Dimensions.get('screen').width,
                justifyContent: 'space-evenly',
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: FontSize.fontSize17,
                    width: '70%',
                    color: Colors.black,
                    alignSelf: 'center'
                }}>Why are you Declining this Request</Text>

                <View style={{
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 20,
                }}>
                    <TouchableOpacity style={styles.radioBTN} onPress={() => setRadioValue('m')}>
                        <Fontisto name={radioValue === 'm' ? "radio-btn-active" : "radio-btn-passive"} size={30} color={Colors.black} />
                        <Text style={styles.radioBTNText}>Months</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.radioBTN} onPress={() => setRadioValue('o')}>
                        <Fontisto name={radioValue === 'o' ? "radio-btn-active" : "radio-btn-passive"} size={30} color={Colors.black} />
                        <Text style={styles.radioBTNText}>Other</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 1, backgroundColor: Colors.border_color, marginTop: 10 }} />

                {
                    radioValue === 'm' ?
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            paddingVertical: 10,
                        }}>
                            <TouchableOpacity style={styles.monthBTN} onPress={() => setValidity(1)}>
                                <FontAwesome name={validity === 1 ? "check-square" : "square-o"} size={30} color={Colors.black} />
                                <Text style={styles.monthBTNText}>1 Month</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.monthBTN} onPress={() => setValidity(3)}>
                                <FontAwesome name={validity === 3 ? "check-square" : "square-o"} size={30} color={Colors.black} />
                                <Text style={styles.monthBTNText}>3 Months</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.monthBTN} onPress={() => setValidity(6)}>
                                <FontAwesome name={validity === 6 ? "check-square" : "square-o"} size={30} color={Colors.black} />
                                <Text style={styles.monthBTNText}>6 Months</Text>
                            </TouchableOpacity>
                        </View>
                        : radioValue === 'o' ?
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(e) => setCancelResion(e)}
                                placeholder={'Write your feedback'}
                                textAlignVertical={"top"}
                                numberOfLines={5}
                                multiline
                            />
                            :
                            <View />
                }

                <LoginBTN title={'Submit'} handleBTN={() => handleWidraw()} />

            </Pressable>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    inputStyle: {
        marginTop: Dimensions.get('window').width * 0.05,

        borderColor: Colors.border_color,
        backgroundColor: Colors.lightgrey,
        borderWidth: 1,
        letterSpacing: 0.5,
        paddingLeft: 10,
        borderRadius: 5,

        // flex: 1,
        flexWrap: "wrap",
        overflow: "scroll"

    },
    radioBTN: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioBTNText: {
        paddingLeft: 5,
    },
    monthBTN: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    monthBTNText: {
        paddingLeft: 5,
    }
})