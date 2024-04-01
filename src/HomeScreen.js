// HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';

const HomeScreen = ({ route }) => {
  const { accessToken } = route.params;

  return (
    <View>
      <Text>Access Token: {accessToken}</Text>
    </View>
  );
};

export default HomeScreen;
