import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Modal, View, TouchableHighlight, Image, Platform } from 'react-native';
import {
    Container, Content, Body, Title, Text, Button, Drawer, Switch,
    Header, Grid, Col, Row, List, ListItem, Icon
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import AlramModal from './AlramModal';
import ChengeMyInfo from './ChengeMyInfo';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

class MenuSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            modalVisible: false,
            alram1: false,
            alram2: false,
        };
        
        this.setModalVisible = this.setModalVisible.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        });
    }

    logOut() {
        const that = this;

        const userData = {
            usridx: this.props.userData.usridx
        }

        fetch('https://api.joomok.net/auth/signout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
            .then((response) => {

                //토큰 초기화
                firebase.auth().onAuthStateChanged(function (user) {
                    if(user){
                        firebase.database().ref('users/' + user.uid ).set({
                            email: user.email,
                            uid : user.uid
                        });
                    }
                    
                });

                firebase.auth().signOut().then(function (resolve) {
                    Actions.reset('Login',{
                        isLogout: "true"
                    });
                    alert("로그아웃 되었습니다.")
                    that.props.closeDrawer()   
                }).catch(function (error) {
                    console.log(error)
                })
        
            })
            .catch((error) => {
                alert(error);
            })
            .done();
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "#0099ff", }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        flexDirection: "row",
                        alignItems: "center",
                        position: "relative",
                    }}>
                        <TouchableOpacity
                            style={{ position: "absolute", left: 0, top: 0 }}
                            onPress={() => {
                                this.props.closeDrawer()
                            }}
                        >
                            <Icon type="FontAwesome" name='times-circle'
                                style={{
                                    width: 24, height: 24, fontSize: 24,
                                    color: "#fff",
                                }}
                            />
                        </TouchableOpacity>
                        <Image
                            style={{
                                width: 180,
                                resizeMode: "contain",
                                justifyContent: 'flex-start',
                                marginBottom: 20,
                            }}
                            source={require('../assets/img/doomokLogo.png')}
                        />
                    </View>
                </Header>

                <Content style={{ backgroundColor: '#fff' }}>

                    <Grid style={{ marginLeft: 40, }}>

                        <Row>

                            <List style={{ flex: 1 }}>

                                <View style={{ marginTop: 20, marginBottom: 20, }}>
                                    <Text style={{ fontSize: 26, }}>
                                        {this.props.userData !== null ? this.props.userData.store : null}
                                    </Text>
                                    <Text style={{ fontSize: 18, fontWeight: "100", color: "#333", marginTop: 10, }}>
                                        {this.props.userData !== null ? this.props.userData.name : null} 업주님 환영합니다.
                                    </Text>
                                </View>

                                <ListItem itemHeader first style={styles.listItemHeader}>

                                    <Image
                                        style={styles.iconImage}
                                        source={require('../assets/img/slideMenu_1.jpg')}
                                    />

                                    <Text style={styles.slideTitleText}>마이페이지</Text>
                                </ListItem>


                                <ListItem style={styles.listItem}>
                                    <TouchableOpacity

                                        onPress={
                                            () => {
                                                Actions.ChengeMyInfo();
                                                this.props.closeDrawer();
                                            }
                                        }

                                    >
                                        <Text style={styles.slideText}>내정보 변경</Text>
                                    </TouchableOpacity>
                                </ListItem>

                                <ListItem style={styles.listItem}>
                                    <TouchableOpacity
                                        onPress={
                                            () => {
                                                Actions.ChangePassword();
                                                this.props.closeDrawer();
                                            }
                                        }
                                    >
                                        <Text style={styles.slideText}>비밀번호 변경</Text>
                                    </TouchableOpacity>
                                </ListItem>

                                <ListItem style={styles.listItem}>
                                    <TouchableOpacity onPress={() => {
                                        Actions.PaymentList()
                                        this.props.closeDrawer()
                                    }}>
                                        <Text style={styles.slideText}>주문목록</Text>
                                    </TouchableOpacity>
                                </ListItem>

                                <ListItem last style={styles.listItem}>
                                    <TouchableOpacity onPress={() => {
                                        Actions.OrderSelect()
                                        this.props.closeDrawer()
                                    }}>
                                        <Text style={styles.slideText}>결제목록</Text>
                                    </TouchableOpacity>

                                </ListItem>

                                <ListItem last style={styles.listItem}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.logOut()
                                        }}>
                                        <Text style={styles.slideText}>로그아웃</Text>
                                    </TouchableOpacity>
                                </ListItem>
                                
                            </List>

                        </Row>

                        <Row>

                            <List style={{ flex: 1 }}>
                                <ListItem itemHeader first style={styles.listItemHeader}>
                                    <Image
                                        style={styles.iconImage}
                                        source={require('../assets/img/slideMenu_2.jpg')}
                                    />
                                    <Text style={styles.slideTitleText}>앱설정</Text>
                                </ListItem>

                                <ListItem style={styles.listItem}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setModalVisible(true);
                                        }}>
                                        <Text style={styles.slideText}>알람설정</Text>
                                    </TouchableOpacity>
                                </ListItem>
                            </List>
                        </Row>

                        <Row>
                            <List style={{ flex: 1 }}>
                                <ListItem itemHeader first style={styles.listItemHeader}>
                                    <Image
                                        style={styles.iconImage}
                                        source={require('../assets/img/slideMenu_2.jpg')}
                                    />
                                    <Text style={styles.slideTitleText}>고객센터</Text>
                                </ListItem>
                                <ListItem style={styles.listItem}>
                                    <TouchableOpacity onPress={() => {
                                        Actions.Notice({
                                            usridx: this.props.userData.usridx
                                        });
                                        this.props.closeDrawer();
                                    }
                                    }>
                                        <Text style={styles.slideText}>공지사항</Text>
                                    </TouchableOpacity>
                                </ListItem>
                                <ListItem style={styles.listItem}>
                                    <TouchableOpacity onPress={() => {
                                        Actions.Faq({
                                            usridx: this.props.userData.usridx
                                        })
                                        this.props.closeDrawer()
                                    }}>
                                        <Text style={styles.slideText}>FAQ</Text>
                                    </TouchableOpacity>
                                </ListItem>
                                <ListItem last style={styles.listItem}>
                                    <TouchableOpacity onPress={() => {
                                        Actions.Customer({
                                            usridx: this.props.userData.usridx
                                        })
                                        this.props.closeDrawer()
                                    }
                                    }>
                                        <Text style={styles.slideText}>고객센터</Text>
                                    </TouchableOpacity>
                                </ListItem>
                            </List>
                        </Row>

                    </Grid>

                </Content>

                <AlramModal
                    modalVisible={this.state.modalVisible}
                    setModalVisible={this.setModalVisible}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    listItemHeader: {
        marginTop: -10,
        height: 50,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        justifyContent: "flex-start",
        paddingTop: Platform.OS === "ios" ? 20 : 30,
    },
    listItem: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginTop: Platform.OS === "ios" ? -10 : -20,
    },
    slideTitleText: {
        fontSize: 18,
        color: "#0099ff",
        marginLeft: 10,
    },
    slideText: {
        fontSize: 16,
        color: "#555",
        marginLeft: 35,
    },
    iconImage: {
        width: 24,
        height: 25,
        resizeMode: "contain",
        justifyContent: 'flex-start',
    }

})

const mapStateToProps = (state) => {
    return {
        userData: state.reducers.userData
    };
};

const action = (data) => {
    return {
        type: 'data',
        payload: data
    };
};

export default connect(mapStateToProps, { action })(MenuSlider);
