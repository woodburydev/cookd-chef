import {Button, Input, Text} from '@rneui/themed';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {endpoint} from 'src/config/api';
import {AppColorPalette, commonStyles} from 'src/config/styles';
import auth from '@react-native-firebase/auth';

const Bio = () => {
  const [bio, setBio] = useState('');
  const [education, setEducation] = useState('');
  const [currentBioData, setCurrentBioData] = useState('');
  const [currentEducation, setCurrentEducation] = useState('');
  const user = auth().currentUser!;

  useEffect(() => {
    axios
      .get(`${endpoint}/cook/bioData?email=${user.email}`)
      .then((res) => {
        setCurrentBioData(res.data.bio);
        setCurrentEducation(res.data.education);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // on change of values, send to update
    bio.length > 0 || education.length > 0
      ? axios.post(`${endpoint}/cook/update`, {
          fbuuid: user.uid,
          ...(bio.length > 0 && {bio}),
          ...(education.length > 0 && {education}),
        })
      : null;
  }, [bio, education, user]);

  return (
    <ScrollView>
      <View style={{marginLeft: 20, width: '90%', marginTop: 20}}>
        <Text style={{marginTop: 20, marginBottom: 20}} type="large-header">
          Tell People About Yourself!
        </Text>
        <Text type="description">
          Adding some more information about you is going to make a big difference. Increase your
          probability of bookings by adding some information about yourself
        </Text>
      </View>
      <View style={[commonStyles.FlexColCenterStart, styles.PageContainer]}>
        <View style={[styles.EditableInputsWrapper, commonStyles.mt30]}>
          <Text type="label" style={[styles.orangeLabelText]}>
            Educational Background
          </Text>
          <Input
            defaultValue={currentEducation}
            onChangeText={(text) => setEducation(text)}
            shake={() => null}
          />
        </View>
        <View style={[styles.EditableInputsWrapper, commonStyles.mx10]}>
          <Text type="label" style={[styles.orangeLabelText]}>
            Your Bio (Publicly Visible)
          </Text>
          <Input
            defaultValue={currentBioData}
            onChangeText={(text) => setBio(text)}
            maxLength={200}
            multiline={true}
            inputContainerStyle={{height: 200, alignItems: 'flex-start'}}
            inputStyle={{margin: 10}}
            shake={() => null}
          />
        </View>
      </View>
      <View style={styles.LowerSectionContainer}>
        <View style={[commonStyles.mx20, commonStyles.FlexRowStartStart]}>
          <View style={{justifyContent: 'center', width: '50%'}}>
            <Text type="header">Certifications</Text>
            <Button
              containerStyle={commonStyles.mt20}
              buttonStyle={styles.ButtonStyle}
              title="Add New"
            />
          </View>
        </View>
        <View style={[commonStyles.mx20, commonStyles.FlexRowStartStart]}>
          <View style={{justifyContent: 'center', width: '50%'}}>
            <Text type="header">Public Resume</Text>
            <Button
              containerStyle={commonStyles.mt20}
              buttonStyle={styles.ButtonStyle}
              title="Add New"
            />
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

export default Bio;
