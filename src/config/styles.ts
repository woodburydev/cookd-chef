import {createTheme} from '@rneui/themed';
import {Dimensions, StyleSheet} from 'react-native';

export const AppColorPalette = {
  orange: '#F26430',
  appBackgroundColor: '#F6F5F5',
  red: '#FF1643',
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
          borderRadius: 10,
        },
      };
    } else if (props.mode === 'miniRed') {
      return {
        titleStyle: {
          fontFamily: 'WorkSans-Regular',
          color: 'white',
          fontSize: 12,
          fontWeight: '700',
        },
        containerStyle: {
          borderRadius: 0,
        },
        buttonStyle: {
          padding: 0,
          backgroundColor: AppColorPalette.red,
          width: 100,
          height: 24,
          borderRadius: 0,
        },
      };
    } else if (props.mode === 'miniOrange') {
      return {
        titleStyle: {
          fontFamily: 'WorkSans-Regular',
          color: 'white',
          fontSize: 12,
          fontWeight: '700',
        },
        containerStyle: {
          borderRadius: 0,
        },
        buttonStyle: {
          padding: 0,
          borderRadius: 0,
          backgroundColor: AppColorPalette.orange,
          width: 100,
          height: 24,
        },
      };
    } else {
      return {
        titleStyle: {
          fontFamily: 'WorkSans-Regular',
          color: 'white',
          fontWeight: 'bold',
        },
        buttonStyle: {
          backgroundColor: '#F26430',
          width: 300,
          borderRadius: 10,
          height: 55,
        },
      };
    }
  },
  Input: {
    inputContainerStyle: { borderBottomWidth: 0, backgroundColor: 'white', alignItems: 'center', padding: 5, borderRadius: 10, height: windowHeight < 750 ? 40 : 50 },
    inputStyle: { marginLeft: 5 },
    style: {
      fontFamily: 'WorkSans-Regular',
      fontWeight: '400',
    },
    errorStyle: {
      margin: 0,
      fontFamily: 'WorkSans-Regular',
    },
  },
  Text: props => {
    switch (props.type) {
      case 'label':
        return {
          style: {
            fontSize: windowHeight < 750 ? 16 : 18,
            fontWeight: '600',
            fontFamily: 'WorkSans-Regular',
            textAlign: props.centerText ? 'center' : undefined,
          },
        };
      case 'description':
        return {
          style: {
            fontSize: windowHeight < 750 ? 14 : 16,
            fontFamily: 'WorkSans-Regular',
            textAlign: props.centerText ? 'center' : undefined,
          },
        };
      case 'header':
        return {
          style: {
            fontSize: windowHeight < 750 ? 20 : 22,
            fontWeight: '600',
            fontFamily: 'WorkSans-Regular',
            textAlign: props.centerText ? 'center' : undefined,
          },
        };
      case 'large-header':
        return {
          style: {
            fontSize: windowHeight < 850 ? 25 : 28,
            fontWeight: 'bold',
            fontFamily: 'WorkSans-Regular',
            textAlign: props.centerText ? 'center' : undefined,
          },
        };
      case 'info':
        return {
          style: {
            fontSize: windowHeight < 750 ? 12 : 14,
            fontFamily: 'WorkSans-Regular',
            textAlign: props.centerText ? 'center' : undefined,
          },
        };
      case 'error':
        return {
          style: {
            fontSize: windowHeight < 750 ? 12 : 14,
            color: 'red',
            fontFamily: 'WorkSans-Regular',
            textAlign: props.centerText ? 'center' : undefined,
          },
        };
      default: {
        return {
          style: {
            fontSize: 14,
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
  mt5: {
    marginTop: 5
  },
  mb5: {
    marginBottom: 5
  },
  mx5: {
    marginBottom: 5,
    marginTop: 5
  },
  mt10: {
    marginTop: 10
  },
  mb10: {
    marginBottom: 10
  },
  mx10: {
    marginTop: 10,
    marginBottom: 10,
  },
  mt20: {
    marginTop: 20
  },
  mb20: {
    marginBottom: 20
  },
  mx20: {
    marginTop: 20,
    marginBottom: 20,
  },
  mt30: {
    marginTop: 30
  },
  mb30: {
    marginBottom: 30
  },
  mx30: {
    marginTop: 30,
    marginBottom: 30,
  },
  FlexColCenterStart: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
  },
  FlexColStartCenter: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  FlexColStartStart: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
  },
  FlexRowStartStart: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
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
  FlexRowCenterCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  FlexRowCenterStart: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
  },
  FlexGrow: {
    flexGrow: 1,
  },
  Underline: {
    textDecorationLine: 'underline',
  },
  WhiteHeaderBackground: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  TransparentHeaderBackground: {
    backgroundColor: AppColorPalette.appBackgroundColor, shadowColor: 'transparent'
  }
});
