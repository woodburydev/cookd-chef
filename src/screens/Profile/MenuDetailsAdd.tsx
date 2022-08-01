import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Button, Input, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {DeviceEventEmitter, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {AppColorPalette, commonStyles} from 'src/config/styles';
import {ProfileNavigationRoutes, ProfileRouteNames} from 'src/navigation/NavigationTypes';

export default function MenuDetailsAdd() {
  const route =
    useRoute<RouteProp<ProfileNavigationRoutes, ProfileRouteNames['MENU_DETAILS_ADD']>>();
  const navigation = useNavigation();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const menuId = route.params.menuId;
  const detail = route.params.detail;
  const newItem = route.params.new;

  const submit = () => {
    DeviceEventEmitter.emit('event.testEvent', {
      title: title.trim(),
      description: description.trim(),
      detail,
    });
    navigation.navigate('MENU_DETAILS', {
      new: newItem,
      menuId,
    });
  };

  return (
    <ScrollView>
      <View style={[commonStyles.FlexColCenterStart, styles.PageContainer]}>
        <View style={[styles.EditableInputsWrapper, commonStyles.mt30]}>
          <Text type="label" style={[styles.orangeLabelText]}>
            Title
          </Text>
          <Input onChangeText={setTitle} shake={() => null} />
        </View>
        <View style={[styles.EditableInputsWrapper, commonStyles.mt10]}>
          <Text type="label" style={[styles.orangeLabelText]}>
            Description
          </Text>
          <Input
            onChangeText={setDescription}
            maxLength={200}
            multiline={true}
            inputContainerStyle={{height: 200, alignItems: 'flex-start'}}
            inputStyle={{margin: 10}}
            shake={() => null}
          />
        </View>
        <Button onPress={submit} style={{marginTop: 20}} title={`Add ${detail}`} />
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  PageContainer: {},
  EditableInputsWrapper: {
    width: '90%',
  },
  orangeLabelText: {
    color: AppColorPalette.orange,
    fontWeight: '600',
    marginLeft: 15,
    marginBottom: 5,
  },
});
