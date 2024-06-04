import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'

export default function AddDisImage() {
    return (
        <View style={styles.Container}>
            <Image source={{ uri: "https://picsum.photos/200" }} style={styles.imageView} />
            <Image source={{ uri: "https://picsum.photos/200" }} style={styles.imageView} />
            <Image source={{ uri: "https://picsum.photos/200" }} style={styles.imageView} />
            <Image source={{ uri: "https://picsum.photos/200" }} style={styles.imageView} />
            <Image source={{ uri: "https://picsum.photos/200" }} style={styles.imageView} />
            <Image source={{ uri: "https://picsum.photos/200" }} style={styles.imageView} />
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-evenly',
    },
    imageView: {
        width: Dimensions.get('screen').width * 0.2,
        height: Dimensions.get('screen').width * 0.2,
        margin: 5,
        borderRadius: 8,
    }
})