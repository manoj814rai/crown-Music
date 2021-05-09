"use strict"
import 'react-native-gesture-handler';
import React from 'react';
import {
    StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigators from './src/navigation/AppNavigator';
import {setTopLevelNavigator} from "./src/navigation/NavigationService";
import {COLOR} from "./src/utils/Constants";

const App = () => {
    return (
        <NavigationContainer
            ref={navigatorRef => { setTopLevelNavigator(navigatorRef)}}
            theme={{ colors: { background: COLOR.DARK_THEME_COLOR } }}
        >
          <StatusBar backgroundColor={COLOR.DARK_THEME_COLOR}/>
          <AppNavigators/>
        </NavigationContainer>
    );
};


export default App;
