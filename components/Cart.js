import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Container, CheckBox, Header, Content, Form, 
  Item, Input, Label,Left,Button,Icon,Text,Body,Title,Right,Row,Col } from 'native-base';
import update from 'immutability-helper'; // 2.6.5

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import * as actions from '../actions';
import BackGroundImage from './util/backGroundImage';
import CartList from './listComponent/CartList'; 
import Head from './Head';

let onClickDeleteButton = false;
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {  
          deleteProduct : false,
          idSaveChecked : false,
          allChecked : false,
          cartCheckCount : 0,
          cartData : {
            usridx: this.props.usridx,
            carts :[]
          }
        };
    this.cartCounter = this.cartCounter.bind(this);
    this.allCheckedHandler = this.allCheckedHandler.bind(this);
    this.cartListIdsave = this.cartListIdsave.bind(this);
    this.BuyProduct = this.BuyProduct.bind(this);
    this.mapToCartList = this.mapToCartList.bind(this);
    this.disableChecked = this.disableChecked.bind(this);
    }

    BuyProduct(){

        if(this.state.cartData.carts.length === 0 || this.state.cartData.carts.length === undefined ){
            return alert('구매할 상품을 선택해주세요')
        }

        if( this.props.reOrderCartListData  ){
            if( this.props.reOrderCartListData.length === undefined || this.props.reOrderCartListData.length === 0 ){
                return alert('구매할 상품이 없습니다')
            }
        }else{
            if( this.props.cartListData.length === undefined || this.props.cartListData.length === 0 ){
                return alert('구매할 상품이 없습니다')
            }
        }

        const that = this;
        fetch('https://api.joomok.net/merchants/prices', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.cartData)
        })
        .then((response) => response.json())
        .then((responseData) => {
            Actions.BuyProduct({
                cartListData : responseData.data,
                mapToCartList : that.mapToCartList,
                cartProductData : this.state.cartData.carts
            })  
        })
        .catch((error) => {
            alert('problem while adding data');
        })
        .done();

    }

    cartCounter(num){

        this.state.cartCheckCount = this.state.cartCheckCount + num;
        if( this.state.cartCheckCount < 0 ){
            this.state.cartCheckCount = 0
        }

        this.setState({});
    }

    cartListIdsave(cartData, type){
        // 카트리스트에서 상품 id를 받아와 배열을 만듦
        if( cartData !== undefined ){         
            if( type === "push"){
                this.state.cartData.carts.push(
                    {   
                        title : cartData.title,
                        code : cartData.code, 
                        qty : cartData.qty,
                    }
                );
            }else{
                const arry = this.state.cartData.carts.filter( 
                    (a) => cartData.code !== a.code
                )
                this.setState({
                    cartData : update(this.state.cartData, { 
                        carts : {$set: arry }
                    })
                })
            }
        }
        return
    }

    allCheckedHandler(onlyFalse){

        if( onlyFalse === 'disable' ){
            this.setState({
                idSaveChecked : false,
                allChecked : false ,
                cartData : {
                    usridx: this.props.usridx,
                    carts :[]
                }
            }) 
            return
        }

        if( onlyFalse === "false" ){
            this.setState({
                idSaveChecked : false
            })
            onlyFalse = null;
        }else{

            //현재 체크값이 트루라면 조건 1.
            this.state.idSaveChecked ?  
                //이곳에서 버튼을 눌렀다면 조건 1-1.
                onlyFalse === "empty" ? 

                //모든 체크값 해제 모든 데이터값 비우기.
                this.setState({
                    idSaveChecked : false,
                    allChecked : false,
                    cartData : {
                        usridx: this.props.usridx,
                        carts :[]
                    }
                }) :
                 //이곳에서 버튼을 누른게 아니라면 값은 두고 현재체크만 해제하기. 
                this.setState({
                    idSaveChecked : false,
                })

            //현재 체크값이 펄스라면 조건 2.    
            : onlyFalse === "empty" ? 
            this.setState({
                idSaveChecked : true,
                allChecked : true
            })
            :
            this.setState({
                idSaveChecked : true,
            })
        }
    }

    disableChecked(action){

        if( action == 'onClickDeleteButton'){
            onClickDeleteButton = true
        }

        if( action == 'reCorver' ){
            onClickDeleteButton = false
        }

        this.setState({
            cartCheckCount : 0
        })

    }

    mapToCartList = (data, bool) => {

        return data.map((cartListData, i) => {
            return (
                <CartList 
                    updateTocartListData={this.props.updateTocartListData}
                    disableChecked={this.disableChecked}
                    modifyCartData={this.modifyCartData}  
                    deleteCartData = {this.props.deleteCartData}
                    data={cartListData}
                    title = { cartListData.title }
                    qty = { cartListData.qty }
                    code = { cartListData.code }
                    cartCounter = { this.cartCounter }
                    allChecked = { this.state.allChecked }
                    allCheckedHandler = { this.allCheckedHandler } 
                    cartListIdsave = { this.cartListIdsave }
                    isVisibleItem = {bool}
                    deleteProduct = { onClickDeleteButton }
                    index = {i} 
                    key={i}
                />);
        })
    }

    render() {
        deleteProduct = false;
        return (
          <Container style={{backgroundColor:"#0099ff",}}>
            <BackGroundImage/>
            <Head 
                title={ this.props.title ? this.props.title : "장바구니"}
                openDrawer={this.props.openDrawer} 
                closeDrawerHome={this.props.closeDrawer} 
                beforePage = { ()=> Actions.OrderMain()}
            /> 

            <View style={{ flex:1, backgroundColor:'#ddd', }}>

                <View style={{ flex:1, marginTop:10, marginBottom:10,}}>

                    <TouchableOpacity 
                        style={{ flexDirection:"row", alignItems:"center", height:40, marginLeft:12, marginBottom:10,}}
                        onPress={()=> this.allCheckedHandler("empty") } 
                    >
                        <CheckBox 
                            checked={this.state.idSaveChecked} 
                            style={{marginTop:10,}} 
                            onPress={()=> this.allCheckedHandler("empty") } 
                            //전체선택 체크박스 옵션
                        />
                        <Text style={{marginLeft:15, marginTop:8, color:"#555"}}>전체선택 총</Text>
                        <Text style={{marginLeft:15, marginTop:8, color:"red",}}>{this.state.cartCheckCount}</Text>
                        <Text style={{marginLeft:15, marginTop:8, color:"#555"}}>/ 
                            {this.props.reOrderCartListData ? this.props.reOrderCartListData.length : this.props.cartListData.length}개
                        </Text>
                    </TouchableOpacity>
                    
                    <View style={{
                        flex:1,
                        width:"94%",
                        marginLeft:"3%",
                        backgroundColor:"#fff",
                        borderRadius:10,
                        marginBottom:30,
                    }}>
                        <View style={{flex:1,marginTop:10,}}>
                            <ScrollView>
                                { this.mapToCartList( this.props.reOrderCartListData ? this.props.reOrderCartListData : this.props.cartListData, false) }
                            </ScrollView>
                        </View>
                    </View>
                </View>

                

                <View style={{height:70, bottom:30, marginTop:10, justifyContent:"space-around", flexDirection:"row",} }>

                    <Button 
                        style={{
                            width:"45%", 
                            justifyContent:"center", 
                            marginTop:10, 
                            backgroundColor: "#0099ff",
                            borderRadius: 4,
                        }}
                        onPress={ ()=> Actions.OrderMain() }
                    >
                        <Text style={{color:'#fff',}}>계속쇼핑</Text>
                    </Button>
                    
                    <Button 
                        style={styles.cartButton} 
                        onPress={
                           this.BuyProduct
                        }>
                        <Text style={{color:'#0099ff',}}>최저가 구매하기</Text>
                    </Button>

                </View>
            </View>

          </Container>
        );
    }
}

const styles = {
    cartButton : {
        width:"45%", 
        justifyContent:"center", 
        marginTop:10, 
        backgroundColor: "rgba(0,0,0,0)",
        borderRadius: 4,
        borderWidth: 3,
        borderColor:"#0099ff",
    }
}

const mapStateToProps = (state) => {
    return {
        searchList: state, 
        cartListData : state.reducers.cartList,
        usridx: state.reducers.usridx,
    }; 
  };

const mapDispatchToProps = (dispatch) =>{
    return{
        updateTocartListData : ( idx, qty ) => {dispatch( actions.updateTocartListData( idx, qty )) },
        cartListDelete : (id) => dispatch( actions.cartListDelete(id) )
    };
};

 
export default connect(mapStateToProps, mapDispatchToProps)(Cart);