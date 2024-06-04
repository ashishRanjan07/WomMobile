import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, ScrollView, Pressable, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getCoupontype } from '../API_Services/org_API';

import Colors from '../Theme/Colors';
import { FontSize } from '../Theme/Fonts';
import LoginBTN from './LoginBTN'


export default function ModeDropDownComp({ tittle, handleBTN }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [modeType, setModeType] = useState(['Agent', 'ORG'])
    const [selectedValue, setSelectedValue] = useState('ORG')

    const handleApply = () => {
        setModalVisible(!modalVisible)
        handleBTN(selectedValue)
    }


    return (
        <View>
            <TouchableOpacity style={styles.outerComp} onPress={() => setModalVisible(true)}>
                <Text>{tittle}</Text>
                <FontAwesome name={'chevron-down'} color={Colors.black} size={20} style={{ paddingLeft: 7 }} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <Pressable style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
                    <Pressable style={styles.modalView}>
                        <View>
                            <Text style={styles.modalTittle}>{tittle}</Text>
                            <View style={styles.lineComp} />
                        </View>

                        <ScrollView style={{ marginTop: 10 }}>
                            {
                                modeType.map((e, key) =>
                                    <View key={key}
                                        style={{
                                            padding: 5,
                                            // paddingHorizontal: 20, 
                                            // paddingVertical: 15
                                        }}
                                    >
                                        <Pressable onPress={() => setSelectedValue(e)}
                                            style={{
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                paddingLeft: 10,
                                            }}>
                                            <Ionicons name={selectedValue === e ? "radio-button-on" : "radio-button-off"} color={Colors.black} size={30} />
                                            <Text style={{
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10,
                                                padding: 10,
                                                // color: Colors.white,
                                                fontWeight: '500',
                                                fontSize: FontSize.fontSize18
                                            }}>{e}</Text>
                                        </Pressable>
                                    </View>
                                )
                            }
                        </ScrollView>

                        <View style={styles.lineComp} />
                        <View style={styles.BottomContainer}>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.cancelBTN}>
                                <Text style={{ color: Colors.red_light, fontWeight: 'bold' }}>CANCEL</Text>
                            </TouchableOpacity>
                            <View style={{ width: Dimensions.get('screen').width * 0.4 }}>
                                <LoginBTN title={'APPLY'} handleBTN={() => handleApply()} />
                            </View>
                        </View>

                    </Pressable>
                </Pressable>
            </Modal>


        </View>
    )
}


const styles = StyleSheet.create({
    outerComp: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderColor: '#E8E8E8',
        padding: 10,
        borderRadius: 7,
        borderWidth: 2,
        margin: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalView: {
        backgroundColor: Colors.white,
        marginTop: Dimensions.get('screen').height * 0.3,
        height: Dimensions.get('screen').height * 0.7,
        elevation: 10,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    modalTittle: {
        padding: 15,
        fontWeight: 'bold',
        fontSize: FontSize.fontSize20,
        paddingLeft: 20,
    },
    lineComp: {
        backgroundColor: '#E8E8E8',
        height: 1.5
    },
    BottomContainer: {
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    cancelBTN: {
        width: Dimensions.get('screen').width * 0.4,
        justifyContent: 'center',
        alignItems: 'center'
    }
})