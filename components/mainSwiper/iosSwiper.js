import React, { Component } from 'react';
import {StyleSheet, View, Image, Text, ScrollView, Dimensions } from 'react-native';
import {Button} from 'native-base';
import {Actions} from 'react-native-router-flux';

import Swiper from 'react-native-swiper';
import BarChart from '../BarChart';
import OrderList_drink from '../listComponent/OrderList_drink';
import OrderList_company from '../listComponent/OrderList_company';
import moment from 'moment';
import { connect } from 'react-redux';
import { numberWithCommas } from '../Functions'

export const { width, height } = Dimensions.get('window');

let price=[];
let newOrderListData = [];

class iosSwiper extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            newPrice : [],
            mapToOrderList_company : null ,
            mapToOrderList_drink : null,
            newDrinkData:[],
            researchData : {
                usridx : this.props.usridx ,
                status : 0,
                ilimit : 100 , 
                sdate : moment().subtract(6, 'months').format("YYYY-MM-DD") ,
                edate : moment().format("YYYY-MM-DD") ,
              },
        }
    }

    componentWillMount(){

        console.log(this.state.researchData)

        let propValue = this.props.chartData.Price
        let arr = [];
        let newResearchDate;

        for( const i in propValue ){
            arr.push(""+propValue[i])
            price.push(arr[i] !== "0" ? numberWithCommas(arr[i]).split(".")[0] : arr[i])
        }

        let fetchTodata = (url) => {
            return fetch(url, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(this.state.researchData)
            })
            .then((response) => response.json())
        }

        //건별 주문통계 받아오기
        fetchTodata('https://api.joomok.net/statistics/orders')
        .then((responseData) => {

            //결제한 데이터가 하나도 없을 경우 리턴
            if( responseData.data.length === 0){
                return
            }

            
            newResearchDate = responseData.data[0].reg_date
            //상품별 주문통계 받아오기
            fetch('https://api.joomok.net/statistics/products', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        usridx : this.props.usridx ,
                        status : 0,
                        ilimit : 100 , 
                        sdate : newResearchDate,
                        edate : newResearchDate,
                    }
                )
            })
            .then((response) => response.json())
            .then((responseData) => {

                for( const i in responseData.data ){
                    if( responseData.data[i].ordkey === responseData.data[0].ordkey ){
                        newOrderListData.push(responseData.data[i])
                    }
                }

                this.props.marinReorderDataUpdate(newOrderListData);

                let mapToOrderList_drink = (data) => {
                    return data.map((drinkListData, i) => {
                        return (
                            <OrderList_drink 
                                title = {drinkListData.pd_str}
                                category = {drinkListData.tstr}
                                division = {drinkListData.sstr}
                                date = {drinkListData.reg_date}
                                price = {drinkListData.ord_price}
                                qty = {drinkListData.ord_qty}
                                code = {drinkListData.idx}
                                index = {i} 
                                key={i}
                            />);
                    })
                }    
                this.setState({
                    mapToOrderList_drink : mapToOrderList_drink(newOrderListData),
                    newDrinkData : responseData.data,
                })
            })
            .catch((error) => {
                alert('결제데이터 받아오기 실패');
            })

            //상품별 주문통계 받기 끝

            let mapToOrderList_company = (data) => {
                return data.map((companyResearchData, i) => {
                    return (
                        <OrderList_company 
                            index = {i} 
                            comName = {companyResearchData.co_name}
                            date = {companyResearchData.reg_date}
                            price = {companyResearchData.pay_price}
                            key={i}
                        />);
                })
            }    

            this.setState({
                mapToOrderList_company : mapToOrderList_company( responseData.data )
            })

        })
        .catch((error) => {
            alert('결제데이터 받아오기 실패');
        })

    }

    render(){
        return(
            <Swiper 
                index={1}
                showsButtons={true}
                showsPagination={false}
                buttonWrapperStyle={{top:"-20%"}}
                nextButton={<View style={[styles.prevNextButton,{right : -60}]}/>}
                prevButton={<View style={[styles.prevNextButton,{left : -60}]}/> }
            >
                <View style={{height:300, width:"100%" }}>
                    <View style={{ height:340, width:"96%", backgroundColor: 'white', marginLeft:"2%", overflow:"hidden",}}>
                        
                        <View style={{flexDirection:"row", marginTop:30, }}>
                            <View style={{ width:"50%"}}>
                                <BarChart chartData={this.props.chartData}/>
                            </View>
                            
                            <View style={{justifyContent:"center", alignItems:"center", marginRight:10,}}>

                                <View style={{ marginTop:30 }}>
                                    <Text style={styles.priceList}> 이달의결제내역</Text>
                                    <Text style={{fontSize:24, color:"#000", marginTop:7, textAlign:"right"}}>{`${price[2]}원`}</Text>
                                    <Text style={styles.priceTxt}>{`${this.props.chartData.term[1]}월 : ${price[1]} 원`}</Text>
                                    <Text style={styles.priceTxt}>{`${this.props.chartData.term[0]}월 : ${price[0]} 원`}</Text>
                                </View>

                                <View style={{width:120, height:1, marginTop:20, backgroundColor:"#aaa",}}/>

                                <View style={{marginTop:20,}}>
                                    <Text style={styles.priceList}> 최근결제내역</Text>
                                    <Text style={{fontSize:20, color:"#000", marginTop:7, textAlign:"right"}}>{price[2]}</Text>
                                </View> 

                            </View>
                        </View>

                        <View style={{ flex:2, flexDirection:"row", marginTop:15, marginBottom:15, overflow:"hidden",}}>
                            <Button 
                                style={[styles.sliderButton,{backgroundColor:'#0099ff',}]}
                                onPress={()=>Actions.PaymentList({
                                    title : '최근구매내역'
                                })}
                                >
                                <Text style={{fontSize:14, color:"yellow",}}>최근구매내역</Text>
                            </Button>
                            <Button style={styles.sliderButton}
                                onPress={()=>Actions.OrderSelect({
                                    title : '구매내역'
                                })}
                                >
                                <Text style={{fontSize:14, color:"#fff",}}>구매내역</Text>
                            </Button>
                            <Button 
                                style={[styles.sliderButton,{marginRight:5,}]}
                                onPress={
                                ()=> {
                                    this.props.cartListData.length !== 0 ? Actions.Cart() : alert("장바구니가 비어있습니다.")
                                }
                                }
                            >
                                <Text style={{fontSize:14, color:"#fff",}}>장바구니</Text>
                            </Button>
                        </View>
                    </View>
                </View>

                <View style={{height:300, width:"100%" }}>
                    <View style={{width:"96%", backgroundColor: 'white', marginLeft:"2%", overflow:"hidden",}}>
                    
                        <View style={{marginLeft:20,}}>
                            <Text style={styles.maymnetListTxt}>최근구매내역</Text>
                        </View>

                        <View style={{ height:250, }}>
                            <ScrollView 
                                style={{marginBottom:5,}}
                                overScrollMode={'always'}
                            >
                                <View style={{ width:"88%", marginLeft:"6%"}}>  
                                    <View style={styles.researchHeaderWrap}>
                                        <View style={[styles.researchHeader,{flex:5}]}>
                                            <Text style={{color:"#fff", fontSize:14,}}>거래일자</Text>
                                        </View>
                                        <View style={[styles.researchHeader,{flex:3}]}>
                                            <Text style={{color:"#fff", fontSize:14,}}>종류</Text>
                                        </View>
                                        <View style={[styles.researchHeader,{flex:4}]}>
                                            <Text style={{color:"#fff",  fontSize:14,}}>상세</Text>
                                        </View>
                                        <View style={[{
                                            flex:4, 
                                            paddingBottom: 10, 
                                            paddingTop: 10,  
                                            alignItems: "center",
                                            }]}>
                                            <Text style={{color:"#fff", fontSize:14,}}>매입금액</Text>
                                        </View>
                                    </View>
                                    {this.state.mapToOrderList_drink}
                                </View>
                            </ScrollView >
                        </View>    

                        <View style={{ flexDirection:"row", height:40, }}>
                            <Button                           
                                style={styles.sliderButton}
                                onPress={() => this.props.reOrderProduct( newOrderListData, '수정구매')}
                            >
                                <Text style={{color:'#fff'}}>수정구매</Text>
                            </Button>

                            <Button 
                                style={[styles.sliderButton,{marginRight:5,}]}
                                onPress={() => this.props.reOrderProduct( newOrderListData, '바로구매')}
                            >
                                <Text style={{color:'#fff',}}>바로구매</Text>
                            </Button>
                        </View>

                    </View>        
                </View>

                <View style={{height:300, width:"100%" }}>
                    <View style={{width:"96%", backgroundColor: 'white', marginLeft:"2%", overflow:"hidden",}}>
                            <View style={{marginLeft:20,}}>
                                <Text style={styles.maymnetListTxt}>구매내역</Text>
                            </View>

                            <View style={{ height:250, }}>
                                <ScrollView style={{marginBottom:5,}}overScrollMode={'always'}>
                                    <View>
                                        <View style={{ width:"88%", marginLeft:"6%"}}> 
                                            <View style={styles.researchHeaderWrap}>
                                            <View style={[styles.researchHeader]}>
                                                <Text style={{color:"#fff", fontSize:14,}}>거래일자</Text>
                                            </View>
                                            <View style={[styles.researchHeader]}>
                                                <Text style={{color:"#fff", fontSize:14,}}>거래처명</Text>
                                            </View>
                                            <View style={[styles.researchHeader]}>
                                                <Text style={{color:"#fff", fontSize:14,}}>매입금액</Text>
                                            </View>
                                            </View>
                                            {this.state.mapToOrderList_company}
                                        </View>
                                    </View>
                                </ScrollView > 
                            </View>  

                        <View style={{ flexDirection:"row", height:40, }}>
                            <Button                           
                                style={styles.statisticsButton}
                                onPress={()=>Actions.PaymentList()}
                            >
                                <Text style={{color:'#fff',}}>통계보기</Text>
                            </Button>
                        </View>     
                    </View>        
                </View> 

            </Swiper>  
        )
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white'
    },
    child: {
      width,
    },
    text: {
      fontSize: width * 0.5,
      textAlign: 'center'
    },
    prevNextButton:{
        width : 80,
        height : 80,
        borderRadius : 60,
        backgroundColor : "#0099ff" ,
        position:"absolute",
    },
    statisticsButton:{
        flex:1, 
        marginLeft:5, 
        marginRight:5,
        marginBottom:10,
        borderRadius:0,
        justifyContent:"center",
        height:30,
        backgroundColor:"#0099ff",
    },
    researchHeader:{
        flex:3, 
        paddingBottom: 10, 
        paddingTop: 10,  
        alignItems: "center", 
    },
    researchHeaderWrap:{
        flexDirection:"row",
        marginLeft:5,
        marginRight:5,
        backgroundColor:"#bbb",
    },
    maymnetListTxt:{
        fontSize:18, 
        marginTop:10, 
        marginLeft:10, 
        marginBottom:5, 
        color:"#0099ff"
    },
    sliderButton:{
        flex:1, 
        marginLeft:5, 
        borderRadius:0,
        justifyContent:"center",
        height:30,
        backgroundColor:"#0099ff",
    },
    priceTxt:{
        fontSize:12, 
        color:"#888", 
        marginTop:5, 
        textAlign:"right"
    }
    ,priceList:{
        fontSize:22, 
        color:"#007eff", 
        fontWeight:"400", 
        textAlign:"right"
    }

  });

const mapStateToProps = (state) => {
    return {
        usridx: state.reducers.usridx,
    };
};

export default connect(mapStateToProps)(iosSwiper);