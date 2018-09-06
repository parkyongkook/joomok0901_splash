import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity,Image,Platform } from 'react-native';
import { Container, CheckBox, Header, Content, Form, Card, CardItem,
  Item, Input, Label,Left,Button,Icon,Text,Body,Title,Right,Row,Col } from 'native-base';


export default class BarChart extends Component {
    
    render() {
        const maxPriceValue = 200 / Math.max.apply(null, this.props.chartData.Price); 
        return (

            <View style={{flex:1, justifyContent:"flex-end", alignItems:"center", }}>
                <View style={{ flexDirection:"row", justifyContent:"center", alignItems:"flex-end", marginBottom:10, }}>

                    <View>
                        <View>
                            <View>
                                {              
                                    Platform.OS === 'ios' ? 
                                    <Image
                                        style={{
                                            resizeMode : "cover",
                                            width:24,
                                            height:15,
                                        }}
                                        source={require('../assets/img/graph_y.png')}
                                    />  
                                    :   null
                                }
                            </View>
                            <View style={{flexDirection:"row",}}>
                                <View style={{ width :12 , height: this.props.chartData.Price[0] * maxPriceValue , backgroundColor:"#ffcb15", }}/>  
                                <View style={{ width :12 , height: this.props.chartData.Price[0] * maxPriceValue , backgroundColor:"#ffb217", }}/>    
                            </View>

                        </View>

                        <View>
                            <Text style={{fontSize:14, fontWeight:"100", color:"#555", marginTop:5,}}>{this.props.chartData.term[0]}월</Text>
                        </View>
                    </View>
                    
                    <View style={{ marginLeft:20, }}>
                        <View>
                            <View>
                                {              
                                    Platform.OS === 'ios' ? 
                                    <Image
                                        style={{
                                            resizeMode : "cover",
                                            width:24,
                                            height:15,
                                        }}
                                        source={require('../assets/img/graph_sb.png')}
                                    />  
                                    :   null
                                }
                            </View>
                            <View style={{flexDirection:"row",}}>
                                <View style={{ width :12 , height: this.props.chartData.Price[1] * maxPriceValue , backgroundColor:"#33cccc", }}/>  
                                <View style={{ width :12 , height: this.props.chartData.Price[1] * maxPriceValue , backgroundColor:"#16a5a1", }}/>    
                            </View>
                        </View>
                        <View><Text style={{fontSize:14, fontWeight:"100", color:"#555", marginTop:5,}}>{this.props.chartData.term[1]}월</Text></View>
                    </View>

                    <View style={{ marginLeft:20,}}>
                        <View>
                            <View>
                                {              
                                    Platform.OS === 'ios' ? 
                                    <Image
                                        style={{
                                            resizeMode : "cover",
                                            width:24,
                                            height:15,
                                        }}
                                        source={require('../assets/img/graph_b.png')}
                                    />  
                                    :   null
                                }
                            </View>
                            <View style={{flexDirection:"row",}}>
                                <View style={{ width :12 , height: this.props.chartData.Price[2] * maxPriceValue , backgroundColor:"#006699", }}/>  
                                <View style={{ width :12 , height: this.props.chartData.Price[2] * maxPriceValue , backgroundColor:"#003366", }}/>    
                            </View>
                        </View>

                        <View><Text style={{fontSize:14, fontWeight:"100", color:"#555", marginTop:5,}}>{this.props.chartData.term[2]}월</Text></View>
                    </View>

                </View>
            </View>
            
        );
    }
}

  