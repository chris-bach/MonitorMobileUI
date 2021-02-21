/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import MonitorMain from "./MonitorViews/MonitorMain";
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => MonitorMain);
