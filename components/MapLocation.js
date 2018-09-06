import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {
    Container, CheckBox, Header, Content, Form,
    Item, Input, Label, Left, Button, Icon, Text, Body, Title, Right
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { MapView } from 'expo';
import Head from './Head';

export default class MapLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idSaveChecked: false,
            Region: {
                latitude: 37.55505189274621,
                longitude: 126.91136816088806,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },
            error: null,
            isLoading: true,
            markers: [

                {
                    "altitude": "",
                    "availableBikes": 8,
                    "availableDocks": 15,
                    "city": "",
                    "id": 1,
                    "landMark": "",
                    "lastCommunicationTime": "2018-05-30 04:00:34 AM",
                    "latitude": 37.5026224,
                    "location": "",
                    "longitude": 127.03482910000002,
                    "postalCode": "",
                    "stAddress1": "India St & West St",
                    "stAddress2": "",
                    "stationName": "두몫",
                    "statusKey": 1,
                    "statusValue": "In Service",
                    "testStation": true,
                    "totalDocks": 23,
                },
                {
                    "altitude": "",
                    "availableBikes": 8,
                    "availableDocks": 15,
                    "city": "",
                    "id": 1,
                    "landMark": "",
                    "lastCommunicationTime": "2018-05-30 04:00:34 AM",
                    "latitude": 37.5018143,
                    "location": "",
                    "longitude": 127.03710810000007,
                    "postalCode": "",
                    "stAddress1": "India St & West St",
                    "stAddress2": "",
                    "stationName": "gs타워",
                    "statusKey": 1,
                    "statusValue": "In Service",
                    "testStation": true,
                    "totalDocks": 23,
                },

            ]
        };

    }

    // fetchMarkerData() {
    //   //제이슨 형태로 자전거의 위치를 반환함 같은형태로 데이터를 가공하여 받아 사용하여 마커 생성 가능.
    //   fetch("https://feeds.citibikenyc.com/stations/stations.json")
    //     .then(response => response.json())
    //     .then(responseJson => {
    //       console.log(responseJson.stationBeanList)
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }

    render() {
        return (
            <Container>
                <Head
                    title={"지도보기"}
                    openDrawer={this.props.openDrawer}
                    closeDrawerHome={this.props.closeDrawer}
                    beforePage={() => Actions.Main()}
                />
                <MapView
                    style={{ flex: 1 }}
                    region={this.state.Region}
                    loadingEnabled={true}

                >
                    {/* <MapView.Marker
          coordinate={{
            latitude: 37.5026224,
            longitude: 127.03482910000002
          }}
          title={"두몫"}
          description={"o2o플랫폼 서비스"}
        /> */}
                    {!this.state.isLoading
                        ? null
                        : this.state.markers.map((marker, index) => {
                            const coords = {
                                latitude: marker.latitude,
                                longitude: marker.longitude
                            };

                            const metadata = `Status: ${marker.statusValue}`;

                            return (
                                <MapView.Marker
                                    key={index}
                                    coordinate={coords}
                                    title={marker.stationName}
                                    description={metadata}
                                />
                            );
                        })}
                </MapView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    loginSubText: {
        fontSize: 14,
        marginTop: 10,
        marginLeft: 15,
    }
});

