"use strict"


import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    BackHandler
} from 'react-native';
import {COLOR} from '../utils/Constants'
import {getSongList} from "../lib/RestApi";
import {showToast} from '../utils/Toast';
import {Header, Icon} from 'react-native-elements';
import SongListItem from "../list/SongListItem";

class Song extends Component {
    constructor(props){
        super(props)
        this.state = {
            songList : [],
            isLoading: true,
            isFetching: false
        }
    }

    async componentDidMount() {
        let response = await getSongList();
        this.setState({
            songList: response.results,
            isLoading: false
        });
        if(response.error){
            showToast(response.error)
        }
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }


    backAction = () => {
        BackHandler.exitApp();
    };

    renderItem = (props) => {
    const {songList} = this.state;
      return (
          <SongListItem {...props} songList={songList}/>
      )
    };

    separatorItem = () => {
        return (
            <View style={{ height:10}} />
        )
    };

    reFetchSongList = async () => {
        let response = await getSongList();
        this.setState({
            songList: response.results,
            isFetching: false
        });
    };

    onRefresh = () => {
        this.setState({ isFetching: true },() => {this.reFetchSongList();});
    };

    render(){
        const {songList, isLoading, isFetching} = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <Header
                    centerComponent={{ text: 'My PlayList', style: styles.headerTitle}}
                    containerStyle={styles.headerContainer}
                    backgroundColor={COLOR.LIGHT_THEME_COLOR}
                    rightContainerStyle={{justifyContent:'center'}}
                />
                { isLoading ?
                    <View style={styles.loaderView}>
                        <ActivityIndicator size="large" color={'#fff'} />
                    </View> :
                    <FlatList
                        data={songList}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => `${index}`}
                        extraData={songList}
                        ItemSeparatorComponent={this.separatorItem}
                        onRefresh={this.onRefresh}
                        refreshing={isFetching}
                    />
                }

            </SafeAreaView>
        )
    }
};


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: COLOR.LIGHT_THEME_COLOR,
    },
    headerContainer:{
        backgroundColor: COLOR.LIGHT_THEME_COLOR,
        borderBottomWidth:0,
        paddingVertical:10
    },
    headerTitle: {
        color:'#fff',
        fontSize:16,
        fontWeight:'bold'
    },
    loaderView:{
        flex:1,
        backgroundColor: COLOR.DARK_THEME_COLOR,
        alignItems:'center',
        justifyContent:'center'
    }

});



export default Song;
