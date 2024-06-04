import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, Modal, Pressable } from 'react-native'
import Colors from '../Theme/Colors';
import { FontSize } from '../Theme/Fonts';

export default function SwipeablePartnerUp({ data, viewType }) {

    useEffect(() => {
        setPartnership_offers(data?.partnership_offers)
        setPartnership_required(data?.partnership_required)
    }, [])

    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState()

    const [partnership_offers, setPartnership_offers] = useState([])
    const [partnership_required, setPartnership_required] = useState([])

    const handleModalView = (e) => {
        setModalType(e)
        setModalVisible(true)
    }

    return (
        <ScrollView>
            <View style={styles.card}>
                <Image source={require("../Assets/Images/man.png")} style={styles.imageStyle} />

                <Text style={styles.companyName}>
                    {data?.name ? data?.name : ''}
                </Text>

                {
                    viewType === 'ORG'
                        ?
                        <Text style={styles.industryName}>{data?.industry_id.title ? data?.industry_id.title : ''}</Text>
                        :
                        null
                }

                <View style={{ height: 1, backgroundColor: Colors.black, marginBottom: 5, width: '100%' }} />

                {
                    viewType === 'ORG'
                        ?
                        <View style={styles.PartnershipContainer}>
                            <TouchableOpacity
                                // onPress={() => console.warn('1')}
                                onPress={() => handleModalView('Partnership Offers')}
                                style={[styles.bottomContainer, { backgroundColor: Colors.green }]}>
                                <Text style={{ color: Colors.white, fontSize: FontSize.fontSize16, padding: 20, textAlign: 'center' }}>Partnership Offers</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleModalView('Partnership Required')}
                                style={[styles.bottomContainer, { backgroundColor: Colors.blue }]}>
                                <Text style={{ color: Colors.white, fontSize: FontSize.fontSize16, padding: 20, textAlign: 'center' }}>Partnership Required</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <Text style={styles.occupationText}>{data?.occupation}</Text>
                }

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <Pressable style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
                        <Pressable style={styles.modalView}>
                            <Text style={styles.modalTitle}>{modalType}</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>


                                {
                                    modalType === 'Partnership Offers' ?
                                        <>
                                            {
                                                partnership_offers.map((e, key) => (
                                                    <View key={key} style={styles.DisCardView}>
                                                        <Image source={{ uri: "https://picsum.photos/200", }} style={styles.DisCardImage} />
                                                        <Text style={styles.DisCardTitle}>{e.coupon_type}</Text>
                                                    </View>
                                                ))
                                            }
                                        </>
                                        :
                                        modalType === 'Partnership Required' ?
                                            <>
                                                {
                                                    partnership_required.map((e, key) => (
                                                        <View key={key} style={styles.DisCardView}>
                                                            <Image source={{ uri: "https://picsum.photos/200", }} style={styles.DisCardImage} />
                                                            <Text style={styles.DisCardTitle}>{e.coupon_type}</Text>
                                                        </View>
                                                    ))
                                                }
                                            </>
                                            :
                                            <></>
                                }



                            </View>

                        </Pressable>
                    </Pressable>
                </Modal>

            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        // marginVertical: 30,
        borderRadius: 20,
        elevation: 7,
        padding: 10,
        // marginBottom: 100,
    },
    imageStyle: {
        height: Dimensions.get('screen').width * 0.6,
        width: Dimensions.get('screen').width * 0.6,
        marginTop: 20,
    },
    companyName: {
        fontSize: FontSize.fontSize22,
        color: Colors.select_login_button,
        fontWeight: 'bold',
        marginVertical: 25,
    },
    industryName: {
        color: Colors.black,
        fontSize: FontSize.fontSize18,
        marginBottom: 20,
    },
    PartnershipContainer: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
        marginVertical: 20,
    },
    bottomContainer: {
        padding: 5,
        width: '46%',
        borderRadius: 20,
    },
    occupationText: {
        marginTop: 20,
        marginBottom: 40,
        color: Colors.blackDark,
        fontSize: FontSize.fontSize16,
    },






    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: Colors.white,
        // padding: 15,
        paddingHorizontal: 15,
        paddingVertical: 20,
        elevation: 10,
        borderRadius: 10,
        width: Dimensions.get('screen').width * 0.95,
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: FontSize.fontSize20,
        marginBottom: 10,
    },
    DisCardView: {
        width: Dimensions.get('screen').width * 0.27,
        elevation: 5,
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100%',
    },
    DisCardImage: {
        width: Dimensions.get('screen').width * 0.2,
        height: Dimensions.get('screen').width * 0.2,
        margin: 10,
    },
    DisCardTitle: {
        // backgroundColor: 'red',
        width: '100%',
        paddingVertical: 7,
        paddingHorizontal: 5,
        // color: Colors.white,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        textAlign: 'center',
    }

})