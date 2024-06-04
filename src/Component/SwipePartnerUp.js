import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { RectButton } from 'react-native-gesture-handler'
import SwipeablePartnerUp from './SwipeablePartnerUp'

function SwipePartnerUp({ data, currentIndex, handleLike, handlePass, swipesRef, viewType }) {
    const [willLike, setWillLike] = useState(false)
    const [willPass, setWillPass] = useState(false)
    const renderLeftActions = () => {
        return (
            <RectButton style={styles.container}>
                <SwipeablePartnerUp data={data[currentIndex + 1]} viewType={viewType}></SwipeablePartnerUp>
            </RectButton>
        )
    }
    const renderRightActions = () => {
        return (
            <RectButton style={styles.container}>
                <SwipeablePartnerUp data={data[currentIndex + 1]} viewType={viewType}></SwipeablePartnerUp>
            </RectButton>
        )
    }

    return (
        <Swipeable
            ref={swipesRef}
            friction={2}
            leftThreshold={40}
            rightThreshold={40}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            onSwipeableLeftOpen={() => {
                setWillLike(false)
                handleLike()
            }}
            onSwipeableRightOpen={() => {
                setWillPass(false)
                handlePass()
            }}
            onSwipeableLeftWillOpen={() => setWillLike(true)}
            onSwipeableRightWillOpen={() => setWillPass(true)}
        >
            <SwipeablePartnerUp data={data[currentIndex]} willLike={willLike} willPass={willPass} viewType={viewType} />
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default React.forwardRef((props, ref) => <SwipePartnerUp swipesRef={ref} {...props}></SwipePartnerUp>)