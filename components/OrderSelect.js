import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Image, ScrollView, } from 'react-native';
import {
    Container, CheckBox, Header, Content, Form,
    Item, Input, Label, Left, Button, Icon, Text, Body, Title, Right, Picker, Grid, Col, Row, Badge
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';

import Toast, { DURATION } from 'react-native-easy-toast'
import Head from './Head';
import SearchList from './listComponent/SearchList';
import OrderList from './listComponent/OrderList';

class OrderSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            afterDate: moment().format("YYYY-MM-DD"),
            beforeDate: moment().format("YYYY-MM-DD"),
            maxDate: null,
            minDate: null,
        }
        this.dateChanger = this.dateChanger.bind(this)
    }

    dateChanger(monthChange) {
        this.setState({
            beforeDate: moment().subtract(monthChange, 'months').format("YYYY-MM-DD")
        });
    }

    render() {
        return (
            <Container style={{ backgroundColor: "#0099ff", }}>

                <Head
                    title={
                        this.props.title ? this.props.title : '결제목록'
                    }
                    openDrawer={this.props.openDrawer}
                    closeDrawerHome={this.props.closeDrawer}
                    beforePage={() => Actions.Main()}
                />

                <View style={{ flex: 1, backgroundColor: '#eee', }}>

                    <View style={styles.searchBox}>

                        <View style={{ marginTop: 20, }}>
                        
                            <Text style={{
                                marginTop: 5,
                                marginBottom: 10,
                                fontSize: 20,
                            }}>
                                조회기간
                            </Text>

                            <View style={{ flexDirection: "row", }}>
                                <View style={{ flex: 1, flexDirection: "row", }}>
                                    <Button style={styles.searchButton3} onPress={() => this.dateChanger(1)}>
                                        <Text style={{ color: '#777', }}>1개월</Text>
                                    </Button>
                                    <Button style={styles.searchButton} onPress={() => this.dateChanger(3)}>
                                        <Text style={{ color: '#777', }}>3개월</Text>
                                    </Button>
                                    <Button style={styles.searchButton} onPress={() => this.dateChanger(6)}>
                                        <Text style={{ color: '#777', }}>6개월</Text>
                                    </Button>
                                </View>
                            </View>

                        </View>


                        <View style={{ flex: 1, marginTop: 10, }}>
                            <View style={{ flexDirection: "row", }}>
                                <DatePicker
                                    style={{
                                        flex: 1,
                                        borderColor: '#aaa',
                                        marginRight: 5,
                                    }}
                                    date={this.state.afterDate}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="2014-05-01"
                                    maxDate={this.state.beforeDate}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    iconSource={require('../assets/img/calendar.png')}
                                    customStyles={{
                                        dateText: styles.dateText,
                                        dateIcon: styles.dateIcon
                                    }}
                                    onDateChange={(date) => { this.setState({ afterDate: date }) }}
                                />
                                <Text style={{ height: 30, marginTop: 10, color: '#aaa', }}>~</Text>
                                <DatePicker
                                    style={{
                                        flex: 1,
                                        borderColor: '#aaa',
                                        marginLeft: 5,
                                    }}
                                    date={this.state.beforeDate}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="2014-05-01"
                                    maxDate={this.state.beforeDate}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    iconSource={require('../assets/img/calendar.png')}
                                    customStyles={{
                                        dateText: styles.dateText,
                                        dateIcon: styles.dateIcon
                                    }}
                                    onDateChange={(date) => { this.setState({ beforeDate: date }) }}
                                />
                            </View>

                            <Button style={styles.searchButton2}>
                                <Text>조회</Text>
                            </Button>

                        </View>

                    </View>

                    <ScrollView>
                        <OrderList />
                    </ScrollView>

                    <View style={styles.buttonWrap}>
                        <Button style={{ flex: 1, justifyContent: "center", backgroundColor: '#0099ff', }}>
                            <Text>선택결제</Text>
                        </Button>
                        <Button style={{ flex: 1, marginLeft: 10, justifyContent: "center", backgroundColor: '#0099ff' }}>
                            <Text>전체결제</Text>
                        </Button>
                    </View>

                </View>

                <Toast ref="toast" />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    loginSubText: {
        fontSize: 14,
        marginTop: 10,
        marginLeft: 15,
    },
    drinkListText: {
        justifyContent: "center",
    },
    searchButton: {
        flex: 1,
        height: 30,
        marginLeft: 5,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#aaa',
    },
    buttonWrap:{
        marginLeft: 20, 
        marginRight: 20, 
        marginBottom: 20, 
        flexDirection: "row", 
        justifyContent: "space-between", 
    },
    searchButton2:{
        width: '100%', 
        height: 35, 
        marginTop: 10, 
        marginBottom: 10, 
        borderRadius: 0, 
        backgroundColor: '#0099ff', 
        justifyContent: "center", 
    },
    searchButton3:{
        flex: 1,
        height: 30,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#aaa',
    },
    dateText: {
        fontSize: 14,
        color: '#777',
        marginLeft: -25,
    },
    dateIcon: {
        position: 'absolute',
        height: 21,
        width: 25,
        right: 5,
    },
    searchBox:{
        height: 200, 
        marginLeft: 20, 
        marginRight: 20, 
        marginTop: 20, 
        paddingLeft: 10, 
        paddingRight: 10, 
        backgroundColor: '#fff', 
    }
});

export default connect(null)(OrderSelect);


