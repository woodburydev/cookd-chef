import {Icon, Image, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {AppColorPalette} from 'src/config/styles';
import {Dropdown} from 'react-native-element-dropdown';
import {ScrollView} from 'react-native-gesture-handler';
import Pasta from '@assets/pasta.jpg';
import Sushi from '@assets/sushi.jpg';
import Tacos from '@assets/tacos.jpg';
import {WINDOW_WIDTH} from 'src/config/constants';
import t from 'tailwind';

function* yLabel() {
  yield* [0, 150, 300, 450, 600, 750];
}

const datapoints = [175, 455, 305, 675, 350, 0, 200, 570, 500, 475, 0];
const bookingData = [1, 2, 1, 0, 2, 3, 0, 2, 1, 2, 3];

const chartData = {
  labels: ['1', '3', '6', '9', '12', '15', '18', '21', '24', '27', '30'],
  datasets: [
    {
      data: datapoints,
      colors: datapoints.map(() => () => AppColorPalette.orange),
    },
  ],
};
const bookingsData = {
  labels: ['1', '3', '6', '9', '12', '15', '18', '21', '24', '27', '30'],
  datasets: [
    {
      data: bookingData,
      colors: bookingData.map(() => () => 'black'),
    },
  ],
};

const howManyGuests = [
  {
    value: 'Last Week',
    lable: 'Last Week',
  },
  {
    value: 'Last Month',
    lable: 'Last Month',
  },
  {
    value: '3 Months',
    lable: '3 Months',
  },
  {
    value: '1 Year',
    lable: '1 Year',
  },
  {
    value: 'All Time',
    lable: 'All Time',
  },
];

export default function Payments() {
  const yLabelIterator = yLabel();
  const [filter, setFilter] = useState();
  return (
    <ScrollView>
      <View style={t`col-center-start`}>
        <View style={t`mt-5 w-11/12 row-center-between`}>
          <Text type="large-header">Analytics</Text>
          <Dropdown
            disable={true}
            style={[t`w-44 m-4 h-10 bg-white rounded-3xl py-2`]}
            selectedTextStyle={t`left-4 font-normal text-base`}
            placeholderStyle={t`left-4 font-semibold text-base`}
            selectedTextProps={t`left-4 font-semibold text-base`}
            iconStyle={t`w-5 h-5 right-5`}
            data={howManyGuests}
            iconColor={AppColorPalette.orange}
            valueField="value"
            dropdownPosition="bottom"
            labelField="lable"
            placeholder="Last Month"
            onChange={e => {
              setFilter(e.value);
            }}
          />
        </View>
        <View>
          <BarChart
            width={WINDOW_WIDTH - 60}
            height={250}
            segments={5}
            data={chartData}
            withCustomBarColorFromData={true}
            flatColor={true}
            yAxisLabel="$"
            chartConfig={{
              decimalPlaces: 0,
              labelColor: () => 'black',
              backgroundGradientFromOpacity: 0,
              formatYLabel: () => yLabelIterator.next().value,
              stackedBar: true,
              barPercentage: 0.3,
              backgroundGradientFrom: AppColorPalette.appBackgroundColor,
              backgroundGradientTo: AppColorPalette.appBackgroundColor,
              propsForBackgroundLines: {
                stroke: 'black',
                strokeWidth: 0,
              },
              color: () => AppColorPalette.orange,
            }}
            style={t`py-7 pr-12 col-center-center left-5 rounded-2xl`}
          />
        </View>
        <View style={t`row-center-center`}>
          <View style={t`items-center`}>
            <View style={t`row-center-center`}>
              <View style={t`bg-orange w-2 h-2 mr-2`} />
              <Text style={t`my-2`}>Total Gross Sales</Text>
            </View>
            <View
              style={t`bg-white w-36 pt-2 pb-2 rounded-full row-center-around`}>
              <Text style={t`text-orange`}>$4,135</Text>
            </View>
          </View>
          <View style={t`items-center justify-items-center ml-10`}>
            <View style={t`row-center-center`}>
              <View style={t`bg-black w-2 h-2 mr-2`} />
              <Text style={t`my-2`}>Total Bookings</Text>
            </View>
            <View
              style={t`bg-white w-36 pt-2 pb-2 rounded-full row-center-around`}>
              <Text>17</Text>
            </View>
          </View>
        </View>
        <View>
          <BarChart
            segments={3}
            width={WINDOW_WIDTH - 40}
            height={300}
            data={bookingsData}
            withCustomBarColorFromData={true}
            showBarTops={false}
            flatColor={true}
            chartConfig={{
              decimalPlaces: 0,
              backgroundGradientFrom: AppColorPalette.appBackgroundColor,
              backgroundGradientTo: AppColorPalette.appBackgroundColor,
              barPercentage: 0.3,
              propsForBackgroundLines: {
                stroke: AppColorPalette.appBackgroundColor,
              },
              color: () => 'black',
            }}
            style={t`pt-5 mt-7 pr-10 -inset-2 left-5`}
          />
        </View>
        <View style={{width: '90%'}}>
          <View style={t`row-center-between`}>
            <Text type="description" style={t`mr-2 font-semibold`}>
              Avg Sale Per Booking
            </Text>
            <View
              style={t`bg-white w-36 pt-2 pb-2 rounded-full row-center-around`}>
              <Icon
                color={AppColorPalette.orange}
                type="ionicon"
                name="options"
              />
              <Text style={t`text-orange`}>17</Text>
              <View />
            </View>
          </View>
          <View style={t`row-center-between mt-5`}>
            <Text type="description" style={t`mr-2 font-semibold`}>
              Total Profile Visitors
            </Text>
            <View
              style={t`bg-white w-36 pt-2 pb-2 rounded-full row-center-around`}>
              <Icon
                color={AppColorPalette.orange}
                type="ionicon"
                name="ios-person-circle-outline"
              />
              <Text style={t`text-orange`}>235</Text>
              <View />
            </View>
          </View>
          <View style={t`row-center-between mt-5`}>
            <Text type="description" style={t`mr-2 font-semibold`}>
              Total Message Recieved
            </Text>
            <View
              style={t`bg-white w-36 pt-2 pb-2 rounded-full row-center-around`}>
              <Icon
                color={AppColorPalette.orange}
                type="material-community"
                name="message-text-outline"
              />
              <Text style={t`text-orange`}>45</Text>
              <View />
            </View>
          </View>
          <View style={t`row-center-between mt-5`}>
            <Text type="description" style={t`mr-2 font-semibold`}>
              Avg Guests Per Booking
            </Text>
            <View
              style={t`bg-white w-36 pt-2 pb-2 rounded-full row-center-around`}>
              <Icon
                color={AppColorPalette.orange}
                type="ionicon"
                name="options"
              />
              <Text style={t`text-orange`}>4</Text>
              <View />
            </View>
          </View>
          <View>
            <Text type="label" style={t`mt-7`}>
              Most Popular Dishes:
            </Text>
            <View style={t`row-center-between mt-5`}>
              <View style={t`items-center`}>
                <View style={t`bg-white h-28 w-28 justify-between rounded-2xl`}>
                  <View style={t`p-2`}>
                    <Text>Menu 2</Text>
                    <Text>Entree 3</Text>
                  </View>
                  <Image
                    source={Pasta}
                    style={t`bottom-2 w-full rounded-lg h-15`}
                  />
                </View>
                <Text style={[t`mt-1 font-semibold text-orange`]}>
                  13 Orders
                </Text>
              </View>
              <View style={t`items-center`}>
                <View style={t`bg-white h-28 w-28 justify-between rounded-2xl`}>
                  <View style={t`p-2`}>
                    <Text>Menu 2</Text>
                    <Text>Entree 1</Text>
                  </View>
                  <Image
                    source={Sushi}
                    style={t`bottom-2 w-full rounded-lg h-15`}
                  />
                </View>
                <Text style={t`mt-1 font-semibold text-orange`}>10 Orders</Text>
              </View>
              <View style={t`items-center`}>
                <View style={t`bg-white h-28 w-28 justify-between rounded-2xl`}>
                  <View style={t`p-2`}>
                    <Text>Menu 1</Text>
                    <Text>Entree 2</Text>
                  </View>
                  <Image
                    source={Tacos}
                    style={t`bottom-2 w-full rounded-lg h-15`}
                  />
                </View>
                <Text style={[t`mt-1 font-semibold text-orange`]}>
                  7 Orders
                </Text>
              </View>
            </View>
          </View>
          <View style={t`my-7 flex-row`}>
            <View
              style={t`w-8/12 z-10 col-start-center p-7 px-10 h-50 bg-white rounded-2xl`}>
              <Text type="label">Weekly Auto Deposit - May 5</Text>
              <Text style={t`mt-2 text-orange`} type="large-header">
                $995
              </Text>
              <View style={t`row-start-start`}>
                <Text type="info" style={t`mt-2`}>
                  Golden 1 - 3572
                </Text>
                <Icon
                  size={18}
                  containerStyle={t`top-2 ml-1`}
                  color={AppColorPalette.orange}
                  type="material-community"
                  name="pencil-box-outline"
                />
              </View>
            </View>
            <View
              style={t`w-5/12 right-0 h-50 col-center-center rounded-2xl p-6 absolute pl-10 bg-orange`}>
              <Text type="label" style={t`text-white font-semibold`}>
                Instant Deposit
              </Text>
              <Text style={t`text-white mt-1`}>With 3% Fee</Text>
              <Text type="large-header" style={t`text-white mt-1 font-bold`}>
                $945
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
