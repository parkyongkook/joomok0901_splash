import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, AsyncStorage, TextInput, Image  } from 'react-native';
import { Container, Content, Item,Button,Text, } from 'native-base';

import update from 'immutability-helper'; // 2.6.5  
import * as firebase from 'firebase';
import * as actions from '../actions';

import {Actions} from 'react-native-router-flux';
import { database } from '../firebase/Config';
import {connect} from 'react-redux';

import Head from './Head';
import BackGroundImage from './util/backGroundImage';


const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const Base64 = {  
    atob: (input:string = '') => {
      let str = input.replace(/=+$/, '');
      let output = '';
  
      if (str.length % 4 == 1) {
        throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
      }
      for (let bc = 0, bs = 0, buffer, i = 0;
        buffer = str.charAt(i++);
  
        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
          bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
      ) {
        buffer = chars.indexOf(buffer);
      }
  
      return output;
    }
};

class ChengeMyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        isChangeToPhoneNum : false,
        isChangeToEmail : false,
        isChangeToComPhone : false,   

        mobile : Base64.atob(this.props.userData.mobile_enc),
        email : this.props.userData.email,
        com_phone : this.props.userData.phone,

        userData: {
            usridx : this.props.userData.usridx, 
            mobile : Base64.atob(this.props.userData.mobile_enc),
            email : this.props.userData.email,
            com_phone : this.props.userData.phone
        }
    }
    this.ChangeToinfo = this.ChangeToinfo.bind(this);
    this.confirmToChangeData = this.confirmToChangeData.bind(this);
  }

  ChangeToinfo(type){
    
    switch (type){
		case "mobile": 
            return  this.setState({
                isChangeToPhoneNum : !this.state.isChangeToPhoneNum,
                isChangeToEmail : false,
                isChangeToComPhone : false,
            })            
        case "email":
			return this.setState({
                isChangeToPhoneNum : false,
                isChangeToEmail : !this.state.isChangeToEmail,
                isChangeToComPhone : false,
            })    
        case "comPhone":
			return this.setState({
                isChangeToPhoneNum : false,
                isChangeToEmail : false,
                isChangeToComPhone : !this.state.isChangeToComPhone,
            })
    }

  }

  confirmToChangeData(){
    
    const mobile = this.props.userData.phone;
    const email = this.props.userData.email;

    //핸드폰 번호 불러오면 조건 추가!!
    if( mobile !== this.state.userData.mobile || email !== this.state.userData.email ){
        fetch('https://api.joomok.net/members/chginfo', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.userData)
        })
        .then((response) => response.json())
        .then((responseData) => {
            alert("수정되었습니다.")
            this.setState({
                isChangeToPhoneNum : false,
                isChangeToEmail : false,
                isChangeToComPhone : false,
            })
        })
        .catch((error) => {
            alert('problem while adding data');
        })
        .done();
    }
}

  render() {
    return (
        <Container style={{backgroundColor:"#0099ff",}}>

            <BackGroundImage/>

            <Head 
                openDrawer={this.props.openDrawer} 
                closeDrawerHome={this.props.closeDrawer} 
                title={'내정보변경'}
                beforePage = { ()=> Actions.Main() }
            />

            <Content style={{ width:"94%",marginLeft:"3%", backgroundColor:'rgba(0,0,0,0.2)', marginBottom:20, borderRadius:10, }}>

                <View style={styles.SignUpFormParent}>
                    <View style={styles.SignUpTitle}>
                        <Text style={styles.titleText}>이름</Text>
                    </View>
                    <View style={styles.SignUpSubText}>
                        <Text style={styles.subText}>{this.props.userData.name}</Text>
                    </View>
                </View>

                <View style={styles.SignUpFormParent}>

                    <View style={styles.SignUpTitle}>
                        <Text style={styles.titleText} >휴대폰</Text>
                    </View>

                    <View style={styles.viewStyle}>
                        <TextInput 
                            underlineColorAndroid="transparent"
                            caretHidden={!this.state.isChangeToPhoneNum}
                            autoFocus={!this.state.isChangeToPhoneNum}
                            placeholder="휴대폰번호" 
                            onChangeText={ 
                                (text)=>{
                                    this.setState({
                                        userData : update(this.state.userData, { 
                                            mobile : {$set:text}
                                        })
                                    })
                                }
                            } 
                            
                            style={[styles.textInput,
                                    {                                
                                        backgroundColor : 
                                        this.state.isChangeToPhoneNum ? 
                                        'rgba(255, 255, 255, 0.2)': null,
                                    }]
                            }
                            value={this.state.userData.mobile}
                        />
                    </View>

                    <Button
                        style={[styles.changeButton,{flex:1.5,}]}
                        onPress={()=> this.ChangeToinfo("mobile")}
                    >
                        {!this.state.isChangeToPhoneNum ? 
                        <Text style={styles.changeButtonText}>변경</Text> : 
                        <Text style={styles.changeButtonText}>수정</Text>}
                    </Button>

                </View>

                <View style={styles.SignUpFormParent}>

                    <View style={styles.SignUpTitle}>
                        <Text style={styles.titleText} >이메일</Text>
                    </View>

                    <View style={styles.viewStyle}>
                        <Item Regular style={{flex:3.2, height:30, marginRight:10, borderBottomWidth:0,}}>
                            <TextInput 
                                underlineColorAndroid="transparent"
                                caretHidden={!this.state.isChangeToEmail}
                                autoFocus={!this.state.isChangeToEmail}
                                onChangeText={ 
                                    (text)=>{
                                        this.setState({
                                            userData : update(this.state.userData, { 
                                                email : {$set:text}
                                            })
                                        })
                                    }
                                } 
                                style={
                                    [ styles.textInput,
                                        {backgroundColor : this.state.isChangeToEmail ? 
                                        'rgba(255, 255, 255, 0.2)': null,
                                        padding: 0,
                                    }
                                    ]
                                }
                                value={this.state.userData.email}
                            />
                        </Item>
                    </View>

                    <Button
                        style={[styles.changeButton,{flex:1.5,}]}
                        onPress={()=> this.ChangeToinfo("email")
}
            >
                        {!this.state.isChangeToEmail ? 
                        <Text style={styles.changeButtonText}>변경</Text> : 
                        <Text style={styles.changeButtonText}>수정</Text>}
                    </Button>
                    
                </View>

                <View style={{
                    flex:2, 
                    flexDirection:"row",
                    height:30, 
                    marginLeft:15, 
                    marginTop:10,
                    justifyContent:"center",
                    // backgroundColor:"none"
                }}>

                    <View style={{
                        flex:1.43, 
                        height:30,
                        justifyContent:"center"

                    }}>
                        <Text style={styles.titleText} >사업장주소</Text>
                    </View>

                    <View style={ {flex:5,}}>
                        <View style={{flex:1, height:30, marginRight:15, flexDirection:"row", }}>
                            <Item Regular style={styles.SignUpMobileInput}>
                                <Text style={styles.subText}>{this.props.userData.address}</Text>
                            </Item>
                        </View>
                    </View>

                </View>

                <View style={styles.SignUpFormParent}>
                    <View style={styles.SignUpTitle}>
                        <Text style={styles.titleText} >사업장명</Text>
                    </View>
                    <View style={styles.SignUpSubText}>
                        <Item Regular style={{flex:1, height:30, borderBottomWidth:0, }}>
                            <Text style={styles.subText}>{this.props.userData.store}</Text>
                        </Item>
                    </View>
                </View>

                <View style={styles.SignUpFormParent}>
                    <View style={styles.SignUpTitle}>
                        <Text style={styles.titleText}>회사전화번호</Text>
                    </View>
                    <View style={styles.viewStyle}>
                        <TextInput 
                            underlineColorAndroid="transparent"
                            caretHidden={!this.state.isChangeToComPhone}
                            autoFocus={!this.state.isChangeToComPhone}
                            placeholder="사업장 전화번호" 
                            onChangeText={ 
                                (text)=>{
                                    this.setState({
                                        userData : update(this.state.userData, { 
                                            com_phone : {$set:text}
                                        })
                                    })
                                }
                            } 
                            style={{
                                flex:1, 
                                height:50,
                                marginLeft:10,
                                backgroundColor : this.state.isChangeToComPhone ? 'rgba(255, 255, 255, 0.2)': null,
                                color:"#fff",
                                borderLeftWidth: 0.3,
                                borderLeftColor: "#0099ff",
                                padding: 0,
                            }}
                            value={this.state.userData.com_phone}
                        />
                    </View>
                    <Button
                        style={[
                            styles.changeButton,
                            {flex:1.5,}
                        ]}
                        onPress={ 
                            ()=> this.ChangeToinfo("comPhone")
                        }
                    >
                        {!this.state.isChangeToComPhone ? 
                            <Text style={styles.changeButtonText}>변경</Text> : 
                            <Text style={styles.changeButtonText}>수정</Text>}
                    </Button>
                </View>

                <View style={styles.SignUpFormParent}>
                    <View style={styles.SignUpTitle}><Text style={styles.titleText} >사업자번호</Text></View>
                    <View style={styles.viewStyle2}>
                        <Item Regular style={{flex:3, height:30,borderBottomWidth:0,}}>
                            <Text style={styles.subText}>{this.props.userData.serial}</Text>
                        </Item>
                    </View>
                </View>

                <View style={styles.SignUpFormParent}>
                    <View style={styles.SignUpTitle}><Text style={styles.titleText} >주류판매번호</Text></View>
                    <View style={styles.viewStyle2}>
                        <Item Regular style={{flex:3, height:30,borderBottomWidth:0,}}>
                            <Text style={styles.subText}>{this.props.userData.certified}</Text>
                        </Item>
                    </View>
                </View>

            </Content>

            <View style={{flexDirection:"row", marginBottom:50, justifyContent:"space-around",}}>

                <Button 
                    style={{ 
                        width:"45%", 
                        justifyContent:"center",
                        // isChangeToPhoneNum,isChangeToEmail,isChangeToComPhone
                        backgroundColor: this.state.isChangeToPhoneNum  ||  this.state.isChangeToEmail  || this.state.isChangeToComPhone  ? "#fff"  : 'rgba(255,255,255,0.4)',
                    }} 
                    onPress={()=> 
                        this.state.userData.mobile !== Base64.atob(this.props.userData.mobile_enc) ||
                        this.state.userData.email !== this.props.userData.email ||
                        this.state.userData.com_phone !== this.props.userData.phone  ?  this.confirmToChangeData() 
                        : null 
                        
                    }
                >
                    <Text style={{
                        color : "#0099ff"
                    }}>확인</Text>

                </Button>

                <Button  
                    style={{ 
                        width:"45%", 
                        justifyContent:"center",
                        // backgroundColor:"none",
                        borderRadius: 4,
                        borderWidth: 2,
                        borderColor:"#fff",
                    }} 
                    onPress={()=>{
                        Actions.Main()
                    }}
                    >
                    <Text>취소</Text>
                </Button>
            </View>

        </Container>
      );
    }
  }
  
  const styles = StyleSheet.create({
    SignUpFormParent:{
      flexDirection: "row", 
      justifyContent: "flex-start", 
      marginTop: 7,
    },SignUpTitle:{
      flex:1.5, 
      height:30, 
      marginLeft:15, 
      justifyContent:"center",
    },SignUpSubText:{
      flex:5, 
      height:30, 
      marginRight:15, 
      justifyContent:"center",
    },SignUpMobileInput:{
      flex:1,
      height:30, 
      borderBottomWidth:0,
    },
    titleText:{
        fontSize:14,
        color:"#fff",
        fontWeight:"800",
    },
    subText:{
        marginLeft:10,
        fontSize:14,
        color:"#eee",
        fontWeight:"400",
    },
    changeButton:{
        height:30,
        marginRight:10,
        justifyContent:"center",
        backgroundColor:"rgba(0,0,0,0)",
        borderRadius: 5,
        borderWidth: 2,
        borderColor:"#fff",
        paddingTop:4,
    },
    changeButtonText:{
        fontSize:14,
        fontWeight:"800",
    },
    textInput:{
        flex:1, 
        height:30,
        marginLeft:10,
        color:"#eee",
        padding: 0,
    },
    viewStyle:{
        flex:3.2, 
        height:30, 
        marginRight:15, 
        justifyContent:"center"
    },
    viewStyle2:{
        flex:5, 
        height:30, 
        marginRight:15, 
        flexDirection:"row",
    }

});

const mapStateToProps = (state) => {
    return {
            state : state,
            userData : state.reducers.userData
    }; 
};

export default connect(mapStateToProps, null)(ChengeMyInfo);

