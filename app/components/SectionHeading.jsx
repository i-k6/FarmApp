import { View, Text } from 'react-native';
import React from 'react';

export default function SectionHeading({ Heading }) {
  return (
    <View>
      <Text style={{
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold', // Set fontWeight to bold
      }}>{Heading}</Text>
    </View>
  );
}
