import analytics from '@react-native-firebase/analytics';

export const logAnalyticsEvent = async (eventName, params) => {
  try {
    await analytics().logEvent(eventName, params);
    console.log('Event logged:', eventName, 'with params:', params);
  } catch (error) {
    console.error('Error logging event:', error);
  }
};

export const gAnalyticsScreenTracker = async (routeNameRef,navigationRef) => {
  const previousRouteName = routeNameRef.current;
  const currentRouteName = navigationRef.current.getCurrentRoute().name;

  if (previousRouteName !== currentRouteName) {
    await analytics().logScreenView({
      screen_name: currentRouteName,
      screen_class: currentRouteName,
    });
  }
  routeNameRef.current = currentRouteName;
};

