import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'

import Colors from '../Theme/Colors'
import { resendpartnershiprequest, resend_agent_partnership_request } from '../API_Services/org_API';

export default function ManagePartnerShipSent({ sentRequestList, requestWidrawBTN, RFPlease }) {

    const navigation = useNavigation();

    const handleWidrow = (e) => {
        requestWidrawBTN(e)
    }

    const handleResendBTN = async (e) => {
        if (e.user_type === 'organisation') {
            handleResendORG(e)
        } else if (e.user_type === 'agent') {
            handleResendAgent(e)
        } else {
            Toast.show({
                type: 'error',
                text1: 'INVALD USER TYPE'
            })
        }
    }

    const handleResendORG = async (e) => {
        let id = e.org_id._id
        let req_id = e.requested_id
        const response = await resendpartnershiprequest(id, req_id)

        if (response.status) {
            RFPlease()
            Toast.show({
                type: 'success',
                text1: response.message
            })
            // navigation.goBack()
        } else {
            Toast.show({
                type: 'error',
                text1: response.message
            })
        }
    }

    const handleResendAgent = async (e) => {
        let id = e.agent_id._id
        let req_id = e.requested_id

        const response = await resend_agent_partnership_request(id, req_id)

        if (response.status) {
            RFPlease()
            Toast.show({
                type: 'success',
                text1: response.message
            })
            // navigation.goBack()
        } else {

            // setError(response.message)
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

        }
    }

    return (
        <View>
            {
                sentRequestList.map((e, key) => (
                    <View key={key}>
                        <View style={styles.container}>
                            <View style={{ width: '2%', backgroundColor: e.request_declined ? Colors.red : Colors.white }} />
                            <View style={{ width: '98%', flexDirection: 'row', paddingVertical: 10, paddingLeft: 5 }}>
                                <View style={styles.firstComp}>
                                    <TouchableOpacity style={styles.oneFirstComp} onPress={() => navigation.navigate('OpenCompanyProfile', { e })}>
                                        <Image source={{ uri: "https://picsum.photos/200" }} style={styles.imageComp} />
                                    </TouchableOpacity>
                                    {/* <Text>{e.user_type}</Text> */}
                                    <View style={styles.twoFirstComp}>
                                        <Text style={[styles.ContentText, { fontWeight: 'bold', color: Colors.black }]}>
                                            {e.user_type === 'organisation' ? e.org_id.name : e.agent_id.name}
                                        </Text>
                                        <Text style={styles.ContentText}>{e.user_type}</Text>
                                        <Text style={[styles.ContentText, { fontWeight: 'bold', color: Colors.black, paddingTop: 10, paddingBottom: 5 }]}>
                                            {e.declined_reason ? e.declined_reason : null}
                                        </Text>
                                    </View>
                                </View>


                                <View style={styles.secondComp}>
                                    <TouchableOpacity
                                        style={[styles.btnComp, { backgroundColor: e.request_declined ? Colors.resendBlue : Colors.black, }]}
                                        // onPress={() => handleWidrow(e)}
                                        onPress={() => { e.request_declined ? handleResendBTN(e) : handleWidrow(e) }}
                                    >
                                        <Text style={styles.btnText}>{e.request_declined ? '  Resend  ' : 'Withdraw'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
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
        // padding: 10,
        // paddingVertical: 5,
    },
    firstComp: {
        // backgroundColor: 'red',
        width: '65%',
        flexDirection: 'row',
        // marginBottom: 10,
    },
    oneFirstComp: {
        // backgroundColor: 'pink',
    },
    twoFirstComp: {
        paddingLeft: 10,
        width: '80%',
    },
    secondComp: {
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
        padding: 10,
        borderRadius: 10,
        elevation: 3,
    },
    btnText: {
        color: Colors.white,
        fontWeight: 'bold'
    },
    ContentText: {
        // backgroundColor: 'red',
    }
})