import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity,Image,TextInput } from 'react-native';
import { Container, Content, Form, Item,Button,Icon,Text,Picker } from 'native-base';
  
import {Actions} from 'react-native-router-flux';
import update from 'immutability-helper'; // 2.6.5

import BackGroundImage from './util/backGroundImage';
import Head from './Head';

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        DrinkSelected: "key0",
        memoData : {
            usridx: this.props.usridx,
            title: "title",
            posit : "거래처" ,
            content: null,
        } ,
    }
    this.memoTextActivate = this.memoTextActivate.bind(this);
    this.submitMemoData = this.submitMemoData.bind(this);
  }

  memoTextActivate(text){
    this.setState({
        memoData : update(this.state.memoData, { 
            content : {$set:text}
        }),
    }) 
  }

  submitMemoData(){
    if( this.state.memoData.content === null || this.state.memoData.content === ''  ){
       alert("내용을 입력해주세요")
    }else{
        fetch('https://api.joomok.net/boards/qna', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.memoData)
        })
        .then((response) => response.json())
        .then((responseData) => {
            alert("메시지를 보냈습니다.")
            console.log(responseData)
        })
        .catch((error) => {
            console.log(error)
            alert('problem while adding data');
        })
        .done();   
    }
  }

  onValueChange(value: string) {
    this.setState({
        DrinkSelected: value
    });
  }

  render() {
    return (

    <Container style={{backgroundColor:"#0099ff",}}>

        <BackGroundImage/>

        <Head 
            title={"고객센터"}
            openDrawer={this.props.openDrawer} 
            closeDrawerHome={this.props.closeDrawer} 
            beforePage = { ()=> Actions.Main() }
        />

        <Content style={{flex:1, backgroundColor:'#eee',}}>

            <View style={{flex:3, marginTop:30, marginLeft:20, marginRight:20,}}>

                <Text style={{color:'#999'}}>문의사항이 있으면 남겨주세요.</Text>
                <TextInput 
                  placeholder='메모를 작성해 주세요'
                  multiline={true} 
                  onChangeText={ this.memoTextActivate} 
                  style={{ 
                      height:200, 
                      backgroundColor:"#fff", 
                      marginTop:10, 
                      marginBottom:20,
                      paddingLeft:10,
                      borderWidth:1,
                      borderColor:'#777',
                    }} 
                />

                <View style={{ flex:1, marginTop:10,}}>

                    <View style={{ flex:3, flexDirection:"row",}}>
                        <Form style={{ flex:1, backgroundColor:"#ddd",}}>
                            <Picker
                                mode="dropdown"
                                iosHeader="선택"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                placeholder="선택"
                                placeholderStyle={{ color: "#000" }}
                                placeholderIconColor="#000"
                                style={{ width: '100%' }}
                                selectedValue={this.state.DrinkSelected}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Picker.Item label="거래처" value="key0" />
                                <Picker.Item label="고객센터" value="key1" />
                            </Picker>
                        </Form>

                        <Button 
                            style={{flex:1, marginLeft:10, backgroundColor:'#0099ff', justifyContent:"center",}} onPress={()=>alert("전송 되었습니다.")}
                            onPress={
                                ()=> this.submitMemoData()
                            }
                        >
                            <Text>전송</Text>
                        </Button>
                    </View>
                </View>


                <View style={{ height:100, marginTop:60, backgroundColor:"#fff",}}>
                    <View style={{flexDirection:'row',}}>
                        <Text style={{flex:1, height:50, paddingLeft:10, paddingTop:15, color:'#999',}}>서울상사</Text>
                        <Text style={{flex:1, height:50, textAlign:'right', paddingRight:10, paddingTop:15, color:'#999',}}>02-000-0000</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{flex:1, height:50, paddingLeft:10, paddingTop:15, color:'#999',}}>APP 문의전화</Text>
                        <Text style={{flex:1, height:50, textAlign:'right',  paddingRight:10, paddingTop:15, color:'#999',}}>1588-1234</Text>
                    </View>
                </View> 

            </View>

        </Content>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
    noticeFormTitle:{
        backgroundColor: "blue",
        paddingBottom: 10, 
        paddingTop: 10,  
        alignItems: "center",
    },
    noticeFormShare:{
        backgroundColor: "#ddd",
        paddingBottom: 10, 
        paddingTop: 10,  
        alignItems: "center",
    },noticeFormSubtitle:{
        borderLeftWidth: 1, 
        borderLeftColor: "#fff", 
    }

});

