import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Facebook from '../Screens/Facebook';
import Instagram from '../Screens/Instagram';
import Twitter from '../Screens/Twitter';
import Youtube from '../Screens/Youtube';
import Login from '../Login';
import { memo } from 'react';

const Stack = createStackNavigator();
const LoginNavigator = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      freezeOnBlur={true}>
      <Stack.Screen name="Facebook" component={Facebook} />
      <Stack.Screen name="Instagram" component={Instagram} />
      <Stack.Screen name="Youtube" component={Youtube} />
      <Stack.Screen name="Twitter" component={Twitter} />
      {/* <Stack.Screen name="Home" component={HomeScreenStack} /> */}
    </Stack.Navigator>
  );
};

const LoginStack = memo(props => {
  return (
    <LoginNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <LoginNavigator.Screen name="Login" component={Login} />
    </LoginNavigator.Navigator>
  );
});

export default MainStack;
