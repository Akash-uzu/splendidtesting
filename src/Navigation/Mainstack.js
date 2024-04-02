import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Facebook from '../Screens/Facebook';
import Instagram from '../Screens/Instagram';
import Twitter from '../Screens/Twitter';
import Youtube from '../Screens/Youtube';
import Login from '../Login';
import {memo} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const LoginNavigator = createStackNavigator();
const Tab = createBottomTabNavigator();

const getIcons = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;

    if (route.name === 'Facebook') {
      iconName = 'facebook';
    } else if (route.name === 'Instagram') {
      iconName = 'instagram';
    } else if (route.name === 'Youtube') {
      iconName = 'youtube';
    } else if (route.name === 'Twitter') {
      iconName = 'twitter';
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
      <Tab.Screen name="Twitter" component={Twitter} />
      {/* <Tab.Screen name="Home" component={HomeScreenTab} /> */}
    </Tab.Navigator>
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
