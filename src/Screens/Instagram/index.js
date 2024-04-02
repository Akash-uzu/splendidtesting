import {View, Text, Button, Image} from 'react-native';
import React, {useEffect} from 'react';
import analytics from '@react-native-firebase/analytics';
import {useNavigation} from '@react-navigation/native';
import {IMG_URL} from '../Youtube';
import {logAnalyticsEvent} from '../../Analytics';

const Instagram = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Log the event when component mounts
    logAnalyticsEvent('instagram_page_view', {buttonName: 'initial'});
  }, []);

  //   const logAnalyticsEvent = async eventName => {
  //     try {
  //       await analytics().logEvent(eventName);
  //       console.log('Event logged:', eventName);
  //     } catch (error) {
  //       console.error('Error logging event:', error);
  //     }
  //   };

  const handleButtonPress = async () => {
    // Example of logging an event on button press
    await logAnalyticsEvent('instagram_button_pressed', {
      buttonName: 'Press Me',
    });
    // Add your button's logic here
    navigateToFacebook();
    //
  };
  const navigateToFacebook = () => {
    navigation.navigate('Facebook');
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black', fontSize: 24, marginBottom: 20}}>
        FROG
      </Text>
      <Image
        style={{width: 200, height: 200, marginVertical: 20, borderRadius: 100}}
        source={{
          uri: IMG_URL,
        }} // Example image URL
      />
      <Button title="Send data" onPress={handleButtonPress} />
    </View>
  );
};

export default Instagram;
