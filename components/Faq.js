import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity,Image } from 'react-native';
import { Container,Button,Icon,Text} from 'native-base';
import {Actions} from 'react-native-router-flux';

import Faq_list from './listComponent/Faq_list';
import BackGroundImage from './util/backGroundImage';
import Head from './Head';

const Headers = ({ isOpen }) =>
    <View style={{
        flexDirection:"row",
        paddingTop:10,
    }}>
        <View style={[{flex:5 , flexDirection:"row",},styles.noticeFormShare]}>
            <Icon type="FontAwesome" name="quora" style={{marginLeft:10, marginRight:10, fontSize:16, color:"orange",}}/>
            <Text>구입은 어떻게 하나요?</Text>
        </View>
        <View style={[{flex:1, marginRight:5,},styles.noticeFormShare]}>
            <Icon type="FontAwesome" name="chevron-down" style={{marginLeft:10, marginRight:10, fontSize:16, color:"orange",}}/>
        </View>
    </View>;
 
const Contents = (
  <View style={{
      display: 'flex',
    }}>
      <Text style={{
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 15,
        paddingLeft: 15,
      }}>
        전화주세요 잘 알려드릴게요
      </Text>
    </View>);

export default class Faw extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        isNoticeRead: "bold",
        faqBoardData : null ,
    };
  }

  componentWillMount(){
    // 제이슨으로 상품 목록 데이터 받아오기
    return fetch('https://api.joomok.net/boards/faq?usridx='+this.props.usridx+'&key=title&word=두몫&istart=0&ilimit=10')
      .then((response) => response.json())
      .then((faqBoardData) => {
        console.log('faqBoardData',faqBoardData)
        this.setState({
            faqBoardData: 
            faqBoardData.data.map((faqData, i) => {
                return (
                    <Faq_list
                        faqData={faqData}
                        index={i}
                        key={i}
                    />);
            }),
        })
      })
      .catch((error) =>{
        console.error(error);
      });

  };

  render() {
    return (
      <Container style={{backgroundColor:'#0099ff',}}>

        <Head 
            title={"FAQ"}
            openDrawer={this.props.openDrawer} 
            closeDrawerHome={this.props.closeDrawer} 
            beforePage = { ()=> Actions.Main() }
        />

        <View style={{flex:1, backgroundColor:'#eee',}}>
            <View style={{
                flex:1,
                width:'90%',
                marginTop:20,
                marginBottom:20,
                marginLeft:'5%',
            }}>
                {this.state.faqBoardData}
            </View>
        </View>

      </Container>
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
        backgroundColor: "#ddd",
        paddingBottom: 10, 
        paddingTop: 10,  
        alignItems: "center",
    }
});

