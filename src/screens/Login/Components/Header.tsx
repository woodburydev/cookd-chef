import { Image, Text } from '@rneui/themed';
import { LinearProgress } from '@rneui/themed/dist/LinearProgress';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import CookdLogo from 'src/assets/cookdlogo.png';
import { AppColorPalette } from 'src/config/styles';
import DeviceInfo from 'react-native-device-info';
import { Icon } from '@rneui/base';

export default function Header({
  loading,
  headerContainerStyle,
  backArrow,
  headerText,
  onPressBack,
  loginPages,
  ...rest
}: {
  loading?: number;
  headerContainerStyle?: {}
  backArrow?: boolean;
  headerText?: string;
  onPressBack?: () => any;
  loginPages?: boolean;
}) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const styles = StyleSheet.create({
    HeaderContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: DeviceInfo.hasNotch() ? 50 : 100,
      width: '100%',
      ...headerContainerStyle,
    },
    logoContainer: {
      height: 75,
      width: 75,
    },
    loadingBar: {
      height: 15,
      width: '100%',
      alignSelf: 'flex-start',
    },
    iconsContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
      height: DeviceInfo.hasNotch() ? 75 : 100,
      flexDirection: 'row',
      top: loginPages ? 15 : 0
    },
    paddingView: {
      width: 25,
    },
    arrowBack: {
      position: 'absolute',
      left: 0,
    }
  });

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 500);
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.HeaderContainer, { opacity: loginPages ? fadeAnim : 1 }]}>
      <View />
      <View style={styles.iconsContainer}>
        {backArrow &&
          <View style={styles.arrowBack}>
            <Icon type="ionicon" name="arrow-back" onPress={onPressBack} />
          </View>}
        {
          headerText ? <Text type="header">{headerText}</Text> : <Image
            source={CookdLogo}
            style={styles.logoContainer}
            PlaceholderContent={<ActivityIndicator />}
          />
        }

      </View>
      {
        loading && (
          <LinearProgress
            style={styles.loadingBar}
            variant="determinate"
            value={loading}
            color={
              loading > 0
                ? AppColorPalette.orange
                : AppColorPalette.appBackgroundColor
            }
          />
        )
      }

    </Animated.View>
  );
}
