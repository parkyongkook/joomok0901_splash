import React, { Component } from 'react';
import { WebView, View, Linking, StyleSheet, Button } from 'react-native';

import Head from './Head';
import BackGroundImage from './util/backGroundImage';
import { Actions } from 'react-native-router-flux';


export default class MyWeb extends Component {

    state = {
        key: 1,
        isWebViewUrlChanged: false
    };

    componentWillMount() {
        this.props.bcCard === "bcCard" ? Linking.openURL(this.props.url) : null
    }

    resetWebViewToInitialUrl = () => {
        if (this.state.isWebViewUrlChanged) {
            this.setState({
                key: this.state.key + 1,
                isWebViewUrlChanged: false
            });
        }
    };

    setWebViewUrlChanged = webviewState => {

        if( webviewState.title.length !== 0 ){

            if( webviewState.title.length === 23 ){
                fetch("http://pay.joomok.net/certify/result/"+webviewState.title, {
                    headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((response) => response.json())
                        .then((responseData) => {
                            if( responseData.code === 200 ){
                                Actions.SignUp_Information({
                                    userName : responseData.data.name,
                                    userBirth : responseData.data.birthdate,
                                    mobile : responseData.data.mobileno
                                })
                            }
                        })
                        .catch((error) => {
                            alert('실명인증실패');
                        })
                .done();
            }

            if (webviewState.title === 'Finish') {
                Actions.Main();
            }
        }
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#0099ff", }}>
                <BackGroundImage />
                <Head
                    openDrawer={this.props.openDrawer}
                    closeDrawerHome={this.props.closeDrawer}
                    beforePage={() => Actions.OrderMain()}
                />
                <WebView
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    key={this.state.key}
                    source={{ uri: this.props.url }}
                    onNavigationStateChange={this.setWebViewUrlChanged}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({

    MainContainer: {

        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',

    }

});
