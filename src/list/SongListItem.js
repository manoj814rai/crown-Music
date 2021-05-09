"use strict"


import React, {PureComponent} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import {SCREEN_NAMES, COLOR} from '../utils/Constants';
import {Avatar} from 'react-native-elements'
import {navigate} from "../navigation/NavigationService";

class SongListItem extends PureComponent {

    getTrackDuration = () => {
        const {item} = this.props;
        let trackTimeMins = (item.trackTimeMillis / 60000);
        return isNaN(trackTimeMins) ? null : `${trackTimeMins.toFixed(2)}m`;
    };

    onPressListItem = () => {
        const { item, songList, index } = this.props;
        navigate(SCREEN_NAMES.SongDetail, {songDetail: item, songList, currentIndex:index})
    };

    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={this.onPressListItem}>
               <View style={styles.rowLeftContent}>
                   <Avatar rounded size="medium" source={{uri: item.artworkUrl100}}/>
                   <View style={{paddingHorizontal:5}}>
                       <Text style={styles.trackName}
                              >{item.trackName}</Text>
                       <View style={{flexDirection: 'row'}}>
                           <Text style={styles.artistName}>{item.artistName}</Text>
                           <Text style={styles.trackTime}>{this.getTrackDuration()}</Text>
                       </View>
                       <Text style={styles.type}>{item.primaryGenreName}</Text>
                   </View>
               </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.DARK_THEME_COLOR,
        justifyContent:'space-between',
        flexDirection:'row',
        marginHorizontal:10,
        borderRadius:5,
        paddingVertical:10,
        paddingHorizontal:10,
        alignItems:'center'
    },
    rowLeftContent: {
        flexDirection:'row',
        alignItems:'center',
    },
    label: {
        fontWeight:'bold',
        fontSize: 20,
        color:'white',

    },
    trackName: {
        fontSize: 14,
        color:'white',
        paddingHorizontal: 5,
        flexWrap:'wrap',
    },
    trackTime: {
        fontSize: 12,
        color:'#92a9df',
    },
    type: {
        fontSize: 10,
        color:'#92a9df',
        paddingHorizontal: 5
    },
    artistName: {
        fontSize: 12,
        color:'#92a9df',
        paddingHorizontal: 5
    }
});


export default SongListItem;
