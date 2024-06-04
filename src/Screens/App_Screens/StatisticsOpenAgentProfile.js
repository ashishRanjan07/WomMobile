import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppHeader from '../../Component/AppHeader';
import Colors from '../../Theme/Colors';
import { FontSize } from '../../Theme/Fonts';

export default function StatisticsOpenAgentProfile({ route, navigation }) {

    const data = route.params.e;
    const title = "Your Partners";
    const leftIconText = "Back";

    const leftIconBTN = () => {
        navigation.goBack()
    }

    const leftIcon = <Ionicons name="chevron-back-outline" size={25} color="#fff" />;

    return (
        <View>
            <AppHeader title={title} leftIconBTN={leftIconBTN} leftIcon={leftIcon} leftIconText={leftIconText} />

            <ScrollView>
                <View style={styles.card}>
                    <View style={styles.top}>
                        <Image source={require("../../Assets/Images/man.png")} style={styles.imageStyle} />
                        <View style={{ paddingLeft: 10, justifyContent: 'space-evenly' }}>
                            <Text style={styles.companyName}>{data.agent_id.occupation}</Text>
                            <Text>Occupation: {data.agent_id.occupation}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
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
    top: {
        flex: 1,
        flexDirection: 'row',
    },
    imageStyle: {
        height: 100,
        width: 100
    },
    companyName: {
        fontSize: FontSize.fontSize20,
        color: Colors.select_login_button,
        fontWeight: 'bold',
        // marginTop: 50,
    },
    industryName: {
        color: Colors.black,
        fontSize: FontSize.fontSize18,
        marginTop: 20,
        marginBottom: 30,
    },
})