import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, ScrollView, Pressable, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { getCoupontype } from '../API_Services/org_API';

import Colors from '../Theme/Colors';
import { FontSize } from '../Theme/Fonts';
import LoginBTN from './LoginBTN'

export default function PRDropDownComp({ tittle, handleBTN }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [couponList, setCouponList] = useState([])
    const [selectedValue, setSelectedValue] = useState([])

    useEffect(() => {
        setTimeout(() => {
            GetCouponType()
        }, 1000);
    }, []);

    const GetCouponType = async () => {
        const resp = await getCoupontype()
        setCouponList(resp.data)
    }

    const valuePicker = (e) => {
        var updatedList = [...selectedValue];
        if (selectedValue.includes(e)) {
            updatedList.splice(selectedValue.indexOf(e), 1)
        } else {
            updatedList = [...selectedValue, e];
        }
        setSelectedValue(updatedList);
    }

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
                                couponList.map((e, key) =>
                                    <View key={key} style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                                        <Pressable onPress={() => valuePicker(e)}
                                            style={{
                                                // alignItems: 'center',
                                                // backgroundColor: 'red'
                                                elevation: 10,
                                                backgroundColor: Colors.white,
                                                // padding: 10,
                                                borderRadius: 10,
                                            }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                paddingHorizontal: 10,
                                                marginTop: 10,
                                            }}>
                                                <MaterialIcons name={selectedValue.includes(e) ? "check-box" : "check-box-outline-blank"} color={Colors.black} size={30} />
                                                <Image source={require("../Assets/Images/CouponIcon.png")} style={{ width: 80, height: 80 }} />
                                            </View>
                                            <Text style={{
                                                backgroundColor: Colors.red_light,
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10,
                                                padding: 10,
                                                color: Colors.white,
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