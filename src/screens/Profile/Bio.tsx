import { RouteProp, useRoute } from '@react-navigation/core';
import { Button, Input, Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AppColorPalette, commonStyles } from 'src/config/styles';
import { ProfileNavigationRoutes, ProfileRouteNames } from 'src/navigation/NavigationTypes';

const Bio = () => {
  return (
    <ScrollView>
      <View style={{ marginLeft: 20, width: "90%", marginTop: 20}}>
      <Text style={{ marginTop: 20, marginBottom: 20}}type="large-header">Tell People About Yourself!</Text>
      <Text type="description">Adding some more information about you is going to make a big difference. Increase your probability of bookings by adding some information about yourself</Text>
      </View>
      <View style={[commonStyles.FlexColCenterStart, styles.PageContainer]}>
        <View style={[styles.EditableInputsWrapper, commonStyles.mt30]}>
          <Text type="label" style={[styles.orangeLabelText]}>Educational Background</Text>
          <Input shake={() => null} />
        </View>
        <View style={[styles.EditableInputsWrapper, commonStyles.mx10]}>
          <Text type="label" style={[styles.orangeLabelText]}>Your Bio (Publicly Visible)</Text>
          <Input maxLength={200} multiline={true} inputContainerStyle={{ height: 200, alignItems: 'flex-start' }} inputStyle={{ margin: 10 }} shake={() => null} />
        </View>
      </View>
      <View style={styles.LowerSectionContainer}>
        <View style={[commonStyles.mx20, commonStyles.FlexRowStartStart]}>
          <View style={{ justifyContent: 'center', width: "50%" }}>
            <Text type="header">Certifications</Text>
            <Button containerStyle={commonStyles.mt20} buttonStyle={styles.ButtonStyle} title="Add New" />
          </View>
        </View>
        <View style={[commonStyles.mx20, commonStyles.FlexRowStartStart]}>
          <View style={{ justifyContent: 'center', width: "50%" }}>
            <Text type="header">Public Resume</Text>
            <Button containerStyle={commonStyles.mt20} buttonStyle={styles.ButtonStyle} title="Add New" />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  PageContainer: {
  },
  InfoText: {
    color: AppColorPalette.orange,
    textDecorationLine: 'underline'
  },
  LowerSectionContainer: {
    marginLeft: 20,
    width: "90%"
  },
  EditableInputsWrapper: {
    width: "90%",
  },
  ButtonStyle: {
    width: 150,
    height: 40
  },
  AppetizersSection: {
    width: "90%"
  },
  orangeLabelText: {
    color: AppColorPalette.orange,
    fontWeight: "600",
    marginLeft: 15,
    marginBottom: 5
  }
});

export default Bio;