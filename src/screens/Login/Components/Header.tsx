import {Image} from '@rneui/themed';
import {LinearProgress} from '@rneui/themed/dist/LinearProgress';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator, Animated} from 'react-native';
import CookdLogo from 'src/assets/cookdlogo.png';
import {AppColorPalette} from 'src/config/styles';

export default function Header({
  loading,
  upArrow,
  downArrow,
  isVisible,
}: {
  loading: number;
  onPressUp?: () => any;
  onPressDown?: () => any;
  upArrow?: boolean;
  downArrow?: boolean;
  isVisible?: boolean;
}) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const styles = StyleSheet.create({
    HeaderContainer: {
      display: 'flex',
      position: 'absolute',
      zIndex: 100,
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '20%',
      width: '100%',
    },
    logoContainer: {
      height: 75,
      width: 75,
    },
    loadingBar: {
      height: 20,
      backgroundColor: 'undefined',
      width: '100%',
      alignSelf: 'flex-start',
    },
    iconsContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
      flexDirection: 'row',
      top: 20,
    },
    upArrow: {
      display: upArrow ? undefined : 'none',
    },
    downArrow: {
      display: downArrow ? undefined : 'none',
    },
    paddingView: {
      width: 25,
    },
  });

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }, 500);
    }
  }, [fadeAnim, isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View style={[styles.HeaderContainer, {opacity: fadeAnim}]}>
      <View />
      <View style={styles.iconsContainer}>
        <Image
          source={CookdLogo}
          style={styles.logoContainer}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>

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
    </Animated.View>
  );
}
