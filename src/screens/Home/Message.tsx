import { Text } from '@rneui/themed';
import { Image } from '@rneui/themed/dist/Image';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { commonStyles } from 'src/config/styles';
import User from '@assets/user1Female.jpg';
import User2 from '@assets/user2Male.jpg';
import User3 from '@assets/user3Male.jpg';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

export default function Message() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={commonStyles.FlexColStartStart}>
        <Text type="label" style={[commonStyles.mx20, styles.Text]}>Current Order</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MESSAGE_DETAIL', { recipientDisplayName: "Rebecca Jones" })} containerStyle={styles.TouchableOpacityContainer} style={[styles.WhiteBackgroundView]}>
          <View>
            <Image source={User} style={[styles.CardImageStyle]} containerStyle={{ marginLeft: 20 }} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text type="label">Rebecca Jones</Text>
            <View style={[commonStyles.FlexRowCenterStart, commonStyles.mt5]}>
              <Text style={styles.GrayText}>Okay sounds good!</Text>
              <Text style={[{ fontSize: 3, marginLeft: 5, marginRight: 5 }, styles.GrayText]}>{'\u2B24'}</Text>
              <Text style={styles.GrayText}>Just now</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <Text type="label" style={[commonStyles.mx20, styles.Text]}>Past Orders</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('MESSAGE_DETAIL', { recipientDisplayName: "Sam Robert" })} containerStyle={styles.TouchableOpacityContainer} style={[styles.WhiteBackgroundView]}>
          <View>
            <Image source={User2} style={[styles.CardImageStyle]} containerStyle={{ marginLeft: 20 }} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text type="label">Sam Robert</Text>
            <View style={[commonStyles.FlexRowCenterStart, commonStyles.mt5]}>
              <Text style={styles.GrayText}>Okay man see you soon.</Text>
              <Text style={[{ fontSize: 3, marginLeft: 5, marginRight: 5 }, styles.GrayText]}>{'\u2B24'}</Text>
              <Text style={styles.GrayText}>April 18</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MESSAGE_DETAIL', { recipientDisplayName: "Steve Smith" })} containerStyle={styles.TouchableOpacityContainer} style={[styles.WhiteBackgroundView, commonStyles.mt10]}>
          <View>
            <Image source={User3} style={[styles.CardImageStyle]} containerStyle={{ marginLeft: 20 }} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text type="label">Steve Smith</Text>
            <View style={[commonStyles.FlexRowCenterStart, commonStyles.mt5]}>
              <Text style={styles.GrayText}>Appreciate it!</Text>
              <Text style={[{ fontSize: 3, marginLeft: 5, marginRight: 5 }, styles.GrayText]}>{'\u2B24'}</Text>
              <Text style={styles.GrayText}>April 16</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  WhiteBackgroundView: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    height: 100
  },
  TouchableOpacityContainer: {
    width: '100%'
  },
  CardImageStyle: {
    height: 75,
    width: 75,
    borderRadius: 100,
  },
  SmallWhiteBackgroundView: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50
  },
  Text: {
    fontWeight: '600',
    marginLeft: 20
  },
  TextFontWieght: {
    fontWeight: '500'
  },
  GrayText: {
    color: '#717171'
  }
})
