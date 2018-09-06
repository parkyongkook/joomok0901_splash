import React, { Component } from 'react';
import { StyleSheet, View, } from 'react-native';
import { Header, Content ,Icon, Text, } from 'native-base';
import Accordion from '@ercpereda/react-native-accordion';

export default class Faq_list extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const Headers = ({ isOpen }) =>
        <View style={{
            flexDirection:"row",
        }}>
            <View style={[{flex:5 ,flexDirection:"row",},styles.noticeFormShare]}>
                <Icon type="FontAwesome" name="quora" style={{marginLeft:10, marginRight:10, fontSize:16, color:"orange",}}/>
                <Text>
                {this.props.faqData.title}
                </Text>
            </View>
            <View style={[{flex:1, },styles.noticeFormShare]}>
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
                {this.props.faqData.content}
            </Text>
        </View>);

    return (
        <Content>
            <View style={styles.container}>
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
    },noticeFormSubtitle:{
        borderLeftWidth: 1, 
        borderLeftColor: "#fff", 
    }

});

