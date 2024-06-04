import React from 'react'
import Toast from 'react-native-toast-message'

export default function ToastSet() {
    return (
        <Toast ref={(e) => { Toast.setRef(e) }} />
    )
}