import {Icon} from '@rneui/base';
import {Button, Text} from '@rneui/themed';
import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Touchable,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {AppColorPalette, commonStyles} from 'src/config/styles';
import UpcomingJobImage from '@assets/upcomingJobImage1.jpg';
import UpcomingJobImage2 from '@assets/upcomingJobImage2.jpg';
import UpcomingJobImage3 from '@assets/upcomingJobImage3.jpg';
import UpcomingJobImage4 from '@assets/upcomingJobImage4.jpg';
import {Image} from '@rneui/themed/dist/Image';
import {WINDOW_WIDTH} from 'src/config/constants';

const bulletItem = (item: string) => {
  return <Text>{`\u2022 ${item}`}</Text>;
};

const chartData = {
  labels: ['M', 'T', 'W', 'Th', 'F', 'S', 'S'],
  datasets: [
    {
      // count of each "job" per day.
      data: [1, 2, 1, 0, 2, 3, 0],
    },
  ],
};

const jobData = [
  {
    date: 'May 6',
    timeRange: '4pm-7pm',
    guests: 4,
    cost: 345,
    address: '2121 GoodFood Blvd, San Francisco, 94016',
    order: {
      menu: 'Menu 1',
      items: [
        {
          name: 'Entree 3',
          count: 3,
        },
        {
          name: 'Entree 2',
          count: 1,
        },
        {
          name: 'Side 4',
          count: 4,
        },
      ],
    },
    specialInstructions: 'make everything vegan please!',
    distance: '20min',
    imagePhoto: UpcomingJobImage,
  },
  {
    date: 'May 7',
    timeRange: '6pm-8:30pm',
    guests: 6,
    cost: 460,
    address: '144 San Felipe Ave, South San Francisco, CA 94080',
    order: {
      menu: 'Menu 2',
      items: [
        {
          name: 'Entree 1',
          count: 4,
        },
        {
          name: 'Entree 2',
          count: 2,
        },
        {
          name: 'Entree 4',
          count: 2,
        },
        {
          name: 'Side 2',
          count: 6,
        },
      ],
    },
    specialInstructions: 'make everything vegan please!',
    distance: '20min',
    imagePhoto: UpcomingJobImage2,
  },
  {
    date: 'May 7',
    timeRange: '9pm-11:30pm',
    guests: 4,
    cost: 250,
    address: '250 San Juniper Blvd, South San Francisco, CA 94064',
    order: {
      menu: 'Menu 3',
      items: [
        {
          name: 'Entree 2',
          count: 2,
        },
        {
          name: 'Entree 1',
          count: 4,
        },
        {
          name: 'Side 3',
          count: 2,
        },
      ],
    },
    distance: '25min',
    imagePhoto: UpcomingJobImage3,
  },
  {
    date: 'May 8',
    timeRange: '3pm-5pm',
    guests: 6,
    cost: 430,
    address: '337 Dennis Dr, Daly City, CA 94015',
    order: {
      menu: 'Menu 2',
      items: [
        {
          name: 'Entree 1',
          count: 4,
        },
        {
          name: 'Entree 2',
          count: 2,
        },
        {
          name: 'Entree 3',
          count: 3,
        },
        {
          name: 'Side 1',
          count: 3,
        },
        {
          name: 'Side 2',
          count: 3,
        },
      ],
    },
    distance: '40min',
    imagePhoto: UpcomingJobImage4,
  },
];

