import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Dimensions, } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Colors from '../Theme/Colors';
import { FontSize } from '../Theme/Fonts';

export default function StatsticsAgentViewTYPE({ title, data }) {

    const navigation = useNavigation();

    const touch_button = (e) => {
        // navigation.navigate('StatisticsOpenAgentProfile', { e })
    }

    return (
        <View>
            {
                data.length > 0 ?
                    <View>
                        {
                            data.map((e, key) => (
                                <View key={key} style={styles.listContainer}>

                                    {/* <Text style={styles.industry_title_Style}>
                                        {e._id}
                                    </Text> */}

                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        {e.partnership.agents.map((e, key2) => (
                                            <Pressable key={key2} style={styles.card} onPress={() => touch_button(e)}>
                                                <View style={styles.imageContainer}>
                                                    <Image
                                                        // source={e.image}
                                                        source={require('../Assets/Images/man.png')}
                                                        // source={e.images ? require('../../Assets/Images/man.png') : e.images}
                                                        style={styles.imageStyle} />
                                                </View>

                                                <View style={styles.detailsContainer}>
                                                    <Text style={styles.CcpmanyName}>
                                                        {e.agent_id.name}
                                                    </Text>

                                                    <View style={styles.detailsText}>
                                                        <Text style={styles.bottomText}>Area : </Text>
                                                        <Text style={styles.bottomText}>
                                                            {e.agent_id.occupation}
                                                        </Text>
                                                    </View>

                                                </View>
                                            </Pressable>
                                        ))}
                                    </ScrollView>

                                </View>

                            ))
                        }
                    </View>
                    :
                    <Text style={styles.NotDataAvailable}>Partnership with {title} not Available</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        margin: 10,
    },
    industry_title_Style: {
        color: Colors.blackDark,
        fontWeight: 'bold',
    },
    imageStyle: {
        height: Dimensions.get('screen').width * 0.2,
        width: Dimensions.get('screen').width * 0.2,
    },
    card: {
        backgroundColor: Colors.white,
        elevation: 3,
        borderRadius: 10,
        width: Dimensions.get('screen').width * 0.85,
        // height: Dimensions.get('screen').height * 0.15,
        // justifyContent: 'space-evenly',
        flexDirection: 'row',
        margin: 7,
        padding: 7,
    },
    bottomText: {
        fontSize: FontSize.fontSize10,
    },
    CcpmanyName: {
        fontSize: FontSize.fontSize20,
        color: Colors.black,
        flexShrink: 1,
        // paddingLeft: 10,
    },
    detailsContainer: {
        paddingLeft: 10,
        justifyContent: 'space-evenly'
    },
    detailsText: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    NotDataAvailable: {
        paddingVertical: 20,
        fontWeight: '500',
        height: Dimensions.get('screen').width / 2,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})