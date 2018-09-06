
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Modal, View, TouchableHighlight } from 'react-native';
import {
    Container, Content, Body, Title, Text, Button, Drawer, Switch,
    Header, Grid, Col, Row, List, ListItem, Icon
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class AlramModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: this.props.modalVisible,
            alram1: false,
            alram2: false,
            alram3: false,
            alram4: false
        };
    }

    render() {
        return (
            <Modal
                presentationStyle="overFullScreen"
                animationType="fade"
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    alert('Modal has been closed.');
                }}
            >

                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.6)"
                }}>

                    <View style={{
                        width: 300,
                        height: 390,
                        borderRadius: 10,
                        backgroundColor: "#ddd"
                        ,
                    }}
                    >
                        <View style={{ flexDirection: "column", }}>

                            <Text style={{ marginTop: 20, marginLeft: 20, fontSize: 20, color: '#0099ff', }}>알람설정</Text>

                            <TouchableHighlight
                                onPress={() => {
                                    this.props.setModalVisible(false);
                                }}
                                style={{ position: "absolute", right: 10, top: 10, }}
                            >
                                <Icon type="FontAwesome" name='times' style={{ fontSize: 20, color: "#999", }} />
                            </TouchableHighlight>

                            <View style={{
                                height: 45,
                                width: '94%',
                                marginLeft: '3%',
                                marginTop: 10,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: '#fff',
                                borderLeftWidth: 5,
                                borderLeftColor: '#999',
                            }}
                            >
                                <Text style={{ flex: 4, marginLeft: 30, }}>공지사항</Text>
                                <Switch
                                    value={this.state.alram1}
                                    onValueChange={() => this.setState({ alram1: !this.state.alram1 })}
                                    style={{ flex: 1, marginRight: 30 }}
                                />
                            </View>


                            <View style={{
                                height: 45,
                                width: '94%',
                                marginLeft: '3%',
                                marginTop: 10,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: '#fff',
                                borderLeftWidth: 5,
                                borderLeftColor: '#999',
                            }}
                            >
                                <Text style={{ flex: 4, marginLeft: 30, }}>결제정보</Text>
                                <Switch
                                    value={this.state.alram2}
                                    onValueChange={() => this.setState({ alram2: !this.state.alram2 })}
                                    style={{ flex: 1, marginRight: 30 }}
                                />
                            </View>


                            <View style={{
                                height: 45,
                                width: '94%',
                                marginLeft: '3%',
                                marginTop: 10,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: '#fff',
                                borderLeftWidth: 5,
                                borderLeftColor: '#999',
                            }}
                            >
                                <Text style={{ flex: 4, marginLeft: 30, }}>배송정보</Text>
                                <Switch
                                    value={this.state.alram3}
                                    onValueChange={() => this.setState({ alram3: !this.state.alram3 })}
                                    style={{ flex: 1, marginRight: 30 }}
                                />
                            </View>


                            <View style={{
                                height: 45,
                                width: '94%',
                                marginLeft: '3%',
                                marginTop: 10,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: '#fff',
                                borderLeftWidth: 5,
                                borderLeftColor: '#999',
                            }}
                            >
                                <Text style={{ flex: 4, marginLeft: 30, }}>이벤트정보</Text>
                                <Switch
                                    value={this.state.alram4}
                                    onValueChange={() => this.setState({ alram4: !this.state.alram4 })}
                                    style={{ flex: 1, marginRight: 30 }}
                                />
                            </View>

                            <View style={{ height: "100%", top: 50, flexDirection: "row", justifyContent: "center", }}>
                                <Button style={{ width: 200, height: 50, backgroundColor: '#0099ff', justifyContent: "center", }} onPress={() => this.props.setModalVisible(false)} >
                                    <Text>확인</Text>
                                </Button>
                            </View>

                        </View>
                    </View>
                </View>

            </Modal>
        )
    }
}

const action = (data) => {
    return {
        type: 'data',
        payload: data
    };
};

export default connect(null, { action })(AlramModal);

