import {View, Text, Button, Image} from 'react-native';
import React, {useEffect} from 'react';
import analytics from '@react-native-firebase/analytics';
import {useNavigation} from '@react-navigation/native';
export const IMG_URL =
  'https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg.webp';
const Youtube = () => {
  const navigation = useNavigation();

  useEffect(() => {
    logAnalyticsEvent('youtube_page_view', {buttonName: 'initial'});
  }, []);

  const logAnalyticsEvent = async (eventName, params) => {
    try {
      await analytics().logEvent(eventName, params);
      console.log('Event logged:', eventName, 'with params:', params);
    } catch (error) {
      console.error('Error logging event:', error);
    }
  };

  const handleButtonPress = async () => {
    await logAnalyticsEvent('game_button_pressed', {buttonName: 'Press Me'});
    navigateToInstagram();
  };
  const navigateToInstagram = () => {
    navigation.navigate('Twitter');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'white',
      }}>
      <Text style={{color: 'black', fontSize: 24, marginBottom: 20}}>
        Another Frog
      </Text>
      <Image
        style={{width: 200, height: 200, marginBottom: 20, borderRadius: 100}}
        source={{
          uri: IMG_URL,
        }}
      />
      <Button title=" Play a game" onPress={handleButtonPress} />
    </View>
  );
};

export default Youtube;
