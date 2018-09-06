import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { Container, CheckBox, Header, Content, Form, 
  Item, Input, Label,Left,Button,Icon,Text,Body,Title,Right,Grid,Col,Row, Card, CardItem, Badge } from 'native-base';
import {Actions} from 'react-native-router-flux';
import * as actions from '../actions';
import SearchList from './listComponent/SearchList';
import {connect} from 'react-redux';
import { Linking } from 'react-native';

import OrderCompany_list from './listComponent/OrderCompany_list';
import Head from './Head';

class OrderCompanyList extends Component {

  constructor(props) {
    super(props);
    this.state = {
        contactList:[
            {
                number: '01089528963', 
                prompt: true 
            },
            {
                number: '01072276746', 
                prompt: true 
            }
        ]
    };
    this.companyContact = this.companyContact.bind(this)
  }

  companyContact(number){
    Linking.openURL('tel:01089528963')
  }
  
  render() {
    const mapToCompanyList = (data) => {
        return data.map((CompanyData, i) => {
            return (
                <OrderCompany_list
                    companyTitle={CompanyData.companyTitle}
                    CompanyData={CompanyData}
                    companyContact={ this.companyContact }
                    posDay={CompanyData.posDay}
                    posDrink={CompanyData.posDrink}
                    cartListUpdate ={this.props.cartListUpdate}
                    index={i}
                />
                );
        })
    }

    return (
        <Container style={{flex:1, backgroundColor:"#fff",}}>
            <Head 
                title={"주문하기"}
                openDrawer={this.props.openDrawer} 
                closeDrawerHome={this.props.closeDrawer} 
                beforePage = { ()=> Actions.Main() }
            />
            <ScrollView>
                <View style={{flex:1,}}>
                    <View style={{flex:3, alignItems:"center",}}>
                        <View style={{flexDirection:"row", width:"90%", justifyContent:"space-between", marginTop:20,}}>
                            <Button style={styles.BuyButton}><Text>한도요청</Text></Button>
                            <Button style={styles.BuyButton}><Text>결제</Text></Button>
                        </View>
                    </View>
                    <View style={{
                        flex:2,
                        height:50,
                        marginTop:10,
                        alignItems:"center", 
                        justifyContent:"center", 
                        borderTopWidth:1,
                        borderBottomWidth:1,
                        borderColor:"#bbb",
                    }}>
                        <Text style={{fontSize:14, color:"#777",}}>신용거래가 있는 경우 해당 도매점 거래만 가능</Text>
                        <Text style={{fontSize:14, color:"#777",}}>다른 도매점을 워하시면 신용거래 완료 후 결제</Text>
                    </View>

                    <View style={{
                        flex:20,
                        marginTop:10,
                        alignItems:"center", 
                        justifyContent:"center", 
                    }}>
                        {mapToCompanyList(this.props.companyList)} 
                    </View>
                </View>
            </ScrollView>    
        </Container>
    );
  }
}

const styles = StyleSheet.create({
    Chart:{
        width:"100%",
        height:15,
        marginTop:10,
        backgroundColor:"#ddd",
    },chartInnerPay:{
        width:"80%",
        height:15,
        backgroundColor:"yellow",
    },chartInnerDay:{
        width:"50%",
        height:15,
        backgroundColor:"skyblue",
    },BuyButton:{
        width:"48%",
        justifyContent:"center",
        backgroundColor :"#F57A00" ,
    }
});
  
export default connect( 
(state) => ({
    searchList: state,
    companyList : state.reducers.companyList
}),
(dispatch) => {
    return{
      cartListUpdate : (cartListData) => dispatch( actions.cartListUpdate(cartListData) )
    };
}
)(OrderCompanyList);
