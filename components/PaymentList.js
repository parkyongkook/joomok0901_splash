import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Image, ScrollView, Platform } from 'react-native';
import {
  Container, CheckBox, Header, Content, Form,
  Item, Input, Label, Left, Button, Icon, Text, Body, Title, Right, Picker, Grid, Col, Row, Badge, Segment, Footer
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'
import Head from './Head';
import SearchList from './listComponent/SearchList';
import OrderList from './listComponent/OrderList';
import OrderList_drink from './listComponent/OrderList_drink';
import OrderList_company from './listComponent/OrderList_company';
import moment from 'moment';
import update from 'immutability-helper'; // 2.6.5

let subTractNum = 1 ;

class PaymentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapToOrderList_drink : null,
      mapToOrderList_company : null , 
      afterDate: moment().format("YYYY-MM-DD"),
      beforeDate: moment().format("YYYY-MM-DD"),
      maxDate: null,
      minDate: null,
      listCategory: "com",
      researchData : {
        usridx : this.props.usridx ,
        status : 0,
        ilimit : 100 , 
        sdate : moment().subtract(1, 'months').format("YYYY-MM-DD") ,
        edate : moment().format("YYYY-MM-DD") ,
      },
      totalOrder:0,
      totalPrice:0,
    }
    this.dateChanger = this.dateChanger.bind(this);
    this.updateToResearchData = this.updateToResearchData.bind(this);
    this.mapToOrderList_drink = this.mapToOrderList_drink.bind(this);
  }

  componentWillMount(){
    //건별 주문통계 받아오기
    this.updateToResearchData()
  }


  dateChanger(monthChange) {
    subTractNum = monthChange
    this.setState({
      researchData : update(this.state.researchData, { 
        sdate : {$set: moment().subtract(monthChange, 'months').format("YYYY-MM-DD") }
      })
    })
  }
  

  updateToResearchData(moreData,subTract){

      let fetchTodata = (url) => {
        return fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: moreData !== "moreData" ? JSON.stringify( this.state.researchData ) : 
          JSON.stringify({
            usridx : this.props.usridx ,
            status : 0,
            ilimit : 100 , 
            sdate : subTract ,
            edate : moment().format("YYYY-MM-DD") ,
          })

        })
        .then((response) => response.json())
      }

      //건별 주문통계 받아오기
      fetchTodata('https://api.joomok.net/statistics/orders')
      .then((responseData) => {

        if( moreData === "moreData" ){
          if(this.state.totalOrder === responseData.data.length){
            return alert("더이상 조회할 데이터가 없습니다.")
          }
        }

        let totPrice = 0

        for(const i in responseData.data){
          totPrice += responseData.data[i].pay_price
        }

        this.setState({
          mapToOrderList_company : this.mapToOrderList_company(responseData.data),
          totalOrder : responseData.data.length ,
          totalPrice : totPrice,
        })

      })
      .catch((error) => {
          alert('결제데이터 받아오기 실패');
      })

      //상품별 주문통계 받아오기
      fetchTodata('https://api.joomok.net/statistics/products')
      .then((responseData) => {
        this.setState({
          mapToOrderList_drink : this.mapToOrderList_drink(responseData.data)
        })
      })
      .catch((error) => {
          alert('결제데이터 받아오기 실패');
      })
  }


  mapToOrderList_drink = (data) => {
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

  mapToOrderList_company = (data) => {
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

  render() {
    const companyResearchComponent = 
      <View>
        <View style={{ width:"88%", marginLeft:"6%"}}> 
            <View style={styles.researchComponentHeader}>
              <View style={[styles.drinkResearchComTitle]}>
                  <Text style={{color:"#fff", fontSize:14,}}>거래일자</Text>
              </View>
              <View style={[styles.drinkResearchComTitle]}>
                  <Text style={{color:"#fff", fontSize:14,}}>거래처명</Text>
              </View>
              <View style={[styles.drinkResearchComTitle]}>
                  <Text style={{color:"#fff", fontSize:14,}}>매입금액</Text>
              </View>
            </View>
            {this.state.mapToOrderList_company}
          </View>
      </View>

    const drinkResearchComponent =

      <View style={{ width:"88%", marginLeft:"6%"}}>  
        <View style={styles.researchComponentHeader}>
            <View style={[styles.drinkResearchComTitle,{flex:5}]}>
                    <Text style={{color:"#fff", fontSize:14,}}>거래일자</Text>
            </View>
            <View style={[styles.drinkResearchComTitle,{flex:3}]}>
                    <Text style={{color:"#fff", fontSize:14,}}>종류</Text>
            </View>
            <View style={[styles.drinkResearchComTitle,{flex:4}]}>
                <Text style={{color:"#fff",  fontSize:14,}}>상세</Text>
            </View>
            <View style={[styles.drinkResearchComTitle,{flex:4}]}>
                <Text style={{color:"#fff", fontSize:14,}}>매입금액</Text>
            </View>
        </View>
        {this.state.mapToOrderList_drink}
      </View>

    return (
      <Container style={{ backgroundColor: "#0099ff", }}>

        <Head
          title={
            this.props.title ? this.props.title : "주문목록"
          }

          openDrawer={this.props.openDrawer}
          closeDrawerHome={this.props.closeDrawer}
          beforePage={() => Actions.Main()}
        />

        <View style={{ flex: 1, backgroundColor: '#eee', }}>
         
          <View style={{
            height: 250,
            width: "90%",
            paddingTop: Platform.OS === 'ios' ? 10 : 0,
            marginTop: 20,
            marginLeft: "5%",
            marginBottom: 10,
            backgroundColor: "#fff",
          }}>

            <Segment style={{ backgroundColor: Platform.OS === 'ios' ? '#fff' : '#0099ff', }}>

              <Button first active={this.state.listCategory === "com"}
                onPress={() =>
                  this.setState({ listCategory: "com" })
                }>
                <Text>거래처별</Text>
              </Button>

              <Button active={this.state.listCategory === "drink"}
                onPress={() =>
                  this.setState({ listCategory: "drink" })
                }>
                <Text>주종별</Text>
              </Button>

              {/* <Button last active={this.state.listCategory === "all"}
                onPress={() =>
                  this.setState({ listCategory: "all" })
                }
              > */}
                {/* <Text>전체</Text>
              </Button> */}
            </Segment>

            <View style={{ flex: 1 }}>

              <View style={{ marginTop: Platform.OS === 'ios' ? 20 : 10, }}>
                <Text style={{
                  marginTop: 5,
                  marginBottom: 10,
                  marginLeft: 20,
                  marginRight: 20,
                  fontSize: 20,
                }}>
                  기간선택
                </Text>

                <View style={{ flexDirection: "row", }}>

                  <View style={{ flex: 1, flexDirection: "row", marginLeft: 15, marginRight: 20, }}>
                    <Button style={styles.searchButton} onPress={() => this.dateChanger(1)}>
                      <Text style={{ color: '#777', }}>1개월</Text>
                    </Button>
                    <Button style={styles.searchButton} onPress={() => this.dateChanger(3)}>
                      <Text style={{ color: '#777', }}>3개월</Text>
                    </Button>
                    <Button style={styles.searchButton} onPress={() => this.dateChanger(6)}>
                      <Text style={{ color: '#777', }}>6개월</Text>
                    </Button>
                  </View>
                </View>

              </View>

              <View style={{ flex: 1, marginTop: 10, marginLeft: 20, marginRight: 20, }}>

                <View style={{ flexDirection: "row", }}>
                
                <DatePicker
                    style={styles.datePickerStyle}
                    date={this.state.researchData.sdate}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2014-05-01"
                    maxDate={this.state.researchData.edate}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconSource={require('../assets/img/calendar.png')}
                    customStyles={{
                      dateText: {
                        fontSize: 14,
                        color: '#777',
                        marginLeft: -25,
                      },
                      dateIcon: styles.dateIconStyle,
                    }}
                    onDateChange={(date) => { 
                      this.setState({
                        researchData : update(this.state.researchData, { 
                          sdate : {$set: date }
                        })
                      })

                    }}
                  />

                  <Text style={{ height: 30, marginTop: 10, color: '#aaa', }}>~</Text>

                  <DatePicker
                    style={styles.datePickerStyle}
                    date={this.state.researchData.edate}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate={this.state.researchData.sdate}
                    maxDate={moment().format("YYYY-MM-DD")}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconSource={require('../assets/img/calendar.png')}
                    customStyles={{
                      dateText: styles.dateStyle,
                      dateIcon: styles.dateIconStyle,
                    }}
                    onDateChange={(date) => { 
                      this.setState({
                        researchData : update(this.state.researchData, { 
                          edate : {$set: date }
                        })
                      })
                    }}

                  />

                </View>

                <Button 
                  style={{ 
                    width: '100%', 
                    height: 35, 
                    marginTop: 10, 
                    marginBottom: 10, 
                    borderRadius: 0, 
                    backgroundColor: '#0099ff', 
                    justifyContent: "center", 
                  }}
                  onPress={()=>this.updateToResearchData()}
                >
                  <Text>조회</Text>
                </Button>

              </View>
            </View>
          </View>

          <ScrollView style={{ flex: 7 }}>
            <Text 
              style={styles.totalInfoTxt}>
              {` 총 주문건수 : ${this.state.totalOrder} | 총 매입금액 : ${this.state.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}
            </Text>
            {this.state.listCategory === "drink" ? drinkResearchComponent: companyResearchComponent}
          </ScrollView>

          <View style={{ 
            height: 100, 
            width: "100%", 
            justifyContent: "center", 
            alignItems: 'center', 
            flexDirection: "row" }
          }>
            <Button block
              style={{
                width: "94%",
                height: 60,
                marginTop: 15,
                marginLeft: 20,
                marginRight: 20,
                backgroundColor: "#0099ff",
                borderRadius: 4,
              }}
              onPress={() => {
                this.setState({
                  researchData : update(this.state.researchData, { 
                    sdate : { $set: moment().subtract( subTractNum = subTractNum+1, 'months').format("YYYY-MM-DD") }
                  })
                })
                this.updateToResearchData("moreData",moment().subtract( subTractNum = subTractNum+1, 'months').format("YYYY-MM-DD"))
              }
              }>
              <Text style={{ fontSize: 20, }}>더보기</Text>
            </Button>
          </View>

        </View>
              
        
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
    justifyContent: "center",
  },
  searchButton: {
    flex: 1,
    height: 30,
    marginLeft: 5,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#aaa',
  },
  totalInfoTxt:{
    marginRight: '7%', 
    marginTop: 15, 
    marginBottom: 10, 
    fontSize: 14, 
    fontWeight: '100', 
    color: '#555', 
    alignSelf: 'flex-end', 
  },
  drinkResearchComTitle:{
    flex:3, 
    paddingBottom: 10, 
    paddingTop: 10,  
    alignItems: "center", 
  },
  datePickerStyle:{
    flex: 1,
    borderColor: '#aaa',
    marginLeft: 5,
  },
  dateIconStyle:{
    position: 'absolute',
    height: 21,
    width: 25,
    right: 5,
  },
  dateStyle:{
    fontSize: 14,
    color: '#777',
    marginLeft: -25,
  },
  researchComponentHeader:{
    flexDirection:"row",
    marginLeft:5,
    marginRight:5,
    backgroundColor:"#bbb",
  }
});

const mapStateToProps = (state) => {
  return {
    state: state,
    usridx: state.reducers.usridx,
  };
};

export default connect(mapStateToProps)(PaymentList);


