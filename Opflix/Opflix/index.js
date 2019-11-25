/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import MainScreen from './App';
import ProfileScreen from './android/app/src/pages/main/Main';
import SignInScreen from './android/app/src/pages/profile/Profile';

// criar a navegacao com o login - autenticacao
const AuthStack = createStackNavigator({
  Sign: {screen: SignInScreen},
});

const MainNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: MainScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: 'Main',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      inactiveBackgroundColor: '#000',
      activeBackgroundColor: '#000',
      style: {
        width: '100%',
        height: 50,
      },
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      MainNavigator,
      AuthStack,
    },
    {
      initialRouteName: 'AuthStack',
    },
  ),
);
AppRegistry.registerComponent(appName, () => App);
