// import React, {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   Button,
//   Image,
// } from 'react-native';
// // import InstagramLogin from 'react-native-instagram-login';
// // import CookieManager from '@react-native-community/cookies';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import axios from 'axios';
// import ListVideos from './src/Screens/Youtube/ListVideos';

// const ANDROID_CLIENT_ID =
//   '956864900955-lcp5c1mgf40gm4kka4t1rb9k0tdajr2b.apps.googleusercontent.com';
// const WEB_CLIENT_ID =
//   '956864900955-er86drbm1dl7mlr4cef8vqa3o6bfpvc7.apps.googleusercontent.com';
// const DEFAULT_IMG =
//   'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1711445775~exp=1711446375~hmac=65b06998c4d86e76e4f72f170743c1c3af24fd1a3063f6b9c5aca58c2f3777d4';

// export default function App() {
//   const [error, setError] = useState();
//   const [userInfo, setUserInfo] = useState();
//   const [idToken, setIdToken] = useState('');
//   const [channelId, setChannelId] = useState('');
//   const [videos, setVideos] = useState([]);

//   const configureGoogleSignIn = () => {
//     GoogleSignin.configure({
//       // androidClientId: ANDROID_CLIENT_ID,
//       webClientId: WEB_CLIENT_ID,
//       offlineAccess: true,
//       scopes: [
//         'profile',
//         'email',
//         'https://www.googleapis.com/auth/youtube.readonly',
//       ],
//     });
//   };

//   useEffect(() => {
//     configureGoogleSignIn();
//   }),
//     [];

//   const signIn = async () => {
//     console.log('Pressed sign in');

//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       const tokens = await GoogleSignin.getTokens();

//       if (userInfo) {
//         setUserInfo(userInfo);
//         setIdToken(tokens);
//         setError('');
//       }
//       axios
//         .get('https://www.googleapis.com/youtube/v3/channels', {
//           params: {
//             part: 'snippet',
//             mine: true,
//             access_token: tokens.accessToken,
//           },
//         })
//         .then(response => {
//           if (
//             response.data &&
//             response.data.items &&
//             response.data.items.length > 0
//           ) {
//             const channelId = response.data.items[0].id;
//             setChannelId(channelId);
//             console.log('Channel ID:', channelId);
//           } else {
//             console.error('No channel data found in the response');
//           }
//         })
//         .catch(error => {
//           console.error('Failed to fetch channel data:', error);
//         });
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         // user cancelled the login flow
//         alert('User cancelled the login flow !');
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         alert('Signin in progress');
//         // operation (f.e. sign in) is in progress already
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         alert('Google play services not available or outdated !');
//         // play services not available or outdated
//       } else {
//         console.log(error);
//       }
//     }
//   };
//   // console.log(userInfo);
//   console.log(error);
//   const logout = () => {
//     setUserInfo(undefined);
//     setIdToken('');
//     setVideos("")
//     GoogleSignin.revokeAccess();
//     GoogleSignin.signOut();
//   };
//   // console.log(channelId, 'channelId');
//   useEffect(() => {
//     if (userInfo && channelId) {
//       axios
//         .get('https://www.googleapis.com/youtube/v3/search', {
//           params: {
//             part: 'snippet',
//             channelId: channelId,
//             maxResults: 1,
//             order: 'date',
//             type: 'video',
//             key: 'AIzaSyBomQECZ-CMnXze8uVygfL9SAeKOVakol8',
//           },
//         })
//         .then(response => {
//           setVideos(response.data.items);
//         })
//         .catch(error => {
//           console.error('Failed to fetch videos', error);
//         });
//     }
//   }, [userInfo, channelId]);
//   // console.log(videos);
//   const image_url =
//     userInfo && userInfo.user && userInfo.user.photo ? userInfo.user.photo : '';
//   return (
//     <View style={styles.container}>
//       {/* <Text style={{color: 'black'}}>Hi {userInfo?.user?.givenName}</Text> */}
//       <Text style={{color: 'black', fontWeight: '800'}}>
//         Access Token: {JSON.stringify(idToken?.accessToken)}
//       </Text>

//       <Image
//         source={{
//           uri: image_url ? image_url : DEFAULT_IMG,
//         }}
//         style={{width: 50, height: 50}}
//       />

//       {userInfo ? (
//         <Button title="Logout" onPress={logout} />
//       ) : (
//         <GoogleSigninButton
//           size={GoogleSigninButton.Size.Standard}
//           color={GoogleSigninButton.Color.Dark}
//           onPress={signIn}
//         />
//       )}
//       {videos && <ListVideos videos={videos} />}

//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import MainStack from './src/Navigation/Mainstack';
import {NavigationContainer} from '@react-navigation/native';
import {config} from 'process';

const App = () => {
  const linking = {
    prefixes: ['splendidplus://', 'deeplinking://', 'https://splendidplus.com'],
    config: {
      screens: {
        Facebook: {
          path: 'Facebook/:authresponse',
        },
        Youtube: {
          path: 'Youtube/:authresponse',
        },
      },
    },
  };
  return (
    <NavigationContainer linking={linking}>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
