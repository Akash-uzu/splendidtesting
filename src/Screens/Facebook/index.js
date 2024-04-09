import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {useNavigation} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import {logAnalyticsEvent} from '../../Analytics';

function Facebook(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');
  const [token, setToken] = useState('');
  const navigation = useNavigation();
  const getCurrentAccessToken = async () => {
    let accessToken = await AccessToken.getCurrentAccessToken();
    setToken(accessToken);
  };

  const predefinedEvent = async () => {
    let loggg = await analytics().logLogin({method: 'Facebook'});
    // navigation.navigate('Youtube');
    console.log(loggg);
  };
  const handleLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          alert('Login Cancelled ' + JSON.stringify(result));
        } else {
          getCurrentAccessToken();
          setResponse(result);
          predefinedEvent();
        }
      },
      function (error) {
        alert('Login failed with error: ' + error);
      },
    );
  };
  console.log(token);
  const handleLogout = () => {
    LoginManager.logOut();
    setResponse('');
    setToken('');
  };

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };
  const handleNormalLogin = async () => {
    try {
      await logAnalyticsEvent('clicked_customactivity_button_FB', {
        id: 37450923434,
        user: 'Akash',
        description: 'click FB logged',
      });
      // navigation.navigate('Youtube');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{token ? 'Logged in' : ''}</Text>
      {token && (
        <Text style={styles.response}>
          Access Token{JSON.stringify(token.accessToken)}
        </Text>
      )}
     
      {!response && (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            width: '85%',
            height: '15%',
          }}>
          <TouchableOpacity
            // title={'Login'}
            style={styles.button}
            onPress={handleNormalLogin}>
            <Text style={styles.buttonText}>{'Send custom Event'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            // title={'Continue with Facebook'}
            onPress={handleLogin}
            style={[styles.button, {backgroundColor: '#4267B2'}]}>
            <Text style={[styles.buttonText]}>{'Continue with Facebook'}</Text>
          </TouchableOpacity>
        </View>
      )}
      {response && (
        <TouchableOpacity
          // title={'Logout'}
          onPress={handleLogout}
          style={styles.button}
          text>
          <Text style={styles.buttonText}>{'Logout'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: 'grey',
  },
  response: {
    marginBottom: 20,
    color: 'black',
  },

  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  buttonText: {
    color: '#fff', // Text color
    fontSize: 16,
  },
});

export default Facebook;
