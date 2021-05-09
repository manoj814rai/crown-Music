"use strict"


import React, {PureComponent} from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
} from 'react-native'
import { replace} from '../navigation/NavigationService';
import {SCREEN_NAMES, COLOR,} from '../utils/Constants';
import {Icon} from 'react-native-elements';

class Splash extends PureComponent {

    componentDidMount() {
        setTimeout(() => {
             replace(SCREEN_NAMES.Song);
        }, 500)
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Icon size={50} name="headphones" type='font-awesome' color={'#fff'}/>
                <Text style={styles.label}>{'Crown Music'}</Text>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
   container: {
       flex:1,
       backgroundColor: COLOR.DARK_THEME_COLOR,
       alignItems:'center',
       justifyContent:'center'
   },
   label: {
       fontWeight:'bold',
       fontSize: 24,
       color:'white'

   },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems:'center'
    }
});


export default Splash;
