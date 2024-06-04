import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

import Colors from '../Theme/Colors'
import DiscountFreeSampleOne from './DiscountFreeSampleOne';
import DiscountFreeSampleTwo from './DiscountFreeSampleTwo';
import LoginBTN from './LoginBTN';
import Text_Input from './Text_Input';
import { addCoupon, addpartnershiprequired, getalltemplate } from '../API_Services/org_API';
import { ImageURL } from '../API_Services/server_Address';

export default function FreeSampleCouponComponent({ templateID, coupon_type, APItype }) {

    const navigation = useNavigation();
    const [templateName, setTemplateName] = useState()

    const dropdown = [{ "_id": "1", "title": "%", }, { "_id": "2", "title": "₹", }]

    const [tagLine, setTagLine] = useState()
    const [termsAndConditions, setTermsAndConditions] = useState()

    const [fieldOne, setFieldOne] = useState()
    const [fieldTwo, setFieldTwo] = useState()

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
        } else if (!termsAndConditions) {
            Toast.show({
                type: 'error',
                text1: 'Please Fill Terms and Conditions'
            })
        } else {

            if (templateName === 'buy_get') {
                if (!fieldOne) {
                    Toast.show({
                        type: 'error',
                        text1: 'Please Enter First Value'
                    })
                } else if (!fieldTwo) {
                    Toast.show({
                        type: 'error',
                        text1: 'Please Enter Second Value'
                    })
                } else {
                    const data = new FormData()
                    data.append('template_id', templateID);
                    data.append('coupon_type', coupon_type);
                    data.append('template_name', templateName);
                    data.append('marketing_line', tagLine);
                    data.append('terms_and_conditions', termsAndConditions);
                    data.append('field_one', fieldOne);
                    data.append('field_two', fieldTwo);

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
            } else {
                const data = new FormData()
                data.append('template_id', templateID);
                data.append('coupon_type', coupon_type);
                data.append('template_name', templateName);
                data.append('marketing_line', tagLine);
                data.append('terms_and_conditions', termsAndConditions);

                const response = await addCoupon(data)

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
                                                        height: 115,
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

            {
                templateName === 'buy_get' ?
                    <>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ width: '70%' }}>
                                <Text_Input placeholder={'First Value'} keyboardType={'numeric'} entered_data={(e) => setFieldOne(e)} />
                            </View>
                            <View style={{ width: '30%' }}>
                                <SelectDropdown
                                    data={dropdown}
                                    onSelect={(selectedItem, index) => {
                                        console.log('selectedItem', selectedItem.title);
                                        // setIndustry_id(selectedItem._id)
                                    }}
                                    defaultButtonText={'Type'}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem.title;
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item.title;
                                    }}
                                    buttonStyle={styles.dropdown1BtnStyle}
                                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={Colors.black} size={20} />;
                                    }}
                                    dropdownIconPosition={'right'}
                                    dropdownStyle={styles.dropdown1DropdownStyle}
                                    rowStyle={styles.dropdown1RowStyle}
                                    rowTextStyle={styles.dropdown1RowTxtStyle}
                                    selectedRowStyle={styles.dropdown1SelectedRowStyle}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ width: '70%' }}>
                                <Text_Input placeholder={'Second Value'} keyboardType={'numeric'} entered_data={(e) => setFieldTwo(e)} />
                            </View>
                            <View style={{ width: '30%' }}>
                                <SelectDropdown
                                    data={dropdown}
                                    onSelect={(selectedItem, index) => {
                                        console.log('selectedItem', selectedItem.title);
                                        // setIndustry_id(selectedItem._id)
                                    }}
                                    defaultButtonText={'Type'}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem.title;
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item.title;
                                    }}
                                    buttonStyle={styles.dropdown1BtnStyle}
                                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={Colors.black} size={20} />;
                                    }}
                                    dropdownIconPosition={'right'}
                                    dropdownStyle={styles.dropdown1DropdownStyle}
                                    rowStyle={styles.dropdown1RowStyle}
                                    rowTextStyle={styles.dropdown1RowTxtStyle}
                                    selectedRowStyle={styles.dropdown1SelectedRowStyle}
                                />
                            </View>
                        </View>
                    </>
                    : <></>
            }

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


const styles = StyleSheet.create({
    // dropdown menu start
    dropdown1BtnStyle: {
        // margin: 10,
        marginVertical: 10,
        width: '90%',
        backgroundColor: Colors.lightgrey,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.border_color,
        alignSelf: 'flex-end'
    },
    dropdown1BtnTxtStyle: {
        color: Colors.black,
        textAlign: 'left'
    },
    dropdown1DropdownStyle: {
        backgroundColor: Colors.lightgrey,
    },
    dropdown1RowStyle: {
        backgroundColor: Colors.lightgrey,
        borderBottomColor: Colors.border_color,
    },
    dropdown1RowTxtStyle: {
        color: Colors.black,
        textAlign: 'auto'
    },
    dropdown1SelectedRowStyle: {
        backgroundColor: Colors.border_color
    },
    dropdown1searchInputStyleStyle: {
        backgroundColor: Colors.lightgrey,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border_color,
    },
    // dropdown menu close
})