import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity,TextInput,Image } from 'react-native';
import { Button, Icon, Text , Card, CardItem, Badge } from 'native-base';

export default  class OrderCompany_list extends Component {

    constructor(props) {
        super(props);
        this.possibleDrink = this.possibleDrink.bind(this)
    }

    possibleDrink(index,title){
        return this.props.posDrink[index] ? 
        <Button warning style={styles.drinkButton} > 
            <Text style={styles.drinkButtonText}>{title}</Text>
        </Button>
        :
        <Button light style={styles.drinkButton} > 
            <Text style={styles.drinkButtonText}>{title}</Text>
        </Button>
    }    
    
    render() {
        return (
        <Card style={{width:"95%", height:200,}}>
            <CardItem header style={{justifyContent:"space-between"}}>
                <TouchableOpacity onPress={()=>{
                    this.props.CompanyData.account ? Actions.OrderMain({
                        cartListUpdate : this.props.cartListUpdate
                    }) : alert("주 거래처가 아닙니다.")
                    }}>
                    <Text>{this.props.companyTitle}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.props.CompanyData.account ? this.props.companyContact(this.props.index) : alert("주 거래처가 아닙니다.")
                }}>
                    <Icon type="FontAwesome" name='phone' />
                </TouchableOpacity> 
            </CardItem>
            <CardItem>
                <Body>
                    <View style={styles.drinkButtonParent}>
                        { this.possibleDrink(0,"소주") }
                        { this.possibleDrink(1,"맥주") }
                        { this.possibleDrink(2,"수입맥주") }
                        { this.possibleDrink(3,"양주") }
                    </View>
                    <View style={styles.drinkButtonParent}>
                        { this.possibleDrink(4,"전통주") }
                        { this.possibleDrink(5,"와인") }
                        { this.possibleDrink(6,"사케") }
                        { this.possibleDrink(7,"기타") }
                    </View>
                </Body>
            </CardItem>
            <CardItem footer style={{justifyContent:"space-between"}}>
                <Badge style={ this.props.posDay[0] ?  styles.dayBadgeOn : styles.dayBadgeOff }><Text>월</Text></Badge>
                <Badge style={ this.props.posDay[1] ?  styles.dayBadgeOn : styles.dayBadgeOff }><Text>화</Text></Badge>
                <Badge style={ this.props.posDay[2] ?  styles.dayBadgeOn : styles.dayBadgeOff }><Text>수</Text></Badge>
                <Badge style={ this.props.posDay[3] ?  styles.dayBadgeOn : styles.dayBadgeOff }><Text>목</Text></Badge>
                <Badge style={ this.props.posDay[4] ?  styles.dayBadgeOn : styles.dayBadgeOff }><Text>금</Text></Badge>
                <Badge style={ this.props.posDay[5] ?  styles.dayBadgeOn : styles.dayBadgeOff }><Text>토</Text></Badge>
                <Badge style={ this.props.posDay[6] ?  styles.dayBadgeOn : styles.dayBadgeOff }><Text>일</Text></Badge>
            </CardItem>
        </Card>
        )
    }
}

const styles = StyleSheet.create({
    drinkButtonParent:{
        flexDirection:"row",
        justifyContent:"space-around"
    },drinkButton:{
        flex:1,
        height:30,
        justifyContent:"center",
        marginTop:5,
        marginLeft:5,
        paddingLeft:0,
        paddingRigth:0,
    },drinkButtonText:{
        fontSize:14,
    },dayBadgeOn:{
        backgroundColor:"green",
        width:30,
    },dayBadgeOff:{
        backgroundColor:"#ddd",
        width:30,
    }
});
