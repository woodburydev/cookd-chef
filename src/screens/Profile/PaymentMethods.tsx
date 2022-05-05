import React from 'react';
import {View, Text} from 'react-native';
import {commonStyles} from 'src/config/styles';

export default function PaymentMethods() {
  return (
    <View style={commonStyles.FlexColCenterCenter}>
      <Text>Payment Methods</Text>
    </View>
  );
}
