import {createTheme} from '@rneui/themed';
import {Dimensions, StyleSheet} from 'react-native';

export const AppColorPalette = {
  orange: '#F26430',
  appBackgroundColor: '#F6F5F5',
};

const windowHeight = Dimensions.get('window').height;
export const myTheme = createTheme({
  Button: props => {
    if (props.mode === 'warning') {
      return {
        titleStyle: {
          fontFamily: 'WorkSans-Regular',
          color: 'black',
          fontSize: 13,
          fontWeight: '600',
        },
        buttonStyle: {
          backgroundColor: '#F8EFA0',
          width: 200,
          height: 40,
        },
      };
    } else {
      if (props.circle) {
        return {
          buttonStyle: {
            backgroundColor: '#F26430',
            width: windowHeight < 850 ? 65 : 75,
            height: windowHeight < 850 ? 65 : 75,
            borderRadius: 50,
          },
        };
      }
      return {
        titleStyle: {
          fontFamily: 'WorkSans-Regular',
          color: 'white',
          fontWeight: '600',
        },
        buttonStyle: {
          backgroundColor: '#F26430',
          width: 300,
          height: 55,
        },
      };
    }
  },
  Input: {
    containerStyle: {
      height: windowHeight < 750 ? 60 : 70,
    },
    style: {
      fontFamily: 'WorkSans-Regular',
      fontWeight: '400',
    },
    errorStyle: {
      margin: 0,
      marginTop: 20,
      fontFamily: 'WorkSans-Regular',
    },
  },
  Text: props => {
    switch (props.type) {
      case 'label':
        return {
          style: {
            fontSize: 18,
            fontWeight: '600',
            fontFamily: 'WorkSans-Regular',
            textAlign: props.centerText ? 'center' : undefined,
          },
        };
      case 'description':
        return {
          style: {
            fontSize: 16,
            fontFamily: 'WorkSans-Regular',
            textAlign: props.centerText ? 'center' : undefined,
          },
        };
      case 'header':
        return {
          style: {
            fontSize: 22,
            fontWeight: '600',
            fontFamily: 'WorkSans-Regular',
            textAlign: props.centerText ? 'center' : undefined,
          },
        };
      case 'info':
        return {
          style: {
            fontSize: 12,
            fontFamily: 'WorkSans-Regular',
            textAlign: props.centerText ? 'center' : undefined,
          },
        };
      case 'error':
        return {
          style: {
            fontSize: 14,
            color: 'red',
            fontFamily: 'WorkSans-Regular',
            textAlign: props.centerText ? 'center' : undefined,
          },
        };
      default: {
        return {
          style: {
            fontFamily: 'WorkSans-Regular',
          },
        };
      }
    }
  },
});

export const commonStyles = StyleSheet.create({
  FlexColCenterCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  FlexColCenterStart: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
  },
  FlexColCenterSpaceAround: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
  FlexRowCenterBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  FlexGrow: {
    flexGrow: 1,
  },
  Underline: {
    textDecorationLine: 'underline',
  },
});
