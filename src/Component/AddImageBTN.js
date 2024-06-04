import React, { useState, useEffect, useCallback } from 'react'
import { TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native'

import * as ImagePicker from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../Theme/Colors';

export default function AddImageBTN({ newIMGURI, imageLink }) {

    const [response, setResponse] = useState(null)
    const [imgURI, setImgURI] = useState(null)

    useEffect(() => {
        if (imageLink) {
            setImgURI(imageLink);
        }
    }, [imageLink]);

    const onButtonPress = async (options) => {
        const result = await ImagePicker.launchImageLibrary(options)
        // const result = await ImagePicker.launchCamera(options)
        // console.log('result', result.assets[0].uri)
        setResponse(result)
        setImgURI(result.assets[0].uri)
        newIMGURI(result.assets[0])
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => onButtonPress()} >

            {
                imgURI ?
                    <Image source={{
                        uri: imgURI,
                        width: Dimensions.get('screen').width * 0.4,
                        height: Dimensions.get('screen').width * 0.4,
                    }}
                        style={{ borderRadius: 1000 }}
                    />
                    :
                    <Entypo name="plus" size={Dimensions.get('screen').width * 0.3} color={Colors.plusIcon} style={{ padding: 5 }} />
            }


        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        margin: 15,
        borderRadius: 1000,
        borderWidth: 0.5,
        borderColor: Colors.black,
        backgroundColor: Colors.white,
        elevation: 5,
    },
})