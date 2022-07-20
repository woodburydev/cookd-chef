import {RouteProp, useRoute} from '@react-navigation/core';
import {Button, Input, Text} from '@rneui/themed';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {AppColorPalette, commonStyles} from 'src/config/styles';
import {ProfileNavigationRoutes, ProfileRouteNames} from 'src/navigation/NavigationTypes';

const data = [
  {
    title: 'Gormet Mexican Food',
    menuId: 1,
    description:
      'Wide range of traditional Mexican food, from tacos to enchaladas, my personal favorites learned from Mexico.',
    costPerGuest: 75,
  },
  {
    title: 'Specialty Italian',
    menuId: 2,
    description:
      'Fantastic Ravioli with garlic herb butter (can be substituted if needed), with a glass of wine on the side. Garlic bread sticks included',
    costPerGuest: 80,
  },
];

const MenuDetails = () => {
  const route = useRoute<RouteProp<ProfileNavigationRoutes, ProfileRouteNames['MENU_DETAILS']>>();

  const menuId = route.params.menuId;
  const menuData = data[menuId - 1];
  return (
    <ScrollView>
      <View style={[commonStyles.FlexColCenterStart, styles.PageContainer]}>
        <View style={[styles.EditableInputsWrapper, commonStyles.mt30]}>
          <Text type="label" style={[styles.orangeLabelText]}>
            Menu Title
          </Text>
          <Input placeholder={menuData.title} shake={() => null} />
        </View>
        <View style={[styles.EditableInputsWrapper, commonStyles.mt10]}>
          <Text type="label" style={[styles.orangeLabelText]}>
            Menu Description
          </Text>
          <Input
            maxLength={200}
            placeholder={menuData.description}
            multiline={true}
            inputContainerStyle={{height: 200, alignItems: 'flex-start'}}
            inputStyle={{margin: 10}}
            shake={() => null}
          />
        </View>
        <View style={styles.LowerSectionContainer}>
          <View style={[commonStyles.mt20, commonStyles.FlexRowStartStart]}>
            <View style={{justifyContent: 'center', width: '50%'}}>
              <Text type="header">Appetizers</Text>
              <Button
                containerStyle={commonStyles.mt20}
                buttonStyle={styles.ButtonStyle}
                title="Add New"
              />
            </View>
            <View>
              <Text style={styles.InfoText} type="info">
                1 Included Per Person
              </Text>
            </View>
          </View>
          <View style={[commonStyles.mt30, commonStyles.FlexRowStartStart]}>
            <View style={{justifyContent: 'center', width: '50%'}}>
              <Text type="header">Entrees</Text>
              <Button
                containerStyle={commonStyles.mt20}
                buttonStyle={styles.ButtonStyle}
                title="Add New"
              />
            </View>
            <View>
              <Text style={styles.InfoText} type="info">
                1 Included Per Person
              </Text>
            </View>
          </View>
          <View style={[commonStyles.mt30, commonStyles.FlexRowStartStart]}>
            <View style={{justifyContent: 'center', width: '50%'}}>
              <Text type="header">Desserts</Text>
              <Button
                containerStyle={commonStyles.mt20}
                buttonStyle={styles.ButtonStyle}
                title="Add New"
              />
            </View>
            <View>
              <Text style={styles.InfoText} type="info">
                1 Included Per Person
              </Text>
            </View>
          </View>
          <View style={[commonStyles.mx30, commonStyles.FlexRowStartStart]}>
            <View style={{justifyContent: 'center', width: '50%'}}>
              <Text type="header">Extras</Text>
              <Button
                containerStyle={commonStyles.mt20}
                buttonStyle={styles.ButtonStyle}
                title="Add New"
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  PageContainer: {},
  InfoText: {
    color: AppColorPalette.orange,
    textDecorationLine: 'underline',
  },
  LowerSectionContainer: {
    marginLeft: 20,
    width: '90%',
  },
  EditableInputsWrapper: {
    width: '90%',
  },
  ButtonStyle: {
    width: 150,
    height: 40,
  },
  AppetizersSection: {
    width: '90%',
  },
  orangeLabelText: {
    color: AppColorPalette.orange,
    fontWeight: '600',
    marginLeft: 15,
    marginBottom: 5,
  },
});

export default MenuDetails;
