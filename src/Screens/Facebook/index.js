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
  const handleLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          alert('Login Cancelled ' + JSON.stringify(result));
        } else {
          getCurrentAccessToken();
          setResponse(result);
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
  const handleNormalLogin = () => {
    async () =>
      await analytics().logEvent('Loggedin', {
        id: 3745092,
        user: 'Akash',
        description: ['didnt click FB', 'logged in'],
        duration: '10s',
      });
    navigation.navigate('Youtube');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{token ? 'Logged in' : 'Login'}</Text>
      {token && (
        <Text style={styles.response}>
          Access Token{JSON.stringify(token.accessToken)}
        </Text>
      )}
      {!token && (
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            // justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            placeholderTextColor={'grey'}
            onChangeText={handleEmailChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            placeholderTextColor={'grey'}
            onChangeText={handlePasswordChange}
          />
        </View>
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
            <Text style={styles.buttonText}>{'Login'}</Text>
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
    backgroundColor: '#fff',
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
