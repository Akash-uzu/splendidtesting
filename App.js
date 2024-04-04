import React, {useState} from 'react';
import MainStack from './src/Navigation/Mainstack';
import {NavigationContainer} from '@react-navigation/native';
import {linking} from './src/Constants/deeplinkingconstants';
import analytics from '@react-native-firebase/analytics';

const App = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  const gAnalyticsScreenTracker = async () => {
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
  
  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={gAnalyticsScreenTracker}>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
