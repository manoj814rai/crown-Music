"use strict"


import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    BackHandler,
} from 'react-native';
import {COLOR} from '../utils/Constants'
import {Header, Icon, } from 'react-native-elements';
import {Avatar} from 'react-native-elements'
import TrackPlayer from 'react-native-track-player';

class SongDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            isPlayingSong: false,
            songList: [],
            currentIndex: 0,
            songDetail: {},
        }
    }

     componentDidMount() {
         this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.backAction);
         const { songList, currentIndex, songDetail } = this.props?.route?.params;
         this.setState({ songList, currentIndex, songDetail});
    }

    async componentWillUnmount() {
        await TrackPlayer.stop();
        this.backHandler.remove();
    }

    backAction = () => {
       this.props?.navigation?.goBack?.();
       return true;
    };

    playPauseSong = async () => {
        try {
            let { songDetail } = this.state;
            if(this.state.isPlayingSong){
                await TrackPlayer.pause();
                this.setState({isPlayingSong: false});
            }
            else {
                await TrackPlayer.setupPlayer();
                await TrackPlayer.add({
                    id: songDetail.trackId,
                    url: songDetail.previewUrl,
                    title: songDetail.trackName,
                    artist: songDetail.artist,
                    artwork: songDetail.artworkUrl100
                });
                await TrackPlayer.play();
                this.setState({isPlayingSong: true})
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    onChangeSong = async (updatedIndex) => {
        const { songList } = this.state;
        if(Math.sign(updatedIndex) != -1 && updatedIndex < songList.length) {
            let updatedSong = songList[updatedIndex];
            this.setState({
                currentIndex: updatedIndex,
                songDetail: updatedSong,
                isPlayingSong: false
            });
            await TrackPlayer.reset();
            this.playPauseSong();
        }
    };

    onPressPrevious = () => {
        const { currentIndex } = this.state;
        let updatedIndex = currentIndex - 1;
        this.onChangeSong(updatedIndex);
    };

    onPressNext = () => {
        const { currentIndex } = this.state;
        let updatedIndex = currentIndex + 1;
        this.onChangeSong(updatedIndex);
    };

    render(){
        const { isPlayingSong , songDetail} = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <RenderHeader backAction={this.backAction}/>
                <RenderContent songDetail={songDetail} />
                <RenderSongActions isPlayingSong={isPlayingSong}
                                   onPressPrevious={this.onPressPrevious}
                                   onPressNext={this.onPressNext}
                                   playPauseSong={this.playPauseSong} />
            </SafeAreaView>
        )
    }
};

const RenderHeader = (props) => {
    return (
        <Header
            leftComponent={{ icon: 'arrow-back', type: 'material', color: '#fff', onPress: props.backAction }}
            centerComponent={{ text: 'Now Playing', style: styles.headerTitle}}
            containerStyle={styles.headerContainer}
            backgroundColor={COLOR.LIGHT_THEME_COLOR}
            rightContainerStyle={{justifyContent:'center'}}
        />
    )
};

const RenderContent = ({songDetail}) => {
    return (
        <>
        <View style={{flex:3}}>
            <View style={styles.topView}>
                <Avatar
                    size={200}
                    rounded
                    source={{uri: songDetail.artworkUrl100}}
                />
                <Text style={styles.artistName}>{songDetail.artistName}</Text>
            </View>
        </View>
        <View style={{flex:2,alignItems:'center', paddingTop:50}}>
            <Text style={styles.headerTitle}>{songDetail.trackName}</Text>
            <Text style={styles.artistName}>{songDetail.collectionName}</Text>
        </View>
        </>
    )
};

const RenderSongActions = (props) => {
  return (
      <View style={{flexDirection:'row', justifyContent:'space-evenly', flex:0.5,}}>
          <Icon size={35} name='skip-previous' type='material' color={'#fff'} onPress={props.onPressPrevious} />
          <Icon size={35} name= {props.isPlayingSong ? 'pause' : 'play-circle-outline'}  type='material' color={'#fff'} onPress={props.playPauseSong} />
          <Icon size={35} name='skip-next' type='material' color={'#fff'} onPress={props.onPressNext} />
      </View>
  )
};


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: COLOR.LIGHT_THEME_COLOR,
    },
    headerContainer:{
        backgroundColor: COLOR.LIGHT_THEME_COLOR,
        borderBottomWidth:0,
        paddingVertical:10,
    },
    headerTitle: {
        color:'#fff',
        fontSize: 16,
        fontWeight:'bold'
    },
    loaderView:{
        flex:1,
        backgroundColor: COLOR.DARK_THEME_COLOR,
        alignItems:'center',
        justifyContent:'center'
    },
    img:{
        height:200,
        width: 200,
        borderRadius:10
    },
    leftHeaderStyle: {
    },

    topView: {
        backgroundColor: COLOR.DARK_THEME_COLOR,
        margin:30,
        borderRadius:5,
        padding: 10,
        height: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        alignItems:'center',
        justifyContent:'center'
    },
    artistName: {
        fontSize: 14,
        color:'#92a9df',
        paddingHorizontal: 5,
        paddingVertical: 5
    }

});



export default SongDetail;
