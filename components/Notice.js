import React, { Component } from 'react';
import { Container} from 'native-base';
import {Actions} from 'react-native-router-flux';

import { View } from 'react-native';

import Notice_list from './listComponent/Notice_list';
import BackGroundImage from './util/backGroundImage';
import Head from './Head';

export default class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        noticeBoardData : null 
    };
  }
  
componentWillMount(){
    // 제이슨으로 상품 목록 데이터 받아오기
    return fetch('https://api.joomok.net/boards/notice?usridx='+this.props.usridx+'&key=title&word=두몫&istart=0&ilimit=10')
    .then((response) => response.json())
    .then((noticeBoardData) => {
        console.log("noticeBoardDatanoticeBoardData",noticeBoardData)
        this.setState({
            noticeBoardData: 
            noticeBoardData.data.map((noticeData, i) => {
                return (
                <Notice_list
                    noticeData={noticeData}
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

        <BackGroundImage/>

        <Head 
            title={"공지사항"}
            openDrawer={this.props.openDrawer} 
            closeDrawerHome={this.props.closeDrawer} 
            beforePage = { ()=> Actions.Main() }
        />

        <View style={{flex:1, backgroundColor:'#eee',}}>
            <View style={{
                flex:1,
                width:'90%',
                marginTop:40,
                marginBottom:20,
                marginLeft:'5%',
            }}>
                { this.state.noticeBoardData }
            </View>
        </View>

      </Container>
    );
  }
}



