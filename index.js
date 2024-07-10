import {AppRegistry} from 'react-native';
import App from './screens/App';
import TrackPlayer from 'react-native-track-player';
import service from './utils/service';
import { name as appName } from './app.json';

TrackPlayer.registerPlaybackService(() => service);

AppRegistry.registerComponent(appName, () => App);