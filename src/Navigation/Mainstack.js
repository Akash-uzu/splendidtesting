import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Facebook from '../Screens/Facebook';
import Instagram from '../Screens/Instagram';
import Twitter from '../Screens/Twitter';
import Youtube from '../Screens/Youtube';
import Login from '../GameLogin';
import {memo} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GameLogin from '../GameLogin';
import GameView from '../Screens/Twitter';

const Stack = createStackNavigator();
const LoginNavigator = createStackNavigator();
const Tab = createBottomTabNavigator();

const getIcons = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;

    switch (route.name) {
      case 'Facebook':
        iconName = 'facebook';
        break;
      case 'Instagram':
        iconName = 'instagram';
        break;
      case 'Youtube':
        iconName = 'youtube';
        break;
      case 'Game':
        iconName = 'gamepad-variant';
        break;
      default:
        iconName = 'emoticon-dead';
    }

    return (
      <MaterialIcons
        name={iconName}
        size={size}
        color={color}
        style={{height: 30, width: 30}}
      />
    );
  },
});
const MainStack = props => {
  return (
    <Tab.Navigator screenOptions={getIcons} freezeOnBlur={true}>
      <Tab.Screen name="Facebook" component={Facebook} />
      <Tab.Screen name="Instagram" component={Instagram} />
      <Tab.Screen name="Youtube" component={Youtube} />
      <Tab.Screen name="Game" component={GameStack} />
      {/* <Tab.Screen name="Home" component={HomeScreenTab} /> */}
    </Tab.Navigator>
  );
};

const GameStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      key="GameGameTestLogin"
      initialRouteName="GameLogin">
      <Stack.Screen name="GameLogin" component={GameLogin} />
      <Stack.Screen name="GameTest" component={GameView} />
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
