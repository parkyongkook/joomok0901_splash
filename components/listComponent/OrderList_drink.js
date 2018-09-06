import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Title, 
    Content, Footer, Button,Left,Icon,Body,Right,Item,Input,Text,Row,Col,Grid,CheckBox } from 'native-base';
import {Actions} from 'react-native-router-flux';

let bgcBool = true;

export default class OrderList_drink extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
        bgcBool ? bgcBool = false : bgcBool = true
        return (
            <View style={{
                flexDirection:"row",
                backgroundColor:"#fff",
                marginLeft:5,
                marginRight:5,
                backgroundColor : bgcBool === false ? '#fff' : "#eee" ,
            }}>
                <View style={[{flex:5, },styles.noticeFormShare]}><Text style={styles.detailText}>{this.props.date}</Text></View>
                <View style={[{flex:3, },styles.noticeFormShare]}><Text style={styles.detailText}>{this.props.category}</Text></View>
                <View style={[{flex:4, },styles.noticeFormShare]}><Text style={styles.detailText}>{this.props.title}</Text></View>
                <View style={[{flex:4, },styles.noticeFormShare]}><Text style={styles.detailText}>{this.props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").split(".")[0]}</Text></View>
            </View>
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
        paddingBottom: 10, 
        paddingTop: 10,  
        alignItems: "center",
    },
    noticeFormSubtitle:{
        borderLeftWidth: 1, 
        borderLeftColor: "#fff", 
    },
    detailText:{
        fontSize:14,
        fontWeight:'100', 
        color:'#555',
    },
});
