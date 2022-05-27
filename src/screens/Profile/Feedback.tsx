import {Button, Input, Text} from '@rneui/themed';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {commonStyles} from 'src/config/styles';

export default function Feedback() {
  return (
    <ScrollView>
      <View style={commonStyles.FlexColCenterStart}>
        <View style={[commonStyles.mt30, styles.HeaderArea]}>
          <Text type="description">
            If you would like to leave a suggestion or feedback on how we are
            doing on how we can make your experience with cookd better we would
            love to hear your input.
          </Text>
        </View>
        <View style={[commonStyles.mt30, styles.LowerArea]}>
          <Input
            inputContainerStyle={styles.InputContainerStyle}
            inputStyle={{margin: 10}}
            maxLength={150}
            multiline={true}
            shake={() => null}
          />
        </View>
        <Button title="Submit" style={commonStyles.mt30} />
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  HeaderArea: {
    width: '80%',
  },
  LowerArea: {
    width: '90%',
  },
  InputContainerStyle: {
    height: 200,
    alignItems: 'flex-start',
  },
});
