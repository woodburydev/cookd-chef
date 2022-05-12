import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from 'src/config/styles';

export default function FavoriteCuisines() {
  return (
    <View style={commonStyles.FlexColCenterCenter}>
      <Text>Favorite Cuisines</Text>
    </View>
  );
}
