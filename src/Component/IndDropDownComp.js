import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, ScrollView, Pressable } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { getAllIndustry } from '../API_Services/org_API';

import Colors from '../Theme/Colors';
import { FontSize } from '../Theme/Fonts';
import LoginBTN from './LoginBTN'

export default function IndDropDownComp({ tittle, handleBTN }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [industryList, setIndustryList] = useState([])
    const [selectedValue, setSelectedValue] = useState([])

    useEffect(() => {
        setTimeout(() => {
            getIndustry()
        }, 1000);
    }, []);

    const getIndustry = async () => {
        const resp = await getAllIndustry()
        setIndustryList(resp.data)
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

                        <ScrollView>
                            {
                                industryList.map((e, key) =>
                                    <View key={key} style={{ padding: 7 }}>
                                        <Pressable onPress={() => valuePicker(e._id)} style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <MaterialIcons
                                                name={
                                                    // selectedValue == e._id ? 'check-box' : 'check-box-outline-blank'
                                                    selectedValue.includes(e._id) ? "check-box" : "check-box-outline-blank"
                                                }
                                                color={Colors.black} size={30} style={{ paddingHorizontal: 10 }} />
                                            <Text>{e.title}</Text>
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