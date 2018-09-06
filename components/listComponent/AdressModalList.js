 
 import React, { Component } from 'react';
 import { StyleSheet, TouchableOpacity,Modal,View,TouchableHighlight } from 'react-native';
 import { Container, Content, Body, Title , Text, Button, Drawer, Switch,
        Header, Grid, Col, Row, List, ListItem,Icon } from 'native-base';
 import {Actions} from 'react-native-router-flux';
 import {connect} from 'react-redux';
 
 class AdressModalList extends Component {
    constructor(props) {
      super(props);
      this.state={
          addressListData : this.props.addressListData,
      }
    }

    render() {
      return (
        <View style={{marginTop:10 , backgroundColor:"#fff",}} >
            <View style={{flexDirection:"row", justifyContent:"space-between",}}>
                <View>
                    <Text style={{fontSize:12,}}>지번 : {this.props.jibun} </Text>
                    <Text style={{fontSize:12,}}>신주소 : {this.props.roadbun} </Text>
                    <Text style={{fontSize:12,}}>우편번호 : {this.props.zip} </Text>
                </View>
                <Button 
                    onPress={()=>this.props.selectAdress(this.props.jibun,this.props.zip)}
                >
                    <Text>선택</Text>
                </Button>
            </View>
        </View>
      )
    }
 }
 
 const action = (data) => {
  return {
      type: 'data',
      payload: data
  };
};

export default connect(null, {action})(AdressModalList);
 
