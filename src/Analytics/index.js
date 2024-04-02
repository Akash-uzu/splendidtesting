import analytics from '@react-native-firebase/analytics';

export const logAnalyticsEvent = async (eventName, params) => {
  try {
    await analytics().logEvent(eventName, params);
    console.log('Event logged:', eventName, 'with params:', params);
  } catch (error) {
    console.error('Error logging event:', error);
  }
};
