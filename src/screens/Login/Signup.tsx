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
      <View style={[commonStyles.FlexColCenterCenter, styles.ContentContainer]}>
        <View style={styles.SectionStyle}>
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
            autoComplete="name-given"
            placeholder="John"
            autoCapitalize="words"
            maxLength={20}
            returnKeyType="next"
            errorStyle={{ marginBottom: windowHeight < 850 ? 0 : 15, marginTop: windowHeight < 850 ? 0 : 0 }}
            onSubmitEditing={() => { lastNameRef.current && lastNameRef.current.focus() }}
            blurOnSubmit={false}
          />
          <Text type="label" style={styles.labelText}>
            Last Name
          </Text>
          <Input
            autoComplete="name-family"
            shake={() => { }}
            ref={lastNameRef}
            onChangeText={name => {
              setLastName(name);
              setLastNameErrorText('');
            }}
            errorStyle={{
              marginTop: 10,
              marginBottom: 15
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

        <Button onPress={() => (loading ? undefined : submit())} icon={
          loading ? (
            <ActivityIndicator color="white" />
          ) : undefined} title={loading ? "" : "Next"} />
      </View>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  SectionStyle: {
    justifyContent: 'center',
    width: '80%',
  },
  labelText: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
  },
  ContentContainer: {
    bottom: windowHeight < 750 ? 60 : 100
  },
});
