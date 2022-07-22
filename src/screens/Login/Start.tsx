import {Button, Image, Text} from '@rneui/themed';
import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import CookingImage from '@assets/cookingImage.jpg';
import CookdLogo from '@assets/cookdlogolabel.png';
import {LoginRoutes} from 'src/navigation/Login/routes';
import {useNavigation} from '@react-navigation/core';
import {LoginRoutesNames} from 'src/navigation/NavigationTypes';
import t from 'tailwind';

export default function GetStarted() {
  const navigation = useNavigation();

  return (
    <View style={t`col-center-start flex-1`}>
      <Image
        source={CookingImage}
        style={t`h/50 w/100`}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={t`col-center-center h-3/5 rounded-5xl bg-white absolute bottom-0 w-full`}>
        <Image source={CookdLogo} style={t`h-28 w-36`} PlaceholderContent={<ActivityIndicator />} />
        <View style={t`items-center mt-7`}>
          <Text type="header" style={t`mb-1`}>
            Your Schedule.
          </Text>
          <Text type="header" style={t`mb-1`}>
            Your Talents.
          </Text>
          <Text type="header" style={t`mb-1`}>
            Your Business.
          </Text>
        </View>
        <Button
          onPress={() =>
            navigation.navigate(LoginRoutes.PHONE_NUMBER.name as LoginRoutesNames['PHONE_NUMBER'])
          }
          title="Get Started"
          style={t`mt-10`}
        />
      </View>
    </View>
  );
}
