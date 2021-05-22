import React, { useState, useEffect, useRef } from 'react';
import { Image, View, Platform } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, Text, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import {LoginProvider} from "./context/LogInContext";

// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();

import MonitorScreens from "./navigation/MonitorScreens";
import { Images, articles, argonTheme } from './constants';
import { Button } from "./components";

/**
 * @author CreativeTIM, Manik Bagga, Matt Belgre, Chris Bautista
 * @description This file is the entry point of the app.
 */

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo,
];

// cache product images
articles.map(article => assetImages.push(article.image));

/**
 * @author CreativeTIM
 * @description The following functions begin to load the app's assets
 */

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const App = props => {

  const [appState, setAppState] = useState({
    isLoadingComplete: false,
    fontLoaded: false,
  });

  const loadResourcesAsync = async () => {
    return Promise.all([
      ...cacheImages(assetImages), fetchFonts()
    ]);
  };

  const handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  const handleFinishLoading = () => {
    if(appState.fontLoaded) {
      setAppState({ isLoadingComplete: true });
    }
  };

  const fetchFonts = () => {
    Font.loadAsync({
      'open-sans-regular': require('./assets/font/OpenSans-Regular.ttf'),
      'open-sans-light': require('./assets/font/OpenSans-Light.ttf'),
      'open-sans-bold': require('./assets/font/OpenSans-Bold.ttf'),
    });
    setAppState({ fontLoaded: true });
  }

  /**
   * @author CreativeTIM, Manik Bagga, Chris Bautista
   * @description The following functions then set up the context, navigation, then renders the splash and login screen.
   */

  if(!appState.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={loadResourcesAsync}
          onError={handleLoadingError}
          onFinish={handleFinishLoading}
        />
      );
    } else {
      return (
        <LoginProvider>
          <NavigationContainer>
            <GalioProvider theme={argonTheme}>
              <Block flex>
                <MonitorScreens />
              </Block>
            </GalioProvider>
          </NavigationContainer>
        </LoginProvider>
      );
    }
}

export default App;
