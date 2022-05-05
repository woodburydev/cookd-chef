import React from 'react';
import {View} from 'react-native';
import {commonStyles} from 'src/config/styles';
import {Text} from '@rneui/base';

export default function Home() {
  return (
    <View style={commonStyles.FlexColCenterCenter}>
      <Text>Home</Text>
    </View>
  );
}
