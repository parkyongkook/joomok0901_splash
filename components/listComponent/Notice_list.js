import React, { Component } from 'react';
import { StyleSheet, View, } from 'react-native';
import { Header, Content ,Icon, Text, } from 'native-base';
import Accordion from '@ercpereda/react-native-accordion';

export default class Notice_list extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const Headers = ({ isOpen }) =>
        <View style={{
            flexDirection:"row",
        }}>
            <View style={[{flex:5, flexDirection:"row",},styles.noticeFormShare]}>
                <Text style={{marginLeft:10,}}>{this.props.noticeData.title}</Text>
            </View>

            <View style={[{flex:1},styles.noticeFormShare]}>
                <Icon type="FontAwesome" name="chevron-down" style={{marginLeft:10, marginRight:10, fontSize:16, color:"#999",}}/>
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
                {this.props.noticeData.content}
            </Text>
        </View>);
    return (
        <Content>
            <View style={{
                flexDirection:"row",
                paddingTop:10,
                }}>
                <View style={[{flex:3 },styles.noticeFormTitle]}><Text style={{color:"#fff", fontSize:16 }}>날짜</Text></View>
                <View style={[{flex:2 },styles.noticeFormTitle]}><Text style={{color:"#fff", fontSize:16 }}>종류</Text></View>
                <View style={[{flex:6 },styles.noticeFormTitle]}><Text style={{color:"#fff", fontSize:16 }}>제목</Text></View>
            </View>
            <View>
                <Accordion
                    header={Headers}
                    content={Contents}
                    duration={300}
                />
            </View>
        </Content>
    );
  }
}

const styles = StyleSheet.create({
    noticeFormTitle:{
        backgroundColor: "#999",
        paddingBottom: 10, 
        paddingTop: 10,  
        alignItems: "center",
    },
    noticeFormShare:{
        backgroundColor: "#ddd",
        paddingBottom: 10, 
        paddingTop: 10,  
        alignItems: "center",
    },
    noticeFormSubtitle:{
        borderLeftWidth: 1, 
        borderLeftColor: "#fff", 
    }

});

