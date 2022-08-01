import {RouteProp, useRoute} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import {Button, Icon, Image, Input, Text} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  DeviceEventEmitter,
  Dimensions,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {AppColorPalette, commonStyles} from 'src/config/styles';
import {ProfileNavigationRoutes, ProfileRouteNames} from 'src/navigation/NavigationTypes';
import * as ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import {
  showToastAction,
  useAddMenuMutation,
  useGetMenusFromUserQuery,
  useGetUserQuery,
  useUpdateMenuMutation,
} from 'src/redux/store';
import {useDispatch} from 'react-redux';

const widowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const MenuDetails = () => {
  const route = useRoute<RouteProp<ProfileNavigationRoutes, ProfileRouteNames['MENU_DETAILS']>>();
  const newItem = route.params.new;
  const menuId = route.params.menuId;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [addMenu] = useAddMenuMutation();
  const [updateMenu] = useUpdateMenuMutation();
  const {data: userInfo} = useGetUserQuery();
  const {data: menus} = useGetMenusFromUserQuery(userInfo.fbuuid);
  const menu = getMenu();
  const [costPerPerson, setCostPerPerson] = useState<string>(
    menu?.cost_per_person.toString() || undefined,
  );
  const [menuTitle, setMenuTitle] = useState<string>(menu?.title || undefined);
  const [file, setFile] = useState();
  const [menuDescription, setMenuDescription] = useState<string>(menu?.description || undefined);
  const [appetizers, setAppetizers] = useState<any>(menu?.appetizers || []);
  const [entrees, setEntrees] = useState<any>(menu?.entrees || []);
  const [deserts, setDeserts] = useState<any>(menu?.deserts || []);
  const [extras, setExtras] = useState<any>(menu?.extras || []);
  const [isLoadingResponse, setIsLoadingRespose] = useState();

  const submit = () => {
    const fbuuid = auth().currentUser?.uid;
    if (menuTitle && menuDescription && costPerPerson && newItem) {
      const body = new FormData();
      body.append('fbuuid', fbuuid);
      body.append('title', menuTitle);
      body.append('description', menuDescription);
      body.append('file', file);
      body.append('costPerPerson', parseInt(costPerPerson));
      body.append('appetizers', JSON.stringify(appetizers));
      body.append('entrees', JSON.stringify(entrees));
      body.append('deserts', JSON.stringify(deserts));
      addMenu(body).then(res => {});
      // addMenu(sendObj).then(res => {
      //   console.log(res);
      // });
    } else if (!newItem) {
      const body = new FormData();
      body.append('fbuuid', fbuuid);
      body.append('title', menuTitle.trim());
      body.append('file', file);
      body.append('id', menu.id);
      body.append('description', menuDescription.trim());
      body.append('costPerPerson', parseInt(costPerPerson));
      body.append('appetizers', JSON.stringify(appetizers));
      body.append('entrees', JSON.stringify(entrees));
      body.append('deserts', JSON.stringify(deserts));
      body.append('extras', JSON.stringify(extras));
      updateMenu(body).then(res => {});
    }
  };

  function getMenu() {
    if (!menus) {
      return [];
    }
    return menus.filter(item => item.id === menuId)[0];
  }

  const showToast = () => {
    let toastObj;
    if (!newItem) {
      toastObj = {type: 'success', text1: 'Updated!', text2: 'Your menu has been updated 🎉'};
    } else {
      toastObj = {type: 'success', text1: 'Created!', text2: 'Your menu has been created 🎉'};
    }

    dispatch(showToastAction(toastObj));
  };

  useEffect(() => {
    DeviceEventEmitter.addListener('event.testEvent', data => {
      const {title, description} = data;
      if (title.length > 0 && description.length > 0) {
        const updateType = data.detail;
        console.log(data.detail);
        if (updateType === 'Appetizer') {
          setAppetizers([...appetizers, {title, description}]);
        } else if (updateType === 'Entree') {
          setEntrees([...entrees, {title, description}]);
        } else if (updateType === 'Desert') {
          setDeserts([...deserts, {title, description}]);
        }
      }
    });

    DeviceEventEmitter.addListener('event.isLoading', data => {
      showToast();
      setIsLoadingRespose(data);
    });
    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, [appetizers, entrees, deserts]);

  useEffect(() => {
    if (isLoadingResponse === false) {
      navigation.navigate('MENUS');
    }
  }, [isLoadingResponse]);

  if (!newItem && !menu) {
    return <ActivityIndicator />;
  }

  const onImageLibraryPress = useCallback(() => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeExtra: true,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response && response.assets && response.assets[0]) {
        const photo = response.assets[0];

        setFile({
          uri: Platform.OS === 'android' ? photo.uri : photo.uri!.replace('file://', ''),
          type: photo.type,
          name: photo.fileName,
        });
        // updateProfilePicture(formData);
      }
    });
  }, [userInfo]);

  const getImageSource = () => {
    const hasUploadedImage = menu && menu.filename.length > 0;
    const selectedPhoto = file && file.uri;
    if (selectedPhoto) {
      return {uri: file.uri};
    } else if (hasUploadedImage) {
      return {uri: JSON.parse(menu.filename)};
    } else {
      return {uri: ''};
    }
  };

  return (
    <>
      <ScrollView>
        <View style={[commonStyles.FlexColCenterStart, styles.PageContainer]}>
          <View style={styles.imageContainerView}>
            <Image
              source={getImageSource()}
              // {
              // !isUpdating && !loadingProfilePicture && !profilePictureUri
              //   ? ProfilePicture
              //   : {uri: profilePictureUri}
              // }
              style={styles.image}
              containerStyle={styles.imageContainer}
            />
            <View style={styles.imageIconContainerView}>
              <Icon
                size={windowHeight < 750 ? 15 : 18}
                onPress={onImageLibraryPress}
                color={AppColorPalette.orange}
                type="material"
                name="edit"
              />
            </View>
          </View>
          <View style={[styles.EditableInputsWrapper, commonStyles.mt10]}>
            <Text type="label" style={[styles.orangeLabelText]}>
              Menu Title
            </Text>
            <Input
              defaultValue={newItem ? '' : menu.title}
              onChangeText={setMenuTitle}
              shake={() => null}
            />
          </View>
          <View style={[styles.EditableInputsWrapper, commonStyles.mt10]}>
            <Text type="label" style={[styles.orangeLabelText]}>
              Menu Description
            </Text>
            <Input
              defaultValue={newItem ? '' : menu.description}
              maxLength={200}
              multiline={true}
              inputContainerStyle={{height: 200, alignItems: 'flex-start'}}
              onChangeText={setMenuDescription}
              inputStyle={{margin: 10}}
              shake={() => null}
            />
          </View>
          <View style={[styles.EditableInputsWrapper, commonStyles.mt10]}>
            <Text type="label" style={[styles.orangeLabelText]}>
              $ Cost Per Person
            </Text>
            <Input
              defaultValue={newItem ? '' : menu.cost_per_person.toString()}
              onChangeText={setCostPerPerson}
              keyboardType="number-pad"
              shake={() => null}
            />
          </View>
          <View style={styles.LowerSectionContainer}>
            <View style={styles.menuItem}>
              <View style={[commonStyles.FlexRowStartStart, {marginBottom: 10}]}>
                <View style={[commonStyles.FlexRowCenterCenter, {width: '100%'}]}>
                  <Text style={styles.menuItemTitle} type="header">
                    Appetizers
                  </Text>
                  <Text centerText style={[styles.InfoText, {width: '55%'}]} type="info">
                    1 Included Per Person
                  </Text>
                </View>
              </View>
              {appetizers.map(item => (
                <View style={[styles.ContainerStyle]}>
                  <View style={{width: '90%'}}>
                    <Text style={styles.menuItemDetailTitle}>{item.title}</Text>
                    <Text>{item.description}</Text>
                  </View>
                </View>
              ))}
              <View style={styles.addNewButtonView}>
                <Button
                  buttonStyle={styles.ButtonStyle}
                  onPress={() =>
                    navigation.navigate('MENU_DETAILS_ADD', {
                      menuId,
                      detail: 'Appetizer',
                      editing: false,
                      new: newItem,
                    })
                  }
                  title="Add New"
                />
              </View>
            </View>
            <View style={styles.menuItem}>
              <View style={[commonStyles.FlexRowStartStart, {marginBottom: 10}]}>
                <View style={[commonStyles.FlexRowCenterCenter, {width: '100%'}]}>
                  <Text style={styles.menuItemTitle} type="header">
                    Entrees
                  </Text>
                  <Text centerText style={[styles.InfoText, {width: '55%'}]} type="info">
                    1 Included Per Person
                  </Text>
                </View>
              </View>
              {entrees.map(item => (
                <View style={[styles.ContainerStyle]}>
                  <View style={{width: '90%'}}>
                    <Text style={styles.menuItemDetailTitle}>{item.title}</Text>
                    <Text>{item.description}</Text>
                  </View>
                </View>
              ))}
              <View style={styles.addNewButtonView}>
                <Button
                  buttonStyle={styles.ButtonStyle}
                  onPress={() =>
                    navigation.navigate('MENU_DETAILS_ADD', {
                      menuId,
                      detail: 'Entree',
                      editing: false,
                      new: newItem,
                    })
                  }
                  title="Add New"
                />
              </View>
            </View>
            <View style={styles.menuItem}>
              <View style={[commonStyles.FlexRowStartStart, {marginBottom: 10}]}>
                <View style={[commonStyles.FlexRowCenterCenter, {width: '100%'}]}>
                  <Text style={styles.menuItemTitle} type="header">
                    Deserts
                  </Text>
                  <Text centerText style={[styles.InfoText, {width: '55%'}]} type="info">
                    1 Included Per Person
                  </Text>
                </View>
              </View>
              {deserts.map(item => (
                <View style={[styles.ContainerStyle]}>
                  <View style={{width: '90%'}}>
                    <Text style={styles.menuItemDetailTitle}>{item.title}</Text>
                    <Text>{item.description}</Text>
                  </View>
                </View>
              ))}
              <View style={styles.addNewButtonView}>
                <Button
                  buttonStyle={styles.ButtonStyle}
                  onPress={() =>
                    navigation.navigate('MENU_DETAILS_ADD', {
                      menuId,
                      detail: 'Desert',
                      editing: false,
                      new: newItem,
                    })
                  }
                  title="Add New"
                />
              </View>
            </View>
            {/* <View style={styles.menuItem}> */}
            {/* <View style={[commonStyles.FlexRowStartStart, {marginBottom: 10}]}> */}
            {/* <View style={[commonStyles.FlexRowCenterCenter, {width: '100%'}]}>
                <Text style={styles.menuItemTitle} type="header">
                  Extras
                </Text>
                <Text centerText style={[styles.InfoText, {width: '55%'}]} type="info">
                  1 Included Per Person
                </Text>
              </View> */}
            {/* </View> */}
            {/* <View style={styles.addNewButtonView}>
              <Button
                buttonStyle={styles.ButtonStyle}
                onPress={() =>
                  navigation.navigate('MENU_DETAILS_ADD', {
                    menuId: 1,
                    detail: 'Extra',
                    editing: false,
                    new: newItem,
                  })
                }
                title="Add New"
              />
            </View> */}
            {/* </View> */}
            <View style={{marginTop: 30, marginBottom: 40}}>
              <Button
                icon={isLoadingResponse ? <ActivityIndicator color="white" /> : undefined}
                onPress={submit}
                containerStyle={{alignSelf: 'center'}}
                title={isLoadingResponse ? '' : newItem ? 'Add Menu' : 'Update'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  PageContainer: {},
  InfoText: {
    color: AppColorPalette.orange,
    textDecorationLine: 'underline',
  },
  image: {
    borderRadius: 100,
    height: windowHeight / 6,
    width: windowHeight / 6,
  },
  imageIconContainerView: {
    height: windowHeight < 750 ? 30 : 40,
    width: windowHeight < 750 ? 30 : 40,
    bottom: 20,
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {},
  imageContainerView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight < 750 ? 30 : 40,
  },
  LowerSectionContainer: {
    width: '100%',
  },
  EditableInputsWrapper: {
    width: '90%',
  },
  ButtonStyle: {
    width: 150,
    height: 40,
  },
  ContainerStyle: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    marginBottom: 2,
    width: '100%',
  },
  addNewButtonView: {
    width: '90%',
    marginTop: 10,
  },
  AppetizersSection: {
    width: '90%',
  },
  menuItemTitle: {
    width: '45%',
    left: 20,
  },
  menuItem: {
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  orangeLabelText: {
    color: AppColorPalette.orange,
    fontWeight: '600',
    marginLeft: 15,
    marginBottom: 5,
  },
  menuItemDetailTitle: {
    fontWeight: '600',
    marginBottom: 5,
  },
});

export default MenuDetails;
