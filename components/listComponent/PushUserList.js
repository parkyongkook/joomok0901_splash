import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

export default class PushUserList extends React.Component {
    render() {
        return (
            <View style={{height:30, marginTop:5, backgroundColor:'#ddd',}}>
                <View><Text>{this.props.email}</Text></View>
                <View><Text>{this.props.uid}</Text></View>
                <View><Text>{this.props.expoKey}</Text></View>
            </View>
        )
    }
}