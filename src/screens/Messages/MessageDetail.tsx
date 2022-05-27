import {Input, Text} from '@rneui/themed/dist';
import React, {useContext} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Bubble,
  Day,
  GiftedChat,
  InputToolbar,
  Message,
  MessageImage,
  MessageText,
} from 'react-native-gifted-chat';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppColorPalette, commonStyles} from 'src/config/styles';
import User from '@assets/user1Female.jpg';
import User2 from '@assets/user2Male.jpg';
import User3 from '@assets/user3Male.jpg';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  LoginNavigationRoutes,
  LoginRoutesNames,
} from 'src/navigation/NavigationTypes';

const MessageDetail = () => {
  const route =
    useRoute<
      RouteProp<LoginNavigationRoutes, LoginRoutesNames['MESSAGE_DETAIL']>
    >();
  const April16Date = new Date(Date.UTC(2022, 3, 16, 17, 20, 0));
  const April18Date = new Date(Date.UTC(2022, 3, 18, 17, 20, 0));
  const nowDate = new Date(Date.now());
  const chatMessages = {
    'Rebecca Jones': [
      {
        _id: 1,
        text: `Hey how are you doing!`,
        createdAt: April16Date,
        user: {
          _id: 2,
          name: 'React Native',
          avatar: User,
        },
      },
      {
        _id: 2,
        text: 'Im doing good! Excited for this meal tonight.',
        createdAt: April16Date,
        user: {
          _id: 1,
          name: 'React Native',
          avatar: User,
        },
      },
      {
        _id: 3,
        text: 'Yeah of course! Before I head out, I was wondering if you had any limes and cilantro? Or if I should pick some up',
        createdAt: April16Date,
        user: {
          _id: 2,
          name: 'React Native',
          avatar: User,
        },
      },
      {
        _id: 4,
        text: 'Oh no worry! I got plenty in my fridge ready to go.',
        createdAt: April16Date,
        user: {
          _id: 1,
          name: 'React Native',
          avatar: User,
        },
      },
      {
        _id: 5,
        text: 'Appreciate it!',
        createdAt: April16Date,
        user: {
          _id: 2,
          name: 'React Native',
          avatar: User,
        },
      },
    ].reverse(),
    'Sam Robert': [
      {
        _id: 1,
        text: `Hey are you on the way?`,
        createdAt: April18Date,
        user: {
          _id: 1,
          name: 'React Native',
          avatar: User2,
        },
      },
      {
        _id: 2,
        text: 'Yes! I am about 14 minutes away.',
        createdAt: April18Date,
        user: {
          _id: 2,
          name: 'React Native',
          avatar: User2,
        },
      },
      {
        _id: 3,
        text: 'Okay man see you soon',
        createdAt: April18Date,
        user: {
          _id: 1,
          name: 'React Native',
          avatar: User2,
        },
      },
    ].reverse(),
    'Steve Smith': [
      {
        _id: 1,
        text: `Hey! do you have any Garlic? It said you have some, but just double checking since its important!`,
        createdAt: nowDate,
        user: {
          _id: 2,
          name: 'React Native',
          avatar: User3,
        },
      },
      {
        _id: 2,
        text: 'Yeah of course! I got more than I can possibly use haha.',
        createdAt: nowDate,
        user: {
          _id: 1,
          name: 'React Native',
          avatar: User3,
        },
      },
      {
        _id: 3,
        text: 'Okay sounds good!',
        createdAt: nowDate,
        user: {
          _id: 2,
          name: 'React Native',
          avatar: User3,
        },
      },
    ].reverse(),
  };

  const insets = useSafeAreaInsets();
  return (
    <GiftedChat
      messages={chatMessages[route.params.recipientDisplayName]}
      onSend={() => null}
      alignTop={false}
      listViewProps={{
        contentContainerStyle: {flexGrow: 1, justifyContent: 'flex-end'},
      }}
      bottomOffset={insets.bottom + 43}
      renderDay={renderDay}
      renderMessageText={renderMessageText}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      timeTextStyle={{left: {display: 'none'}, right: {display: 'none'}}}
      renderMessage={renderMessage}
      user={{
        _id: 2,
        name: 'Aaron',
        avatar: 'https://placeimg.com/150/150/any',
      }}
    />
  );
};

const styles = StyleSheet.create({
  MessagesContainer: {
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'column',
  },
  Message: {
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 20,
    padding: 20,
    maxWidth: '85%',
  },
  MessageUserText: {
    color: 'white',
  },
  MessageText: {},
  MessageRecipient: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
  },
  MessageUser: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: '#3492eb',
  },
});

const renderMessageText = props => (
  <MessageText
    {...props}
    containerStyle={{}}
    textStyle={{
      left: {color: 'black', fontFamily: 'WorkSans-Regular', fontWeight: '400'},
      right: {
        color: 'white',
        fontFamily: 'WorkSans-Regular',
        fontWeight: '400',
      },
    }}
  />
);

const renderInputToolbar = props => (
  <InputToolbar
    containerStyle={{
      borderTopColor: 'white',
    }}
    {...props}
  />
);

const renderBubble = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {padding: 8},
        right: {padding: 8, backgroundColor: AppColorPalette.orange},
      }}
    />
  );
};

const renderMessage = props => {
  return (
    <Message
      {...props}
      containerStyle={{
        left: {marginTop: 15, marginBottom: 15},
        right: {marginTop: 15, marginBottom: 15},
      }}
    />
  );
};

const renderDay = props => {
  return (
    <Day
      {...props}
      wrapperStyle={{marginTop: 20, marginBottom: 5}}
      dateFormat="ddd, MMM D"
    />
  );
};
export default MessageDetail;
