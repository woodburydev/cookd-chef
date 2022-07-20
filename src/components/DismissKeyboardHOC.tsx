import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const DismissKeyboardHOC = () => {
  return ({children, ...props}: any) => {
    return (
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={props.style}>
        {children}
      </ScrollView>
    );
  };
};
export const DismissKeyboardView = DismissKeyboardHOC();
