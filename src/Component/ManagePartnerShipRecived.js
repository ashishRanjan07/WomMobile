import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet, Image, Dimensions, TouchableOpacity, Modal, TextInput } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import Colors from '../Theme/Colors'
import SelectDeclineRequest from './SelectDeclineRequest';


export default function ManagePartnerShipRecived({ receivedRequestList, requestAccept, requestWidrawBTN, RFPlease }) {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedID, setSelectedID] = useState([]);

    const handleAccept = (e) => {
        // console.log('handleAccept', e)
        requestAccept(e)
    }

    const openModalComp = (e) => {
        setSelectedID(e)
        setModalVisible(!modalVisible)
    }

    const handleWidrawModal = (cancelResion, validity) => {
        requestWidrawBTN(selectedID, cancelResion, validity)
        RFPlease()
    }

    const handleModalVisible = () => {
        setModalVisible(!modalVisible)
        RFPlease()
    }

    return (
        <View>
            {
                receivedRequestList.map((e, key) => (
                    <View key={key}>
                        <View style={styles.container} >
                            <View style={styles.firstComp}>
                                <TouchableOpacity style={styles.oneFirstComp} onPress={() => navigation.navigate('OpenCompanyProfile', { e })}>
                                    <Image source={{ uri: "https://picsum.photos/200" }} style={styles.imageComp} />
                                </TouchableOpacity>
                                <View style={styles.twoFirstComp}>
                                    <Text style={{ fontWeight: 'bold', color: Colors.black }}>
                                        {/* Name Here */}
                                        {e.user_type === 'organisation' ? e.org_id.name : e.agent_id.name}
                                    </Text>
                                    {/* <Text>{e.org_id.about}</Text> */}
                                    {/* <Text>{e.org_id.area}</Text> */}
                                    <Text>{e.user_type}</Text>
                                </View>
                            </View>

                            <View style={styles.secondComp}>
                                <TouchableOpacity style={styles.btnComp} onPress={() => openModalComp(e)}>
                                    <Entypo name="cross" size={30} color="#EF4948" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnComp} onPress={() => handleAccept(e)}>
                                    <MaterialIcons name="done" size={30} color="#20C393" />
                                </TouchableOpacity>
                            </View>

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <SelectDeclineRequest data={selectedID} modalView={() => handleModalVisible()} handleWidrawModal={handleWidrawModal} />
                            </Modal>


                        </View>
                        <View style={{ height: 1, backgroundColor: Colors.managePartnerShipTopBarBackground }} />
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    firstComp: {
        // backgroundColor: 'red',
        width: '65%',
        flexDirection: 'row',
        // marginBottom: 10,
    },
    oneFirstComp: {},
    twoFirstComp: {
        paddingLeft: 10,
    },
    secondComp: {
        // backgroundColor: 'pink',
        width: '35%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageComp: {
        height: 40,
        width: 40,
        borderRadius: 50,
    },
    btnComp: {
        padding: 5,
        borderRadius: 100,
        backgroundColor: Colors.white,
        elevation: 3,
        marginHorizontal: 7
    },
})