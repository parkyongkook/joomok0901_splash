import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { Container , Header, Content, Input, Button, Icon, Text, Grid, Col, Row, Badge} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast'

import * as actions from '../actions';
import SearchList from './listComponent/SearchList';
import Head from './Head';
import BackGroundImage from './util/backGroundImage';

class OrderMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: this.props.userData.product_type, //회원 자격(유흥.일반) 별로 나오는 상품 목록이 달라짐.
            SearchList: false,
            SeachKeywords: "",
            searchListData: this.props.searchList,
            cartList: [],
            stateOfComponent: this.props.stateOfComponent,
        }
        this.SearchListActivator = this.SearchListActivator.bind(this);
        this.viewSeachList = this.viewSeachList.bind(this);
        this.increamentCartCount = this.increamentCartCount.bind(this);
        this.mapToSearchList = this.mapToSearchList.bind(this);
        this.clickToCartButton = this.clickToCartButton.bind(this);
        this.deleteCartData = this.deleteCartData.bind(this);
        this.returnToDrinkCategory = this.returnToDrinkCategory.bind(this);
        this.changeStateOfComponent = this.changeStateOfComponent.bind(this);
    }

    componentWillMount() {
        this.props.cartListData ? 
        this.setState({ cartList: this.props.cartListData }) : 
        this.setState({ cartList: [] });
        this.state.stateOfComponent ? this.props.changeStateOfcomponent : null
    }

    returnToDrinkCategory( categoryType, imgUrl, title ){
        return <TouchableOpacity onPress={() => this.viewSeachList(this.state.userType, categoryType)}>
                    <View style={{ height: 140, marginRight:7, backgroundColor:'#fff', }}>
                        <View style={{height:110,}}>
                            <Image
                                source={imgUrl}
                                style={{ width: 90, height: 90, marginTop:10, marginLeft:15,}}
                            />
                        </View>
                        <View style={styles.drinkListText}>
                            <Text style={{color:'#fff', fontWeight:'800', fontSize:14,}}>{title}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
    }

    changeStateOfComponent(){
        this.setState({
            stateOfComponent: false
        })
    }

    SearchListActivator(text) {
        // 검색창에 입력한 tet값을 viewSeachList 함수에 인자로 전달하며 조건에 맞는 값을 filter로 뽑아 맵핑함.
        if (text.length >= 1) {
            this.viewSeachList( this.props.userData.product_type , text, 1)
        } else {
            this.setState({
                stateOfComponent: false
            })
        }
    }

    viewSeachList( userType, drinkType, isSearch) {

        function drinkListFilterFunc(obj) {
            if (isSearch && drinkType !== undefined) {
                for (const k in obj) {
                    if (obj.pd_str.indexOf(drinkType) > -1) {
                        return true
                    }
                }
            } else {
                for (const k in obj) {
                    if (obj.tcode == drinkType && (obj.scode == userType || obj.scode == "003")) {
                        return true
                    }
                }
            }
        };

        const coll = this.props.drinkData.filter(drinkListFilterFunc);

        this.setState({
            mapComponents: this.mapToSearchList(coll, drinkType),
            stateOfComponent: true
        })
        this.props.stateOfComponent
    }

    mapToSearchList(data , drinkType) {
        if( data.length === 0 ){
            return <SearchList 
                title = {"제품이 없습니다."}
                usridx = {this.props.usridx}
            />
        }else{
            return data.map((mergeDayData, i) => {
                return (<SearchList
                    drinkType ={drinkType}
                    imgUrl = {mergeDayData.pd_file}
                    usridx = {this.props.usridx}
                    title = {mergeDayData.pd_str}
                    unit = {mergeDayData.pd_qty}
                    toast = {this.refs.toast}
                    increamentCartCount = {this.increamentCartCount}
                    initioalCounter = {0}
                    uniqId = {mergeDayData.idx}
                    key = {i}
                />);
            })
        }
    }

    increamentCartCount(cartListObj,toastFunc) {
        //같은상품 2번 담는것 방지
        const coll = this.state.cartList
        for( const v of coll ){
           for(const value in v){
                if( v.code === cartListObj.code){
                    alert("상품이 장바구니에 이미 있습니다.")
                    return false
                }
           }
        }
        this.state.cartCount = this.state.cartCount +1
        this.state.cartList.push(cartListObj);
        this.props.cartListUpdate(this.state.cartList)
        this.setState({});
        return true
    }

    deleteCartData(id){

        function newCartList(obj) {
            if ( obj.code !== id ) {
                return true
            }
        };

        const coll = this.state.cartList.filter(newCartList);
        this.setState({
            cartList : coll,
        })

    }

    clickToCartButton(){
        //카트리스트에 담긴 상품이 0이 아니라면 (0보다 많으면) 카트로 넘어감.
        if ( this.state.cartList.length !== 0 ) {
            Actions.Cart({
                deleteCartData : this.deleteCartData,
            });
        }
    }

    render() {
        const category = (
            <View>
                <View style={{ flex: 1, flexDirection: "row", }}>
                </View>
                <View style={{ marginTop: 10, width:'94%', marginLeft:"3%", paddingTop:5, paddingBottom:20, borderRadius:10, }}>
                    <Grid>
                        <Row>
                            <Col>
                                {this.returnToDrinkCategory( "00002", require('../assets/img/soju.png'), '소주' )}
                            </Col>
                            <Col>
                                {this.returnToDrinkCategory( "00001", require('../assets/img/brew.png'), '맥주' )}
                            </Col>
                            <Col>
                                {this.returnToDrinkCategory( "00003", require('../assets/img/intBrew.png'), '수입맥주' )}
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 20, }}>
                            <Col>
                                {this.returnToDrinkCategory( "00004", require('../assets/img/natBeer.png'), '생맥주' )}
                            </Col>
                            <Col>
                                {this.returnToDrinkCategory( "00005", require('../assets/img/whisky.png'), '양주' )}
                            </Col>
                            <Col>
                                {this.returnToDrinkCategory( "00006", require('../assets/img/wine.png'), '와인' )}
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 20, }}>
                            <Col>
                                {this.returnToDrinkCategory( "00007", require('../assets/img/mak.png'), '전통주' )}
                            </Col>
                            <Col>
                                {this.returnToDrinkCategory( "00008", require('../assets/img/sake.png'), '사케' )}
                            </Col>
                            <Col>
                                {this.returnToDrinkCategory( "00009", require('../assets/img/etc.png'), '기타' )}
                            </Col>
                        </Row>

                    </Grid>
                </View>
            </View>
        )
        return (
            <Container style={{ backgroundColor: "#0099ff", }}>
            
                <BackGroundImage/>

                <Head
                    title={"제품선택"}
                    openDrawer={this.props.openDrawer}
                    closeDrawerHome={this.props.closeDrawer}
                    stateOfComponent = {this.state.stateOfComponent}
                    changeStateOfComponent = {this.changeStateOfComponent}
                    beforePage={
                        () => {
                            this.state.stateOfComponent ? this.setState({ stateOfComponent: false }) : Actions.pop();
                        }
                    }
                />

                <Header noShadow searchBar style={{ flexDirection: "column", 
                    backgroundColor: "rgba(0,0,0,0)",
                    height: 100, paddingTop: 0, }} 
                >

                    <View style={[styles.orderButton,{flex:0, height:40,}]}>
                        <Input
                            placeholder="검색하기"
                            placeholderTextColor='#fff'
                            onChangeText={this.SearchListActivator}
                            value={this.state.SeachKeywords}
                            style={{
                                width:'100%', color:'#fff', 
                                marginLeft:10, fontSize:14, 
                                height: 40,
                            }}
                        />

                        <Icon name="ios-search" style={{ position: "absolute", right: 10, top:2, color:'#fff', }} />
                        <View
                            style={{
                                borderLeftWidth:1,
                                borderLeftColor:'#fff',
                                height:20,
                                position:'absolute',
                                right:50,
                            }}
                        />
                    </View> 
                    
                    <View style={{ flexDirection: "row", marginTop: 10, }}>

                        <Button style={styles.orderButton}>
                            <Text style={{ fontSize: 14, }}>최근내역재주문</Text>
                        </Button>

                        <Button style={styles.orderButton} onPress={this.clickToCartButton} >
                            <Text style={{ fontSize: 14, }}>장바구니</Text>
                            <Badge style={styles.badge}>
                                <Text style={{ color: "#555" }}>{this.props.cartListData.length}</Text>
                            </Badge>
                        </Button>
                    </View>

                </Header>

                <Content>
                    {
                    this.state.stateOfComponent ?
                    this.state.mapComponents
                    : category
                    }
                </Content>
                
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
        height:25,
        marginLeft:5,
        marginRight:5,
        justifyContent: "center",
        alignItems:'center',
        backgroundColor:"#03ccad",
    },
    orderButton:{
        flex: 1,
        height: 40,
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 0,
        paddingRight: 0,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0)",
        borderRadius: 4,
        borderWidth: 3,
        borderColor:"#fff",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 1,
        shadowOpacity: 0.2,
    },
    badge:{
        backgroundColor: "#fff", 
        width:23, 
        height:23, 
        paddingRight:0, 
        paddingLeft:0,
        paddingTop:0,
        paddingBottom:0,
    }
});

const mapStateToProps = (state) => {
    return {
        userData : state.reducers.userData ,
        drinkData: state.reducers.drinkJsonData.data,
        usridx: state.reducers.usridx,
        cartListData: state.reducers.cartList
    }; 
  };

const mapDispatchToProps = (dispatch) =>{
    return{
      cartListUpdate : (cartListData) => dispatch( actions.cartListUpdate(cartListData) )
    };
};

 
export default connect(mapStateToProps, mapDispatchToProps)(OrderMain);




