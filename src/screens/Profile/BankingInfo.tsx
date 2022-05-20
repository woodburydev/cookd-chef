import { Icon, Image, Text } from '@rneui/themed/dist';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppColorPalette, commonStyles } from 'src/config/styles';
import Golden1 from '@assets/golden1.png'
import Visa from '@assets/visa.png'
import { ScrollView } from 'react-native-gesture-handler';
export default function BankingInfo() {
  return (
    <ScrollView>
      <View style={commonStyles.FlexColCenterStart}>
        <View style={[commonStyles.FlexColCenterStart, commonStyles.mt30]}>
          <View style={styles.WhiteBackgroundView}>
            <View>
              <Image source={Golden1} style={styles.CardImageStyle} />
            </View>
            <View>
              <Text style={[commonStyles.mx5, styles.CardType]} type="label">Golden 1 Credit Union</Text>
              <Text style={[commonStyles.mb5]}>**** **** 5682</Text>
              <Text>Checking</Text>
            </View>
          </View>
          <View style={[commonStyles.mt10, styles.WhiteBackgroundView]}>
            <View>
              <Image source={Visa} style={styles.CardImageStyle} />
            </View>
            <View>
              <Text style={[commonStyles.mx5, styles.CardType]} type="label">Visa - Debit</Text>
              <Text>**** **** **** 5682</Text>
              <Text>11/25</Text>
            </View>
          </View>
          <View style={[styles.SmallWhiteBackgroundView, commonStyles.mt10]}>
            <View>
              <Icon style={styles.AddIconStyle} type="material" name="add" />
            </View>
            <View>
              <Text style={[commonStyles.mx5, styles.CardType]} type="label">Add New</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  WhiteBackgroundView: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    height: 100
  },
  SmallWhiteBackgroundView: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50
  },
  RemoveIconContainerStyle: {
    position: 'absolute',
    right: 20
  },
  CardType: {
    fontSize: 13,
  },
  DiscoverImageStyle: {
    height: 50,
    width: 90,
    marginRight: 10,  
  },
  CardImageStyle: {
    height: 100,
    width: 90,
    marginRight: 10,
  },
  AddIconStyle: {
    width: 90,
  }
})