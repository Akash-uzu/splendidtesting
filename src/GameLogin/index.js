import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';

const GameLogin = ({navigation}) => {
  return (
    <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
      {/* <Text style={{color: 'black'}}>Login</Text> */}
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          backgroundColor: 'lightblue',
          height: 60,
          width: 200,
          borderRadius: 20,
          justifyContent: 'center',
        }}
        onPress={() => navigation.navigate('GameTest')}>
        <Text style={{color: 'black', textAlign: 'center'}}>
          Click to play a Game
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GameLogin;
