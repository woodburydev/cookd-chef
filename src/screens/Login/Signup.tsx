import React, {useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import {Text, Input, Button, Icon} from '@rneui/themed';
import {commonStyles} from '@config/styles';
import {LoginRoutes} from '@navigation/Login/routes';
import {useNavigation} from '@react-navigation/core';
import {LoginRoutesNames} from 'src/navigation/NavigationTypes';

export default function Signup() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');

  const [firstNameErrorText, setFirstNameErrorText] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);
    if (fullName.length <= 1) {
      setFirstNameErrorText('Please enter a longer name');
      setLoading(false);
    } else {
      navigation.navigate(LoginRoutes.EMAIL.name as LoginRoutesNames['EMAIL'], {
        fullName,
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
            Welcome! What's your name?
          </Text>

          <Input
            autoFocus={true}
            shake={() => {}}
            onChangeText={name => {
              setFullName(name);
              setFirstNameErrorText('');
            }}
            placeholder="John Smith"
            autoCapitalize="words"
            maxLength={20}
            errorMessage={firstNameErrorText}
            returnKeyType="next"
            onSubmitEditing={() => {}}
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

const styles = StyleSheet.create({
  SectionStyle: {
    justifyContent: 'space-around',
    width: '80%',
    height: '100%',
    marginTop: '15%',
  },
  labelText: {
    marginLeft: 10,
    marginBottom: 20,
  },
  inputContainer: {
    bottom: '15%',
  },
  Button: {
    alignSelf: 'flex-end',
  },
  buttonView: {
    top: '4%',
  },
  iconStyle: {
    color: 'white',
  },
});
