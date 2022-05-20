import { Text, Input, Button } from '@rneui/themed';
import React from 'react';
import { Dimensions, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppColorPalette, commonStyles } from 'src/config/styles';

const screenWidth = Dimensions.get('window').width;

export default function Invite() {
  return (
    <View style={[commonStyles.FlexColCenterCenter]}>
      <KeyboardAwareScrollView contentContainerStyle={[commonStyles.FlexColCenterCenter, { width: screenWidth }]} extraScrollHeight={50}>
        <KeyboardAvoidingView style={commonStyles.FlexColCenterCenter}>
          <View style={styles.contentContainer}>
            <Text style={commonStyles.mb30} centerText type="large-header">Email or Phone Number</Text>
            <Text style={commonStyles.mb30} type="description">Inviting a chef can give you a comission off thier first service they do over $400! See more details <Text style={{ textDecorationLine: 'underline', color: AppColorPalette.orange}}>here</Text></Text>
            <Input shake={() => null} />
          </View>
          <Button title="Submit" />
        </KeyboardAvoidingView>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: "80%",
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  screenContentContainer: {
    // AVOID DOING THIS BELOW, if the screen grows past 100% on any device were screwed.
  }
})