export default function Home() {
  return (
    <View style={[commonStyles.FlexColCenterCenter, styles.mainBodyContainer]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainerStyles}>
          <View style={styles.TextContainerStyle}>
            <Text
              style={[commonStyles.mt20, styles.welcomeBackText]}
              type="description">
              Welcome Back Chef!
            </Text>
            <Text style={commonStyles.mx20} type="large-header">
              Your Upcoming Jobs
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={styles.cardsContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {jobData.map((item, index) => (
              <TouchableWithoutFeedback style={[styles.cardWrapper]}>
                <View style={[commonStyles.mx10, styles.topLeftCard]}>
                  <View>
                    <Text type="label" style={commonStyles.mb5}>
                      {item.date}
                    </Text>
                    <Text type="description">{item.timeRange}</Text>
                    <Text style={styles.cardGuestCount} type="description">
                      {item.guests} Guests
                    </Text>
                    <Text style={styles.cardGuestCount} type="description">
                      ${item.cost}
                    </Text>
                  </View>
                  <View />
                  <View>
                    <Image
                      source={item.imagePhoto}
                      style={styles.imageContainer}
                      // PlaceholderContent={<ActivityIndicator />}
                    />
                  </View>
                </View>
                <View style={[commonStyles.mx10, styles.midCard]}>
                  <Text type="label" style={commonStyles.mb5}>
                    Client {index + 1}
                  </Text>
                  <Text>{item.address}</Text>
                </View>
                <View style={[commonStyles.mx10, styles.lowerCard]}>
                  <Text type="label" style={commonStyles.mb5}>
                    Order: {item.order.menu}
                  </Text>
                  {item.order.items.map(orderItem => {
                    return bulletItem(`${orderItem.count}x ${orderItem.name}`);
                  })}
                  {item.specialInstructions && (
                    <Text
                      style={[
                        commonStyles.mx10,
                        styles.cardGuestCount,
                        styles.welcomeBackText,
                      ]}>
                      *special instructions*
                    </Text>
                  )}
                </View>
                <View style={[styles.bottomCard, commonStyles.mb10]}>
                  <View style={styles.iconContainer}>
                    <View style={styles.firstTwoIcons}>
                      <Icon
                        type="material-community"
                        name="map-marker-distance"
                        iconStyle={styles.cardIconStyle}
                        size={30}
                      />
                      <Text style={styles.distanceText}>{item.distance}</Text>
                    </View>
                    <Icon
                      type="material-community"
                      name="message-text-outline"
                      iconStyle={styles.cardIconStyle}
                      size={30}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
          <View style={styles.TextContainerStyle}>
            <Text style={commonStyles.mt30} type="large-header">
              Your Schedule
            </Text>
            <Text
              style={[{fontWeight: '600', top: 20}, styles.welcomeBackText]}>
              Jobs This Week
            </Text>
            <BarChart
              segments={3}
              width={WINDOW_WIDTH - 40}
              height={300}
              data={chartData}
              chartConfig={{
                decimalPlaces: 0,
                backgroundGradientFrom: AppColorPalette.orange,
                backgroundGradientTo: AppColorPalette.orange,
                barPercentage: 0.3,
                propsForBackgroundLines: {
                  stroke: AppColorPalette.orange,
                },
                color: () => 'white',
              }}
              style={{
                marginVertical: 10,
                paddingTop: 30,
                paddingRight: 40,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                top: -10,
                left: 20,
                borderRadius: 16,
              }}
            />
          </View>
          <View style={styles.TextContainerStyle}>
            <Text type="description" style={[commonStyles.mx10]}>
              Looks like you have a busy week Chef! Make sure your ingredients
              are in order.
            </Text>
            <Button
              style={[commonStyles.mx20, {alignSelf: 'center'}]}
              title="Manage Schedule"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  contentContainerStyles: {
    width: '100%',
    alignItems: 'center',
  },
  TextContainerStyle: {
    width: '90%',
  },
  welcomeBackText: {
    color: AppColorPalette.orange,
    fontWeight: '500',
  },
  mainBodyContainer: {
    flex: 1,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: AppColorPalette.orange,
  },
  cardWrapper: {
    flex: 1,
    width: 330,
    marginRight: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: 20,
  },
  cardGuestCount: {
    color: AppColorPalette.orange,
  },
  topLeftCard: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  midCard: {
    width: '90%',
  },
  lowerCard: {
    width: '90%',
    paddingBottom: 45,
  },
  bottomCard: {
    width: '90%',
    position: 'absolute',
    bottom: 0,
  },
  firstTwoIcons: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cardsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 20,
  },
  iconContainer: {
    width: '90%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  distanceText: {
    marginLeft: 5,
    fontWeight: '500',
  },
  messageIcon: {
    justifyContent: 'flex-end',

    alignSelf: 'flex-end',
  },
  cardIconStyle: {
    color: AppColorPalette.orange,
  },
});
