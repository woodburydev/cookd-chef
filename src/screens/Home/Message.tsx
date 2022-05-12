import React from 'react';
import {View, Text} from 'react-native';
import {commonStyles} from 'src/config/styles';

export default function Message() {
  return (
    <View style={commonStyles.FlexColCenterCenter}>
      <Text>Message</Text>
    </View>
  );
}
