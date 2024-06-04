import React, { useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppHeader from '../../Component/AppHeader';
import Colors from '../../Theme/Colors';
import { FontSize } from '../../Theme/Fonts';


export default function OpenCompanyProfile({ navigation, route }) {

    const data = route.params.e

    const title = "Company Profile";
    const leftIconText = "Back";
    const leftIconBTN = () => {
        navigation.goBack()
    }
    const leftIcon = <Ionicons name="chevron-back-outline" size={25} color="#fff" />;

    return (
        <ScrollView>
            <AppHeader title={title} leftIconBTN={leftIconBTN} leftIcon={leftIcon} leftIconText={leftIconText} />

            <View style={styles.card}>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require("../../Assets/Images/man.png")} style={styles.imageStyle} />
                    {/* <Image source={{ uri: data.image }} style={styles.imageStyle} /> */}

                    {/* <Text style={styles.companyName}>{JSON.stringify(data)}</Text> */}
                    <Text style={styles.companyName}>{data.org_id.name}</Text>
                    <Text style={styles.industryName}>{data.org_id.about}</Text>
                    <Text style={styles.industryName}>{data.validity === null ? '1 Month Partnership Required' : `${data.validity} Month Partnership Required`}</Text>

                    <View style={{ height: 1, backgroundColor: Colors.black, marginVertical: 10, width: '100%' }} />
                </View>


                <View style={{ marginTop: 10, marginBottom: 20 }}>
                    <Text style={styles.PSOR}>Partnership Offers</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                        {data.org_id.partnership_offers.map((e, key) => (
                            <View key={key} style={styles.DisCardView}>
                                <Image source={{ uri: "https://picsum.photos/200", }} style={styles.DisCardImage} />
                                <Text style={styles.DisCardTitle}>{e.coupon_type}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.PSOR}>Partnership Required</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                        {data.org_id.partnership_required.map((e, key) => (
                            <View key={key} style={styles.DisCardView}>
                                <Image source={{ uri: "https://picsum.photos/200", }} style={styles.DisCardImage} />
                                <Text style={styles.DisCardTitle}>{e.coupon_type}</Text>
                            </View>
                        ))}
                    </View>

                </View>

            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: Colors.white,
        // justifyContent: 'center',
        // alignItems: 'center',
        margin: 10,
        marginVertical: 30,
        borderRadius: 20,
        elevation: 3,
        padding: 10,
        marginBottom: 100,
    },
    imageStyle: {
        height: 200,
        width: 200,
        marginTop: 20,
        borderRadius: 1000,
    },
    companyName: {
        fontSize: FontSize.fontSize22,
        color: Colors.blackDark,
        fontWeight: 'bold',
        marginTop: 20,
    },
    industryName: {
        color: Colors.black,
        fontSize: FontSize.fontSize18,
        marginVertical: 5,
    },
    PSOR: {
        paddingVertical: 10,
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: FontSize.fontSize18,
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