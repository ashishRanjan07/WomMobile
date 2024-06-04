import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

import { addCoupon, addpartnershiprequired, getalltemplate } from '../API_Services/org_API';
import Colors from '../Theme/Colors'
import DiscountBrandAwarenessPamphletOne from './DiscountBrandAwarenessPamphletOne';
import DiscountBrandAwarenessPamphletTwo from './DiscountBrandAwarenessPamphletTwo';
import LoginBTN from './LoginBTN';
import Text_Input from './Text_Input';
import { ImageURL } from '../API_Services/server_Address';


export default function BrandAwarenessCouponCOomponent({ templateID, coupon_type, APItype }) {

    const navigation = useNavigation();
    const [templateName, setTemplateName] = useState()
    const [phoneNumber, setPhoneNumber] = useState()


    const [tagLine, setTagLine] = useState()
    const [termsAndConditions, setTermsAndConditions] = useState()

    const [tempLoading, setTempLoading] = useState(true)
    const [tempList, setTempList] = useState([])

    useEffect(() => {
        getTemp()
    }, []);

    const getTemp = async () => {
        let response = await getalltemplate()

        if (response.status) {
            setTempList(response.data)
            setTempLoading(false)
        }

    }

    const handleCreateBTN = async () => {

        if (!templateName) {
            Toast.show({
                type: 'error',
                text1: 'Please Select a Template'
            })
        } else if (!tagLine) {
            Toast.show({
                type: 'error',
                text1: 'Please Enter Offer TagLine'
            })
        } else if (!phoneNumber) {
            Toast.show({
                type: 'error',
                text1: 'Please Enter Phone Number'
            })
        }
        else if (!termsAndConditions) {
            Toast.show({
                type: 'error',
                text1: 'Please Fill Terms and Conditions'
            })
        } else {

            const data = new FormData()
            data.append('template_id', templateID);
            data.append('coupon_type', coupon_type);
            data.append('template_name', templateName);
            data.append('phone', phoneNumber);
            data.append('marketing_line', tagLine);
            data.append('terms_and_conditions', termsAndConditions);

            if (APItype === 'Offer') {
                const response = await addCoupon(data)
                if (!response.status) {
                    Toast.show({
                        type: 'error',
                        text1: response.message
                    })
                } else {
                    Toast.show({
                        type: 'success',
                        text1: response.message
                    })
                    navigation.navigate('CompanyProfile')
                }
            }
            else {
                const response = await addpartnershiprequired(data)
                if (!response.status) {
                    Toast.show({
                        type: 'error',
                        text1: response.message
                    })
                } else {
                    Toast.show({
                        type: 'success',
                        text1: response.message
                    })
                    navigation.navigate('CompanyProfile')
                }
            }

        }

    }

    return (
        <View>
            <Text style={{ color: Colors.blackDark }}>Select Template</Text>

            <View>

                {
                    tempList.map((e, key1) => (
                        <ScrollView key={key1} horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingVertical: 15 }}>
                            {e.coupon_type === coupon_type ?
                                <>
                                    {
                                        e.templates.map((f, key) => (
                                            <TouchableOpacity key={key} onPress={() => setTemplateName(f.template_name)}>
                                                <Fontisto name={templateName === f.template_name ? "radio-btn-active" : "radio-btn-passive"} size={30} color={Colors.black} />
                                                <Image
                                                    source={{ uri: ImageURL + f.template_url }}
                                                    style={{
                                                        width: 320,
                                                        height: 335,
                                                        marginVertical: 10,
                                                        marginHorizontal: 5,
                                                        padding: 10,
                                                    }} />
                                            </TouchableOpacity>
                                        ))
                                    }
                                </>
                                : <></>
                            }
                        </ScrollView>
                    ))
                }

            </View>

            <Text_Input placeholder={'Offer Tagline'} entered_data={(e) => setTagLine(e)} maxLength={20} />

            <Text_Input placeholder={'Phone Nmber'} keyboardType={'numeric'} entered_data={(e) => setPhoneNumber(e)} />

            <Text_Input placeholder={'Terms & Conditions'} entered_data={(e) => setTermsAndConditions(e)} numberOfLines={5} multiline textAlignVertical={"top"} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <View style={{ width: Dimensions.get('screen').width * 0.45 }}>
                    <LoginBTN title={'Cancel'} handleBTN={() => navigation.goBack()} />
                </View>
                <View style={{ width: Dimensions.get('screen').width * 0.45 }}>
                    <LoginBTN title={'Create'} handleBTN={() => handleCreateBTN()} />
                </View>
            </View>

        </View>
    )
}