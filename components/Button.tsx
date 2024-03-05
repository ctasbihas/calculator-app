import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = ({
  text,
  buttonStyle,
  textStyle,
  onPress
}: {
  text: string | number;
  buttonStyle?: any;
  textStyle?: any;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.button,
        buttonStyle,
        text === '+' && {height: 95},
        text === '=' && {height: 95, marginTop: -35},
      ]}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#303136',
  },
  buttonText: {
    color: '#29A8FF',
    fontSize: 26,
  },
});
