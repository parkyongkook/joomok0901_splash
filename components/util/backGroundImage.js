
import React, { Component } from 'react';
import {View, Image } from 'react-native';

export default class BackGroundImage extends Component {
    render(){
        return(
            <View style={{ position:'absolute', width:'100%', height:'100%',}}>
                <Image
                style={{
                    flex: 1,
                    resizeMode : "contain",
                    position: 'absolute',
                    top:-200,
                    justifyContent:'flex-start',
                    width: '100%',
                }}
                source={require('../../assets/img/backPatternTop.jpg')}
                />
                <Image
                    style={{
                        flex: 1,
                        resizeMode : "contain",
                        position: 'absolute',
                        bottom:-180,
                        justifyContent:'flex-start',
                        width: '100%',
                        transform: [{rotateY: '180deg'}]
                    }}
                    source={require('../../assets/img/backPatternTop.jpg')}
                />
            </View>
        )
    }
}