import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Header, Title, 
    Content, Footer, Button,Left,Icon,Body,Right,Item,Input,Text,Row,Col,Grid,CheckBox,CardItem,Badge } from 'native-base';
import {Actions} from 'react-native-router-flux';
import { numberWithCommas } from '../Functions'

export default class CompanyList_pay extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
          idSaveChecked: false , 
          companyPriceData : this.props.companyPriceData ,
          createFinalPriceData : {
            sales : numberWithCommas(parseInt( this.props.companyPriceData.price.sales )),
            vat : numberWithCommas(parseInt( this.props.companyPriceData.price.vat )),
            total: numberWithCommas(parseInt( this.props.companyPriceData.price.total )),
            bottle: numberWithCommas(parseInt( this.props.companyPriceData.deposit.bottle )),
            box: numberWithCommas(parseInt( this.props.companyPriceData.deposit.case )),
            finalTotalPrice : numberWithCommas(parseInt(this.props.companyPriceData.total_price))
          }

        };
        this.clickToCheckBox = this.clickToCheckBox.bind(this);
    }

    componentWillReceiveProps(){
        if(this.props.checkedIndex === this.props.index){
            this.setState({idSaveChecked : false})
        }
    }

    clickToCheckBox(){
        this.props.createFinalPriceData(this.state.createFinalPriceData, this.props.index, this.props.midx)
        
        this.setState({
            idSaveChecked: !this.state.idSaveChecked
        }) 

    }
    
    render() {
        return (
                <Grid>
                    <Row style={{ height:230, borderTopWidth:1, borderTopColor:"#bbb" }}>

                        <TouchableOpacity 
                            style={{width:40, height:40, marginTop:10, }}
                            onPress={ ()=> this.clickToCheckBox() } 
                        > 
                            <CheckBox 
                                checked={this.state.idSaveChecked} 
                                //체크박스 옵션
                                onPress={ ()=> this.clickToCheckBox() } 
                            />
                        </TouchableOpacity>

                        <Col style={{marginTop:10,}}> 
                            <Row style={{ alignItems:"center", flexDirection:"column", }}>
                                <View style={{width:"92%", marginBottom:10, flexDirection:"row",}}>
                                    <Text style={{fontSize:16, fontWeight:"bold",}}>{this.state.companyPriceData.coname}</Text>

                                    <CardItem footer style={{justifyContent:"space-between", marginTop:-10, 
                                    // backgroundColor:'none',
                                    }}>
                                        <Badge style={ this.state.companyPriceData.transable[6] === "1" ?  styles.dayBadgeOn : styles.dayBadgeOff }><Text>일</Text></Badge>
                                        <Badge style={ this.state.companyPriceData.transable[0] === "1" ?  styles.dayBadgeOn : styles.dayBadgeOff }><Text>월</Text></Badge>
                                        <Badge style={ this.state.companyPriceData.transable[1] === "1" ?  styles.dayBadgeOn : styles.dayBadgeOff }><Text>화</Text></Badge>
                                        <Badge style={ this.state.companyPriceData.transable[2] === "1" ?  styles.dayBadgeOn : styles.dayBadgeOff }><Text>수</Text></Badge>
                                        <Badge style={ this.state.companyPriceData.transable[3] === "1" ?  styles.dayBadgeOn : styles.dayBadgeOff }><Text>목</Text></Badge>
                                        <Badge style={ this.state.companyPriceData.transable[4] === "1" ?  styles.dayBadgeOn : styles.dayBadgeOff }><Text>금</Text></Badge>
                                        <Badge style={ this.state.companyPriceData.transable[5] === "1" ?  styles.dayBadgeOn : styles.dayBadgeOff }><Text>토</Text></Badge>
                                    </CardItem>

                                </View>
                                <View style={{width:"92%", flexDirection:"row", justifyContent:"space-between",}}>
                                    <Text>공급가액</Text>
                                    <Text>{ this.state.createFinalPriceData.sales }원</Text>
                                </View>
                                <View style={{width:"92%", flexDirection:"row", justifyContent:"space-between",}}>
                                    <Text>부가세액</Text>
                                    <Text>{ this.state.createFinalPriceData.vat }원</Text>
                                </View>
                                <View style={{width:"92%", flexDirection:"row", justifyContent:"space-between",}}>
                                    <Text>소계</Text>
                                    <Text>{ this.state.createFinalPriceData.total }원</Text>
                                </View>
                                <View
                                    style={{
                                        marginTop:5,
                                        marginBottom:5,
                                        width:"92%",
                                        borderWidth: 1,
                                        borderRadius: 8,
                                        borderStyle: 'dashed',
                                        borderColor: '#D1D2DE',
                                        backgroundColor: '#FFFFFF',
                                    }}
                                />
                                <View style={{width:"92%", flexDirection:"row", justifyContent:"space-between",}}>
                                    <Text>비주류금액(공병)</Text>
                                    <Text>{ this.state.createFinalPriceData.bottle }원</Text>
                                </View>
                                <View style={{width:"92%", flexDirection:"row", justifyContent:"space-between",}}>
                                    <Text>비주류금액(박스)</Text>
                                    <Text>{ this.state.createFinalPriceData.case }원</Text>
                                </View>
                                <View style={{
                                    width:"92%", 
                                    flexDirection:"row", 
                                    justifyContent:"space-between", 
                                    marginTop:10,
                                    height:30,
                                    borderTopWidth:1,
                                }}>
                                    <Text style={{marginTop:10, color:"#0099ff", fontWeight:"bold",}}>최종결제금액</Text>
                                    <Text style={{marginTop:10, color:"#0099ff", fontWeight:"bold"}}>{ this.state.createFinalPriceData.finalTotalPrice }원</Text>
                                </View>
                            </Row>
                        </Col>
                    </Row>
                </Grid> 
        );
    }
}

const styles = StyleSheet.create({
    cartModifyButton:{
        width:50, 
        height:20, 
        marginLeft:5, 
        backgroundColor:"skyblue", 
        justifyContent:"center", 
        alignItems:"center",
    },
    cartModifyButtonText:{
        fontSize:10,
    },dayBadgeOn:{
        backgroundColor:"#0099ff",
        height:25,
        width:25,
        paddingLeft:3,
        marginLeft:2,
    },dayBadgeOff:{
        backgroundColor:"#ddd",
        height:25,
        width:25,
        paddingLeft:3,
        marginLeft:2,
    }
})