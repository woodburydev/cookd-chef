import {Icon, Image, LinearProgress, Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import User from '@assets/user1Female.jpg';
import User1 from '@assets/user2Male.jpg';
import User2 from '@assets/user3Male.jpg';
import {AppColorPalette, commonStyles} from 'src/config/styles';

export default function Reviews() {
  return (
    <ScrollView>
      <View style={commonStyles.FlexColCenterStart}>
        <View
          style={[
            commonStyles.mx20,
            {
              backgroundColor: 'white',
              width: '100%',
              paddingBottom: 20,
              paddingTop: 20,
            },
          ]}
        >
          <Text type="large-header" style={commonStyles.mb20} centerText>
            Your Reviews
          </Text>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={commonStyles.FlexRowCenterCenter}>
              <Text style={styles.ReviewTextStyle}>5</Text>
              <LinearProgress
                style={styles.loadingBar}
                variant="determinate"
                value={1}
                color={AppColorPalette.orange}
              />
            </View>
            <View style={commonStyles.FlexRowCenterCenter}>
              <Text style={styles.ReviewTextStyle}>4</Text>
              <LinearProgress
                style={styles.loadingBar}
                variant="determinate"
                value={0.7}
                color={AppColorPalette.orange}
              />
            </View>
            <View style={commonStyles.FlexRowCenterCenter}>
              <Text style={styles.ReviewTextStyle}>3</Text>
              <LinearProgress
                style={styles.loadingBar}
                variant="determinate"
                value={0.08}
                color={AppColorPalette.orange}
              />
            </View>
            <View style={commonStyles.FlexRowCenterCenter}>
              <Text style={styles.ReviewTextStyle}>2</Text>
              <LinearProgress
                style={styles.loadingBar}
                variant="determinate"
                value={0.1}
                color={AppColorPalette.orange}
              />
            </View>
            <View style={commonStyles.FlexRowCenterCenter}>
              <Text style={styles.ReviewTextStyle}>1</Text>
              <LinearProgress
                style={styles.loadingBar}
                variant="determinate"
                value={0.07}
                color={AppColorPalette.orange}
              />
            </View>
          </View>
        </View>
        <View
          style={[styles.TouchableOpacityContainer, styles.WhiteBackgroundView, commonStyles.mb10]}
        >
          <View>
            <Image
              source={User}
              style={[styles.CardImageStyle]}
              containerStyle={{marginLeft: 20}}
            />
          </View>
          <View style={{marginLeft: 10}}>
            <Text type="label">Rebecca Jones</Text>
            <View style={[commonStyles.FlexColStartStart, commonStyles.mt5]}>
              <Text style={styles.GrayText}>Absolutely Fantastic Service!!</Text>
              <View style={[commonStyles.FlexRowStartStart, commonStyles.mb5]}>
                {[...Array(5).keys()].map(() => (
                  <Icon type="font-awesome" name="star" size={11} iconStyle={styles.RatingIcon} />
                ))}
              </View>
              <Text style={styles.GrayText}>April 16th</Text>
            </View>
          </View>
        </View>

        <View
          style={[styles.TouchableOpacityContainer, styles.WhiteBackgroundView, commonStyles.mb10]}
        >
          <View>
            <Image
              source={User1}
              style={[styles.CardImageStyle]}
              containerStyle={{marginLeft: 20}}
            />
          </View>
          <View style={{marginLeft: 10}}>
            <Text type="label">Rob Kent</Text>
            <View
              style={[commonStyles.FlexColStartStart, commonStyles.mt5, styles.ReviewTextContainer]}
            >
              <Text style={styles.GrayText}>
                I found this chef to be one of the most professional, friendly, and inviting people
                I have come across in the personal chef business. Definitely a huge favorite, made
                great friends with him while he worked, and he made the most delicious food. Highly
                recommend
              </Text>
              <View style={[commonStyles.FlexRowStartStart, commonStyles.mb5]}>
                {[...Array(5).keys()].map(() => (
                  <Icon type="font-awesome" name="star" size={11} iconStyle={styles.RatingIcon} />
                ))}
              </View>
              <Text style={styles.GrayText}>April 14th</Text>
            </View>
          </View>
        </View>
        <View
          style={[styles.TouchableOpacityContainer, styles.WhiteBackgroundView, commonStyles.mb10]}
        >
          <View>
            <Image
              source={User2}
              style={[styles.CardImageStyle]}
              containerStyle={{marginLeft: 20}}
            />
          </View>
          <View style={{marginLeft: 10}}>
            <Text type="label">Joeseph Diaz</Text>
            <View
              style={[commonStyles.FlexColStartStart, commonStyles.mt5, styles.ReviewTextContainer]}
            >
              <Text style={styles.GrayText}>This guy is crazy good.</Text>
              <Text style={styles.GrayText}>
                I had the most fantastic time when I ordered from this chef. I would highly
                recommend this to all of my friends, some of the best food I have ever eaten in my
                life.
              </Text>
              <View style={[commonStyles.FlexRowStartStart, commonStyles.mb5]}>
                {[...Array(5).keys()].map(() => (
                  <Icon type="font-awesome" name="star" size={11} iconStyle={styles.RatingIcon} />
                ))}
              </View>
              <Text style={styles.GrayText}>April 12th</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = {
  loadingBar: {
    height: 15,
    width: '80%',
    backgroundColor: 'white',
  },
  ReviewTextContainer: {
    width: '80%',
  },
  ReviewTextStyle: {
    marginRight: 10,
  },
  GrayText: {
    color: '#717171',
    marginBottom: 5,
  },
  CardImageStyle: {
    height: 75,
    marginTop: 15,
    width: 75,
    marginRight: 10,
    borderRadius: 100,
  },
  WhiteBackgroundView: {
    backgroundColor: 'white',
    alignItems: 'flex-start',
    flexDirection: 'row',
    minHeight: 100,
    paddingTop: 10,
    paddingBottom: 10,
  },
  TouchableOpacityContainer: {
    width: '100%',
    display: 'flex',
  },
  RatingIcon: {
    color: AppColorPalette.orange,
  },
};
