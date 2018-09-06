import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity,Image, TextInput } from 'react-native';
import { Container, CheckBox, Header, Content, Form, 
  Item, Input, Label,Left,Button,Icon,Text,Body,Title,Right } from 'native-base';
import * as firebase from 'firebase'
import {Actions} from 'react-native-router-flux';
import Head from './Head';
import BackGroundImage from './util/backGroundImage';

import ModalDropdown from 'react-native-modal-dropdown';

export default class SignUp_Authentication extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      isNumFocus : false,
      mobileNum : '010' ,
      mobileNumArr : [
        '010',
        '011',
        '016',
        '017',
        '018',
        '019',
        '070',
      ],
      idSaveChecked: false, 
      name : null ,
      phoneNum : null,
      authNu : null
    };
    this.searchId = this.searchId.bind(this);
    this.searchPass = this.searchPass.bind(this);
  }

  searchId(){
    alert("아이디 찾기");
  }

  searchPass(){
    alert("비밀번호 찾기");
  }

  render() {
    return (
      <Container style={{flex:1, backgroundColor:"#0099ff",}} >

        <BackGroundImage/>

        <Head 
            title={this.props.title}
            openDrawer={this.props.openDrawer} 
            closeDrawerHome={this.props.closeDrawer} 
            beforePage = { ()=> Actions.Login() }
            hideMenu = {true}
        />

        <View style={{flex:1, backgroundColor:'#fff',}}>

          <View style={{flex:7, backgroundColor:'#fff', marginTop: this.state.isNumFocus ? -220 : 0 ,}}> 
            <View style={{ width:'90%', marginLeft:'5%', marginTop:20, flexDirection:'row', }}>
              <View style={{flex:1, height:40, borderBottomWidth:1, borderBottomColor:'#0099ff',}}>
                <Text style={{fontSize:24, color:'#0099ff',}}>본인인증</Text>
              </View>
              <View style={{flex:1, height:40, borderBottomWidth:1, borderBottomColor:'#ddd',}}></View>
              <View style={{flex:1, height:40, borderBottomWidth:1, borderBottomColor:'#ddd',}}></View>
            </View>

            <View style={{ width:'90%', height:40, marginTop:20,  marginLeft:'5%', justifyContent: 'center'}}>
              <Text style={{textAlign: "center", color:"#000", fontWeight:'100', fontSize:21, marginTop:5,}} >휴대폰을 통해 본인 인증을 진행해주세요.</Text>
            </View>

            <View style={{flexDirection:"row", width:'90%', marginLeft:'5%', marginTop:10,}}>
              <View style={{flex:2, height:40, justifyContent:"center",}}>
                  <Text style={{fontSize:24, color:'#555',}}>이름</Text>
              </View>
              <TextInput 
                  underlineColorAndroid='transparent'
                  style={{flex:5, height:40, backgroundColor:'#eee', color:'#999', fontSize:20,}}
              />
            </View>

            <View style={{flexDirection:"row", width:'90%', marginLeft:'5%', marginTop:10,}}>
              <View style={{flex:2, height:40, justifyContent:"center",}}>
                  <Text style={{fontSize:24, color:'#555',}}>휴대폰</Text>
              </View>
              <View style={{
                          flex:1.5, 
                          backgroundColor:'#eee',
                          marginRight:2, 
                          flexDirection:"row",
                          alignItems:"center",
                      }}>
                  <Text style={{ fontSize:14,flex:3, textAlign:"center", color:"#70aed5",}}>
                      {   
                        this.state.mobileNum
                      }
                  </Text>
                  <ModalDropdown 
                      onSelect={
                          (i,v)=> this.setState({
                            mobileNum : this.state.mobileNumArr[i] ,
                          })
                      }
                      dropdownStyle={{width:85, marginLeft:-64,}}
                      options={this.state.mobileNumArr}
                      style={{ height:40, flex:1.4,
                              justifyContent:"center", 
                              alignItems:"center",
                              flexDirection:"row",
                          }}    
                  >   
                      <Icon type="FontAwesome"  name="caret-down" 
                          style={{
                              fontSize:18,   
                              color: "#0099ff" 
                          }}
                      />
                  </ModalDropdown>   
              </View>  
              <TextInput 
                style={{flex:3.45, height:40, backgroundColor:'#eee', color:'#999', fontSize:20, marginLeft:3,}}
                underlineColorAndroid='transparent'
              />
            </View>

            <Button block style={{ marginLeft:'5%', marginRight:'5%', marginTop:10, backgroundColor:'#fff', borderWidth:1, borderColor:'#999',}}
              onPress={this.mobileCertification}
            >
              <Text style={{fontSize:20, color:'#999',}} >인증번호발송</Text>
            </Button>

            <View style={{flexDirection:'row',}}>
              <View style={{flexDirection:'row', marginTop:10,}}>
                <CheckBox 
                  checked={this.state.idSaveChecked} 
                  style={{marginTop:8}} 
                  //체크박스 옵션
                  onPress={ ()=>{
                      this.state.idSaveChecked ?
                      this.setState({
                        idSaveChecked: false}) : 
                      this.setState({
                        idSaveChecked: true
                      })
                    }
                  } 
                />
                <TouchableOpacity>
                  <Text style={styles.loginSubText}>휴대폰 번호 수집 및 제공에 동의 합니다</Text>
                  <Text style={styles.loginSubText}>수집된 정보는 인증 후 회원가입에 활용 됩니다.</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flex:2, flexDirection:"row", width:'90%', marginLeft:'5%', marginTop:25, borderTopWidth:1, borderColor:'#aaa',}}>

              <View style={{flex:2, height:40, justifyContent:"center", marginTop:25, }}>
                  <Text style={{fontSize:24, color:'#555',}}>인증번호</Text>
              </View>

              <TextInput 
                style={{flex:5, height:40, marginTop:25,  backgroundColor:'#eee', color:'#999', fontSize:20,}}
                underlineColorAndroid='transparent'
                onFocus={()=>this.setState({isNumFocus:true})}
                onBlur={()=>this.setState({isNumFocus:false})}
              />

            </View>

          </View>

          <View style={{
              flex:2, 
              flexDirection:"row", 
              marginTop:10, 
              bottom:10, 
              justifyContent:"space-around", 
              alignItems:'center',
              backgroundColor:'#fff',
            }}>
              <Button style={{ width:"45%", height:60, backgroundColor:'#0099ff', justifyContent:"center",}} onPress={
                ()=>{
                    if( this.props.title === "아이디 찾기" ){
                      this.searchId()
                    }else if(this.props.title === "비밀번호 찾기"){
                      this.searchPass() 
                    }else{
                      Actions.SignUp_Information()
                    }
                  }
                }
              ><Text>확인</Text></Button>
              <Button style={{ width:"45%", height:60, backgroundColor:'#fff', borderWidth:3, borderColor:'#0099ff',  justifyContent:"center",}}
                onPress={ 
                  ()=>Actions.Login()
                }
              ><Text style={{color:'#0099ff',}}>취소</Text></Button>
          </View>

        </View>


      </Container>
    );
  }
}

const styles = StyleSheet.create({
  loginSubText:{
    fontSize: 14,
    marginTop:3,
    marginLeft:20,
    color:"#999",
  }
});

