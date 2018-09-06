import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {
    Container, CheckBox, Header, Content, Form, Card, CardItem,
    Item, Input, Label, Left, Button, Icon, Text, Body, Title, Right, Row, Col
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import CompanyList_pay from './listComponent/CompanyList_pay';
import BackGroundImage from './util/backGroundImage';
import Head from './Head';

var postRequestSucssesData;

class BuyProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idSaveChecked: false,
            mergeCartData: null,
            cartData: this.props.cartListData,
            mapToCompanyPrice: null,
            FinalPriceData: null,
            checkedIndex: null,
        };
        this.mapToBuyproduct = this.mapToBuyproduct.bind(this);
        this.createFinalPriceData = this.createFinalPriceData.bind(this);
        this.clickToConfirm = this.clickToConfirm.bind(this);
    }

    mapToBuyproduct(data) {
        return data.map((cartListData, i) => {
            return (
                <CompanyList_pay
                    checkedIndex={this.state.checkedIndex}
                    companyName={cartListData.coname}
                    companyPriceData={cartListData}
                    createFinalPriceData={this.createFinalPriceData}
                    midx={cartListData.idx}
                    index={i}
                    key={i}
                />);
        })
    }

    createFinalPriceData(FinalPriceData, idx, midx) {
        this.setState({
            FinalPriceData: FinalPriceData,
            checkedIndex: idx,
            midx: midx
        })
    }

    clickToConfirm() {
        if (this.state.FinalPriceData !== null) {
            Actions.Payment({
                FinalPriceData: this.state.FinalPriceData,
                cartProductData: this.props.cartProductData,
                midx: this.state.midx
            });
        } else {
            alert("구매업체 선택은 필수 항목입니다.")
        }
    }

    render() {
        return (
            <Container style={{ backgroundColor: "#0099ff", }}>
                <BackGroundImage />
                <Head
                    openDrawer={this.props.openDrawer}
                    closeDrawerHome={this.props.closeDrawer}
                    title={
                        this.props.reOrderTitle ? this.props.reOrderTitle :
                            '구매하기'
                    }
                    beforePage={
                        this.props.reOrderTitle ? () => Actions.Main() :
                            () => Actions.Cart()
                    }
                />
                <Content style={{ flex: 1, backgroundColor: "#eee", }}>
                    <View style={{ flex: 6, width: "94%", marginTop: 20, marginLeft: "3%", backgroundColor: "#fff", borderRadius: 10 }}>
                        <View>
                            <Text style={{ fontSize: 18, marginLeft: 20, marginTop: 15, marginBottom: 8, color: "#0099ff", }}>
                                상품목록
                        </Text>
                            {
                                this.props.mapToCartList(
                                    this.props.cartProductData,
                                    true
                                )
                            }
                        </View>
                        {this.mapToBuyproduct(this.props.cartListData)}
                    </View>
                </Content>
                <View style={{ height: 120, backgroundColor: "#eee", justifyContent: 'center', }}>
                    <Button style={{ height: 50, width: "94%", marginLeft: "3%", justifyContent: "center", backgroundColor: '#0099ff', }}
                        onPress={() => { this.clickToConfirm() }}>
                        <Text>구매하기</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    Chart: {
        width: "100%",
        height: 15,
        marginTop: 10,
        backgroundColor: "#ddd",
    }, chartInnerPay: {
        width: "80%",
        height: 15,
        backgroundColor: "yellow",
    }, chartInnerDay: {
        width: "50%",
        height: 15,
        backgroundColor: "skyblue",
    }, BuyButton: {
        width: "48%",
        justifyContent: "center",
    }

});

export default connect((state) => ({
    companyList: state.reducers.companyList
}))(BuyProduct);
