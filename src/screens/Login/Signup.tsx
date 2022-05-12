import React, { createRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import { Text, Input, Button, Icon } from '@rneui/themed';
import { commonStyles } from '@config/styles';
import { LoginRoutes } from '@navigation/Login/routes';
import { useNavigation } from '@react-navigation/core';
import { LoginRoutesNames } from 'src/navigation/NavigationTypes';
import { create } from 'react-test-renderer';

export default function Signup() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const lastNameRef: any = createRef();
  const [lastNameErrorText, setLastNameErrorText] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);
    if (firstName.length <= 1) {
      setLastNameErrorText('Please enter a longer first name');
      setLoading(false);
    } else if (lastName.length <= 1) {
      setLastNameErrorText('Please enter a longer last name');
      setLoading(false);
    } else {
      navigation.navigate(LoginRoutes.EMAIL.name as LoginRoutesNames['EMAIL'], {
        fullName: `${firstName} ${lastName}`,
      });
      setLoading(false);
    }
  };
  return (
    <View style={commonStyles.FlexColCenterCenter}>
      <View style={styles.SectionStyle}>
        <View />
        <View style={styles.inputContainer}>
          <Text type="label" style={styles.labelText}>
            First Name
          </Text>
          <Input
            autoFocus={true}
            shake={() => { }}
            onChangeText={name => {
              setFirstName(name);
              setLastNameErrorText('');
            }}
            textContentType="name"
            placeholder="John"
            autoCapitalize="words"
            maxLength={20}
            returnKeyType="next"

            onSubmitEditing={() => { lastNameRef.current && lastNameRef.current.focus() }}
            blurOnSubmit={false}
          />
          <Text type="label" style={styles.labelText}>
            Last Name
          </Text>
          <Input
            autoFocus={true}
            textContentType="familyName"
            shake={() => { }}
            ref={lastNameRef}
            onChangeText={name => {
              setLastName(name);
              setLastNameErrorText('');
            }}
            placeholder="Smith"
            autoCapitalize="words"
            maxLength={20}
            errorMessage={lastNameErrorText}
            returnKeyType="next"
            onSubmitEditing={submit}
            blurOnSubmit={false}
          />
        </View>

        <KeyboardAvoidingView
          style={[styles.buttonView]}
          keyboardVerticalOffset={50}
          behavior="position">
          <Button
            onPress={() => (loading ? undefined : submit())}
            circle={true}
            icon={
              loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Icon
                  type="material-icons"
                  name="arrow-forward"
                  iconStyle={styles.iconStyle}
                  size={25}
                />
              )
            }
            style={styles.Button}
          />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  SectionStyle: {
    justifyContent: 'space-around',
    width: '80%',
    height: '100%',
    marginTop: '15%',
  },
  labelText: {
    marginLeft: 10,
    marginBottom: windowHeight < 750 ? 5 : 20,
  },
  inputContainer: {
    bottom: windowHeight < 850 ? '13%' : '11%',
  },
  Button: {
    alignSelf: 'flex-end',
  },
  buttonView: {
    top: windowHeight < 850 ? '9%' : '4%',
  },
  iconStyle: {
    color: 'white',
  },
});
