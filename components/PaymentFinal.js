import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView, TextInput } from 'react-native';
import { Container,Header, CheckBox, Input ,Card, CardItem, Body, Button, Item, } from 'native-base';
import {Actions} from 'react-native-router-flux';

import BackGroundImage from './util/backGroundImage';
import Head from './Head';

export default class PaymentFinal extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={{flex:1, backgroundColor:"#0099ff",}}>

            <BackGroundImage/>

            <Head 
                openDrawer={this.props.openDrawer} 
                closeDrawerHome={this.props.closeDrawer} 
                beforePage={Actions.Login}
                title={"결제"}
                hideMenu = {true}
            />    

            <View style={{flex:10, backgroundColor:"#fff",}}>

                <View >
                    <Item Regular >
                        <TextInput
                            selectionColor={"#555"}
                            placeholder={"카드번호"}
                            secureTextEntry={true}
                            style={{ height:40, }}
                        />
                    </Item>
                </View>   

                <View >
                    <Item Regular >
                        <TextInput
                            selectionColor={"#555"}
                            placeholder={"카드번호"}
                            secureTextEntry={true}
                            style={{ height:40, }}
                        />
                    </Item>
                </View>   

                <View >
                    <Item Regular >
                        <TextInput
                            selectionColor={"#555"}
                            placeholder={"카드번호"}
                            secureTextEntry={true}
                            style={{ height:40, }}
                        />
                    </Item>
                </View>   

            </View>

      </Container>
    );
  }
}

