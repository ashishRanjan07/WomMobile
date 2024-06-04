import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Colors from '../Theme/Colors';
import {responsiveFontSize, responsivePadding} from './Responsive';

export default function LoginBTN({title, handleBTN}) {
  const handleClick = () => {
    handleBTN();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => handleClick()}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.select_login_button,
    padding: responsivePadding(10),
    borderRadius: responsivePadding(7),
    elevation: 5,
  },
  textStyle: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
  },
});
