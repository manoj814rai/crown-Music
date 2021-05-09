"use strict"

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../containers/Splash';
import Song from '../containers/Song';
import {SCREEN_NAMES} from '../utils/Constants';
import SongDetail from "../containers/SongDetail";

const Stack = createStackNavigator();

const AppNavigators = () => {
    let options = {headerShown:false, mode: 'modal '}
    return (
        <Stack.Navigator>
            <Stack.Screen name={SCREEN_NAMES.Splash} component={Splash} options={options}/>
            <Stack.Screen name={SCREEN_NAMES.Song} component={Song} options={options}/>
            <Stack.Screen name={SCREEN_NAMES.SongDetail} component={SongDetail} options={options}/>
        </Stack.Navigator>
    );
};

export default AppNavigators