import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Container , Header,Item, Content, Button, Text, } from 'native-base';

import * as actions from '../actions';
import update from 'immutability-helper'; // 2.6.5
import * as firebase from 'firebase';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { database } from '../firebase/Config';


import BackGroundImage from './util/backGroundImage';
import Head from './Head';




class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        passData: {
            usridx: this.props.userData.usridx,
            prev_pass: null,
            password: null,
            passConfirm:  null, 
        }
    }
    this.confirmToChengePassword = this.confirmToChengePassword.bind(this);
  }
  
  confirmToChengePassword(){
     
    const prev_pass = this.state.passData.prev_pass;
    const password = this.state.passData.password;
    const passConfirm = this.state.passData.passConfirm;

    if( prev_pass === null || password === null  || passConfirm === null   ){
        return alert("항목이 비어있습니다")
    }

    if( prev_pass === "" || password === ""  || passConfirm === ""   ){
        return alert("항목이 비어있습니다")
    }

    if( password !== passConfirm){
        return alert("새비밀번호가 일치하지 않습니다.")
    }

    if( password.length < 8  || passConfirm.length > 20  ){
        return alert("8자이상 20자 이하의 영문,숫자,특수문자를 사용해주세요")
    }

    if( prev_pass  === password ){
        return alert("현재비밀번호 기존비밀번호 항목이 같습니다")
    }

    fetch('https://api.joomok.net/members/chgpass', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.passData)
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log("this.state.cartData",this.state.cartData)
            console.log("responseData",responseData)
            if( responseData.code === 401 ){
                alert("현재비밀번호 또는 새비밀번호가 일치하지 않습니다.")
            }
            if( responseData.code === 200 ){
                alert("비밀번호를 변경하였습니다")
            }
        })
        .catch((error) => {
            alert('problem while adding data');
        })
        .done();
  }

  render() {
    return (
        <Container style={{backgroundColor : "#0099ff" ,}}>
            <BackGroundImage/>
            <Head 
                openDrawer={this.props.openDrawer} 
                closeDrawerHome={this.props.closeDrawer} 
                beforePage = { ()=> Actions.Main() }
                title={"비밀번호변경"}
            />

            <Content style={{ width:"94%", marginLeft:"3%", 
                            backgroundColor:'rgba(0,0,0,0.2)', 
                            borderRadius:10, marginBottom:20,
                          }}>

                <View style={
                    {
                        flexDirection: "row", 
                        justifyContent: "flex-start", 
                        marginTop: 20,
                    }
                }>
                    <Text style={{fontSize:14, fontWeight:"100", color:"#ddd", marginLeft:20, marginRight:20,}}>
                        주기적인 비밀번호 변경은 개인정보를 안전하게 보호하고 개인정보 도용 피해를 예방합니다.
                    </Text>
                </View>

                <View style={
                    {
                        flexDirection: "row", 
                        justifyContent: "flex-start", 
                        marginTop: 20,
                    }
                }>
                    <View style={styles.SignUpTitle}><Text style={{color:"#fff"}} >현재비밀번호</Text></View>

                    <View style={styles.SignUpSubText}>
                        <View Regular style={{flex:1, height:30, backgroundColor:"#ddd",}}>
                            <TextInput
                                underlineColorAndroid="transparent" 
                                selectionColor={"#fff"}
                                placeholder={"비밀번호 10자이상"}
                                placeholderTextColor={'#555'}
                                secureTextEntry={true}
                                onChangeText={ 
                                    (text)=>{
                                        this.setState({
                                            passData : update(this.state.passData, { 
                                                prev_pass : {$set:text}
                                            })
                                        })
                                    }
                                } 
                                style={{marginLeft:5, marginTop:6,padding:0}} 
                            />
                        </View>
                    </View>


                </View>

                <View style={styles.SignUpFormParent}>

                    <View style={styles.SignUpTitle}><Text style={{color:"#fff"}} >새 비밀번호</Text></View>

                    <View style={{
                            flex : 5, 
                            height : 95, 
                            marginRight : 15, 
                            justifyContent : "center"
                            }}>

                        <View Regular style={{flex:1, height:30, backgroundColor:"#ddd",}}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                selectionColor={"#fff"}
                                placeholder={"새 비밀번호 입력"}
                                placeholderTextColor={'#555'}
                                secureTextEntry={true}
                                onChangeText={ 
                                    (text)=>{
                                        this.setState({
                                            passData : update(this.state.passData, { 
                                                password : {$set:text}
                                            })
                                        })
                                    }
                                }
                                style={{marginLeft:5, marginTop:6,padding:0}} 
                            /> 
                        </View>

                        <Text style={{fontSize:14, fontWeight:"100", color:"#ddd", marginTop:10,}}>
                            8~20자, 영문, 숫자, 특수문자 사용
                        </Text>

                        <View Regular style={{flex:1, height:30, backgroundColor:"#ddd", marginTop:10,}}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                selectionColor={"#fff"}
                                placeholder={"새 비밀번호 확인"}
                                placeholderTextColor={'#555'}
                                secureTextEntry={true}
                                onChangeText={ 
                                    (text)=>{
                                            this.setState({
                                                passData : update(this.state.passData, { 
                                                    passConfirm : {$set:text}
                                                })
                                            })
                                        }
                                    }
                                style={{marginLeft:5, padding:0}}  
                            /> 
                        </View>

                    </View>
                </View>

            </Content>

            <View style={{flexDirection:"row", marginBottom:50, justifyContent:"space-around",}}>
                <Button block style={{
                        width:"90%",
                        marginTop:10,
                        marginLeft:20, 
                        marginRight:20, 
                        backgroundColor:"rgba(0,0,0,0)",
                        borderRadius: 4,
                        borderWidth: 2,
                        borderColor:"#fff",
                    }} 
                    onPress={()=> this.confirmToChengePassword()}>
                    <Text>확인</Text>
                </Button>

            </View>

        </Container>
      );
    }
  }
  
  const styles = StyleSheet.create({
    loginSubText:{
      fontSize: 14,
      marginTop: 3,
      marginLeft: 15,
    },SignUpFormParent:{
      flexDirection: "row", 
      justifyContent: "flex-start", 
      marginTop: 7,
    },SignUpTitle:{
      flex:2, 
      height:30, 
      marginLeft:15, 
      justifyContent:"center"
    },SignUpSubText:{
      flex:5, 
      height:30, 
      marginRight:15, 
      justifyContent:"center"
    },SignUpMobileInput:{
      flex:1,
      height:30, 
    }
});

const mapStateToProps = (state) => {
    return {
        userData : state.reducers.userData
    }; 
};

export default connect(mapStateToProps, null)(ChangePassword);

