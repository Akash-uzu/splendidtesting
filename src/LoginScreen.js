// LoginScreen.js
import React, { useEffect } from 'react';
import { View, Button, Linking } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

const LoginScreen = ({ navigation }) => {
  useEffect(() => {
    const handleDeepLink = async (event) => {
      const { url } = event;
      if (url.includes('access_token=')) {
        const accessToken = url.split('access_token=')[1];
        navigation.navigate('Home', { accessToken });
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    return () => Linking.removeEventListener('url', handleDeepLink);
  }, [navigation]);

  const handleLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (!result.isCancelled) {
        // Handle successful login
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View>
      <Button title="Login with Facebook" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
