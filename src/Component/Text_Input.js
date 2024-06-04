import React from 'react';
import {View, Text, TextInput, StyleSheet, Platform} from 'react-native';
import Colors from '../Theme/Colors';
import {responsiveFontSize, responsivePadding} from './Responsive';

export default function Text_Input({
  entered_data,
  children,
  placeholder,
  secureTextEntry,
  keyboardType,
  value,
  numberOfLines,
  multiline,
  textAlignVertical,
  maxLength,
}) {
  const handleChange = text => {
    entered_data(text);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputStyle}
        onChangeText={handleChange}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        numberOfLines={numberOfLines}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        maxLength={maxLength}
        placeholderTextColor={Colors.grey}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: responsivePadding(10),
  },
  inputStyle: {
    borderColor: Colors.border_color,
    backgroundColor: Colors.lightgrey,
    borderWidth: responsivePadding(1),
    letterSpacing: 0.5,
    borderRadius: responsivePadding(5),
    color: Colors.black,
    padding: responsivePadding(15),
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
  },
});
