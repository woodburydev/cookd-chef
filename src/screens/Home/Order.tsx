import {Text, Image} from '@rneui/themed';
import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import ChefImage from '@assets/resturantimage.png';
import t from 'tailwind';

export default function Order() {
  return (
    <View style={t`col-center-start`}>
      <View style={t`w-8/12 mt-20 col-center-start`}>
        <Image
          source={ChefImage}
          style={t`h-40 w-60 mb-12`}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text type="label" centerText style={t`my-2`}>
          No Orders Yet
        </Text>
        <Text type="description" centerText style={t`my-2`}>
          When a customer places an order, it will appear here for you to view
          and look at in closer detail.
        </Text>
        <Text
          type="description"
          centerText
          style={t`text-orange underline my-2`}>
          Learn More
        </Text>
      </View>
    </View>
  );
}
