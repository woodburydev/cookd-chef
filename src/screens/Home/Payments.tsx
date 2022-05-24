import { Button, Icon, Image, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { AppColorPalette, commonStyles } from 'src/config/styles';
import { Dropdown } from 'react-native-element-dropdown';
import { Switch } from "@rneui/themed";
import { ScrollView } from 'react-native-gesture-handler';
import Pasta from '@assets/pasta.jpg';
import Sushi from '@assets/sushi.jpg';
import Tacos from '@assets/tacos.jpg';

const width = Dimensions.get('window').width
const minValue = 0;

function* yLabel() {
  yield* [minValue, 150, 300, 450, 600, 750];
}

const datapoints = [175, 455, 305, 675, 350, 0, 200, 570, 500, 475].map(
  (datapoint) => datapoint - minValue - 1,
);
const chartData = {
  labels: ["1", "3", "6", "9", "12", "15", "18", "21", "24", "27", "30"],
  datasets: [
    {
      // count of each "job" per day.
      data: datapoints,
      colors: [
        () => AppColorPalette.orange,
        () => AppColorPalette.orange,
        () => AppColorPalette.orange,
        () => AppColorPalette.orange,
        () => AppColorPalette.orange,
        () => AppColorPalette.orange,
        () => AppColorPalette.orange,
        () => AppColorPalette.orange,
        () => AppColorPalette.orange,
        () => AppColorPalette.orange,
        () => AppColorPalette.orange,
      ]
    }
  ]
};
const bookingsData = {
  labels: ["1", "3", "6", "9", "12", "15", "18", "21", "24", "27", "30"],
  datasets: [
    {
      // count of each "job" per day.
      data: [1, 2, 1, 0, 2, 3, 0, 2, 1, 2, 3],
      colors: [
        () => 'black',
        () => 'black',
        () => 'black',
        () => 'black',
        () => 'black',
        () => 'black',
        () => 'black',
        () => 'black',
        () => 'black',
        () => 'black',
        () => 'black',
      ]
    }
  ]
};

const chartDataBookings = {
  labels: ["M", "T", "W", "Th", "F", "S", "S"],
  datasets: [
    {
      // count of each "job" per day.
      data: [1, 2, 1, 0, 2, 3, 0]
    }
  ]
};
const windowHeight = Dimensions.get('window').height;

const howManyGuests = [
  {
    value: "Last Week",
    lable: "Last Week",
  },
  {
    value: "Last Month",
    lable: "Last Month",
  },
  {
    value: "3 Months",
    lable: "3 Months",
  },
  {
    value: "1 Year",
    lable: "1 Year",
  },
  {
    value: "All Time",
    lable: "All Time",
  },
];

export default function Payments() {
  const yLabelIterator = yLabel();
  const [filter, setFilter] = useState();
  return (
    <ScrollView>
      <View style={[commonStyles.FlexColCenterStart]}>
        <View style={[commonStyles.FlexRowCenterBetween, { width: '90%' }, commonStyles.mt20]}>
          <Text type='large-header'>Analytics</Text>
          <Dropdown
            style={[styles.dropdown, { width: 175 }]}
            disable={true}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextProps={{ style: styles.placeholderStyle }}
            iconStyle={styles.iconStyle}

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
            width={width - 40}
            height={250}
            segments={5}
            data={chartData}
            withCustomBarColorFromData={true}
            flatColor={true}
            yAxisLabel="$"
            chartConfig={{
              decimalPlaces: 0,
              labelColor: () => "black",
              backgroundGradientFromOpacity: 0,
              formatYLabel: () => yLabelIterator.next().value,
              stackedBar: true,
              barPercentage: .3,
              backgroundGradientFrom: AppColorPalette.appBackgroundColor,
              backgroundGradientTo: AppColorPalette.appBackgroundColor,
              propsForBackgroundLines: {
                stroke: 'black',
                strokeWidth: 0
              },
              color: () => AppColorPalette.orange,
            }}
            style={{
              marginVertical: 10,
              paddingTop: 30,
              paddingRight: 40,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              top: -25,
              left: 20,
              borderRadius: 16,
            }}
          />
        </View>
        <View style={[commonStyles.FlexRowCenterCenter]}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
              <View style={{ backgroundColor: AppColorPalette.orange, width: 10, height: 10, marginRight: 10 }} />
              <Text style={commonStyles.mx10}>Total Gross Sales</Text>
            </View>
            <View style={styles.WhiteBubble}>
              <Text style={{ color: AppColorPalette.orange }}>$4,135</Text>
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 40 }}>
            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
              <View style={{ backgroundColor: "black", width: 10, height: 10, marginRight: 10 }} />
              <Text style={commonStyles.mx10}>Total Bookings</Text>
            </View>
            <View style={styles.WhiteBubble}>
              <Text style={{ color: 'black' }}>17</Text>
            </View>
          </View>
        </View>
        <View>
          <BarChart
            segments={3}
            width={width - 40}
            height={300}
            data={bookingsData}
            withCustomBarColorFromData={true}
            showBarTops={false}
            flatColor={true}
            chartConfig={{
              decimalPlaces: 0,
              backgroundGradientFrom: AppColorPalette.appBackgroundColor,
              backgroundGradientTo: AppColorPalette.appBackgroundColor,
              barPercentage: .3,
              propsForBackgroundLines: {
                stroke: AppColorPalette.appBackgroundColor
              },
              color: () => "black",
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
        <View style={{ width: '90%' }}>
          <View style={[commonStyles.FlexRowCenterBetween]}>
            <Text type="description" style={styles.LabelBubble}>Avg Sale Per Booking</Text>
            <View style={[styles.WhiteBubble]}>
              <Icon color={AppColorPalette.orange} type="ionicon" name="options" />
              <Text style={{ color: AppColorPalette.orange }}>17</Text>
              <View />
            </View>
          </View>
          <View style={[commonStyles.FlexRowCenterBetween, , commonStyles.mt20]}>
            <Text type="description" style={styles.LabelBubble}>Total Profile Visitors</Text>
            <View style={styles.WhiteBubble}>
              <Icon color={AppColorPalette.orange} type="ionicon" name="ios-person-circle-outline" />
              <Text style={{ color: AppColorPalette.orange }}>235</Text>
              <View />
            </View>
          </View>
          <View style={[commonStyles.FlexRowCenterBetween, , commonStyles.mt20]}>
            <Text type="description" style={styles.LabelBubble}>Total Message Recieved</Text>
            <View style={styles.WhiteBubble}>
              <Icon color={AppColorPalette.orange} type="material-community" name="message-text-outline" />
              <Text style={{ color: AppColorPalette.orange }}>45</Text>
              <View />
            </View>
          </View>
          <View style={[commonStyles.FlexRowCenterBetween, commonStyles.mt20]}>
            <Text type="description" style={styles.LabelBubble}>Avg Guests Per Booking</Text>
            <View style={styles.WhiteBubble}>
              <Icon color={AppColorPalette.orange} type="ionicon" name="options" />
              <Text style={{ color: AppColorPalette.orange }}>4</Text>
              <View />
            </View>
          </View>
          <View>
            <Text type="label" style={[styles.LabelText, commonStyles.mt30]}>Most Popular Dishes:</Text>
            <View style={[commonStyles.FlexRowCenterBetween, commonStyles.mt20]}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.CardStyle}>
                  <View style={styles.CardTextStyle}>
                    <Text>Menu 2</Text>
                    <Text>Entree 3</Text>
                  </View>
                  <Image source={Pasta} style={styles.CardImageStyle} />
                </View>
                <Text style={[commonStyles.mt5, styles.RedText]}>13 Orders</Text>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.CardStyle}>
                  <View style={styles.CardTextStyle}>
                    <Text>Menu 2</Text>
                    <Text>Entree 1</Text>
                  </View>
                  <Image source={Sushi} style={styles.CardImageStyle} />
                </View>
                <Text style={[commonStyles.mt5, styles.RedText]}>10 Orders</Text>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.CardStyle}>
                  <View style={styles.CardTextStyle}>
                    <Text>Menu 1</Text>
                    <Text>Entree 2</Text>
                  </View>
                  <Image source={Tacos} style={styles.CardImageStyle} />
                </View>
                <Text style={[commonStyles.mt5, styles.RedText]}>7 Orders</Text>
              </View>
            </View>
          </View>
          <View style={[commonStyles.mx30, { flexDirection: 'row' }]}>
            <View style={[styles.AutoDepositCardContainerLeft]}>
              <Text type="label">Weekly Auto Deposit - May 5</Text>
              <Text style={[commonStyles.mt10, { color: AppColorPalette.orange }]} type="large-header">$995</Text>
              <View style={[commonStyles.FlexRowStartStart, { alignSelf: 'flex-start' }]}>
                <Text type="info" style={commonStyles.mt10}>Golden 1 - 3572</Text>
                <Icon size={18} containerStyle={{top: 9, marginLeft: 5}} color={AppColorPalette.orange} type="material-community" name="pencil-box-outline" />
              </View>
            </View>
            <View style={styles.AutoDepositCardContainerRight}>
              <Text type="label" style={[styles.AutoDepositCardContainerRightText, { fontWeight: '600' }]}>Instant Deposit</Text>
              <Text style={styles.AutoDepositCardContainerRightText}>With 3% Fee</Text>
              <Text type="large-header" style={[styles.AutoDepositCardContainerRightText, commonStyles.mt5, { fontWeight: '700' }]}>$945</Text>
            </View>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  RedText: {
    color: AppColorPalette.orange,
    fontWeight: '600'
  },
  AutoDepositCardContainerLeft: {
    width: '65%',
    zIndex: 100,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 30,
    height: 200,
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 20
  },
  AutoDepositCardContainerRight: {
    width: '40%',
    right: 0,
    height: 200,
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    padding: windowHeight < 750 ? 20 : 25,
    position: 'absolute',
    backgroundColor: AppColorPalette.orange,
  },
  AutoDepositCardContainerRightText: {
    color: 'white',
  },
  placeholderStyle: {
    left: 15,
    fontWeight: '600',
    color: 'black',
    fontSize: windowHeight < 750 ? 16 : 18,
    fontFamily: 'WorkSans-Regular',
  },
  CardTextStyle: {
    padding: 8
  },
  selectedTextStyle: {
    left: 15,
    fontWeight: '400',
    color: 'black',
    fontSize: windowHeight < 750 ? 16 : 18,
    fontFamily: 'WorkSans-Regular',
  },
  iconStyle: {
    width: 20,
    height: 20,
    right: 15
  },
  CardStyle: {
    backgroundColor: "white",
    width: 110,
    height: 110,
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  WhiteBubble: {
    backgroundColor: 'white', width: 150, paddingTop: 10, paddingBottom: 10, borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  LabelBubble: {
    marginRight: 10,
    fontWeight: '600',
  },
  LabelText: {
    alignSelf: 'flex-start',
  },
  CardImageStyle: {
    bottom: 10,
    width: '100%',
    borderRadius: 10,
    height: 60
  }
})