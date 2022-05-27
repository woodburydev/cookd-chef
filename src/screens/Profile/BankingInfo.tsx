import {Icon, Image, Text} from '@rneui/themed/dist';
import React from 'react';
import {View} from 'react-native';
import Golden1 from '@assets/golden1.png';
import Visa from '@assets/visa.png';
import {ScrollView} from 'react-native-gesture-handler';
import t from 'tailwind';

export default function BankingInfo() {
  return (
    <ScrollView>
      <View style={t`w-full`}>
        <View style={t`mt-7 w-full`}>
          <View style={t`bg-white w-full row-center-start h-24`}>
            <View>
              <Image source={Golden1} style={t`h-24 w-21 mr-4`} />
            </View>
            <View>
              <Text style={t`my-1 text-sm`} type="label">
                Golden 1 Credit Union
              </Text>
              <Text style={t`mb-1`}>**** **** 5682</Text>
              <Text>Checking</Text>
            </View>
          </View>
          <View style={t`my-2 bg-white w-full row-center-start h-24`}>
            <View>
              <Image source={Visa} style={t`h-24 w-23 mr-2`} />
            </View>
            <View>
              <Text style={t`my-1 text-sm`} type="label">
                Visa - Debit
              </Text>
              <Text>**** **** **** 5682</Text>
              <Text>11/25</Text>
            </View>
          </View>
          <View style={t`mt-2 row-center-start w-full bg-white h-12`}>
            <View>
              <Icon style={t`w-24`} type="material" name="add" />
            </View>
            <View>
              <Text style={t`my-1 text-sm`} type="label">
                Add New
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
