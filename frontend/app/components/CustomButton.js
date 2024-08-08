import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { Theme } from '../styling/Theme';

export default function CustomButton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: Theme.colors.primary,
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: Theme.colors.background,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}