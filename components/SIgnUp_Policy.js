import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { Container,Header, CheckBox, Input ,Card, CardItem, Body, Button} from 'native-base';
import {Actions} from 'react-native-router-flux';

import BackGroundImage from './util/backGroundImage';
import Head from './Head';
import * as userInfo from './Terms'

export default class SignUp_Policy extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      checked1 : false,
      checked2 : false,
      checkedAll : false,
      image: null, 
      imageText: "no image",
    };
    this.checkedChanger = this.checkedChanger.bind(this)
  }

  checkedChanger(){
    !this.state.checkedAll ? 
    this.setState({
        checked1 : true,
        checked2 : true,
        checkedAll : true
    }) 
    :
    this.setState({ 
        checked1 : false,
        checked2 : false,
        checkedAll : false
    }) 
  }

  render() {
    return (
      <Container style={{flex:1, backgroundColor:"#0099ff",}}>

            <BackGroundImage/>

            <Head 
                openDrawer={this.props.openDrawer} 
                closeDrawerHome={this.props.closeDrawer} 
                beforePage={Actions.Login}
                title={"회원가입"}
                hideMenu = {true}
            />    

            <View style={{flex:10, backgroundColor:"#fff",}}>


                <View  style={{flex:4, marginTop:10}}>

                    <View style={{flex:1, width:"84%", marginLeft:"8%",}}>

                        <View  style={{flex:1, marginLeft:-10, flexDirection:"row", }}>
                            <CheckBox
                                checked={this.state.checked1}
                                onPress={()=> this.setState({
                                    checked1 : !this.state.checked1,
                                })}
                                style={{
                                    marginTop:-1,
                                    // backgroundColor:"#000",
                                }} 
                            />
                            <Text style={{marginLeft:15, color:"#555",}}>이용약관에 동의합니다.</Text>
                        </View>

                        <View style={{ flex:9, backgroundColor:"#fff", borderWidth:1, borderColor:'#aaa' }} >
                            <ScrollView >
                                <Body scrollEnabled={true}>
                                    <Text style={{marginLeft:5, marginTop:5, marginRight:5, marginBottom:5, }}>
                                        {userInfo.Terms1}
                                    </Text>
                                    <Text style={{marginLeft:5, marginTop:5, marginRight:5, marginBottom:5, }}>
                                        {userInfo.Terms2}
                                    </Text>
                                </Body>
                            </ScrollView>
                        </View>

                    </View>
                </View>


                <View  style={{flex:4, marginTop:20, marginBottom:20,}}>

                    <View style={{flex:1, width:"84%", marginLeft:"8%", 
                    // backgroundColor:"none",
                }}>

                        <View  style={{flex:1, marginLeft:-10, flexDirection:"row", }}>
                            <CheckBox
                                checked={this.state.checked2}
                                onPress={()=> this.setState({
                                    checked2 : !this.state.checked2,
                                })}
                                style={{
                                    marginTop:-1,
                                    // backgroundColor:"#000",
                                }} 
                            />
                            <Text style={{marginLeft:15, color:"#555",}}>개인정보 취급방침에 동의합니다.</Text>
                        </View>

                        <View style={{ flex:9, backgroundColor:"#fff",  borderWidth:1, borderColor:'#aaa'}} >
                            <ScrollView >
                                <Body scrollEnabled={true}>
                                    <Text style={{marginLeft:5, marginTop:5, marginRight:5, marginBottom:5,}}>
                                        {userInfo.Privacy}
                                    </Text>
                                </Body>
                            </ScrollView>
                        </View>

                    </View>
                </View>


                <View style={{flex:2, width:"84%", marginLeft:"8%", }}>
                    <View>
                        
                        <View style={{flexDirection:"row",}}>

                            <CheckBox 
                                checked={this.state.checkedAll}
                                onPress={this.checkedChanger} 
                                style={{marginLeft:-10, marginTop:-2,}}
                            />
                            <Text style={{marginLeft:15, color:"#555",}}>모두동의합니다.</Text>

                        </View> 

                        <View style={{flexDirection:"row", marginTop:15,}}>
                            
                            <Button style={{
                                        flex:1, 
                                        height:45, 
                                        marginRight:10, 
                                        justifyContent:"center",
                                        backgroundColor:"#0099ff",
                                    }} 
                                onPress={
                                    ()=> {
                                        if( this.state.checked1 && this.state.checked2 ){
                                            Actions.MyWeb({
                                                url : "http://pay.joomok.net/certify/doit"
                                            })  
                                        }else{
                                            alert("이용약관에 동의해주세요")  
                                        }
                                    }
                                }
                            >
                                <Text style={{color:"#fff", fontSize:18,}}>확  인</Text>
                            </Button> 

                            <Button style={{
                                        flex:1, 
                                        height:45, 
                                        marginRight:10, 
                                        justifyContent:"center",
                                        backgroundColor:"rgba(0,0,0,0)",
                                        borderWidth: 3,
                                        borderColor:"#0099ff",
                                    }} 
                                    onPress={()=> Actions.pop()}
                            >
                                <Text style={{color:"#0099ff", fontSize:18,}}>취   소</Text>
                            </Button> 
                            
                        </View>
                    </View> 
                </View>
                
            </View>

      </Container>
    );
  }
}

