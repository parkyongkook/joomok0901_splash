 
 import React, { Component } from 'react';
 import { StyleSheet, TouchableOpacity,Modal,View,TouchableHighlight , ScrollView} from 'react-native';
 import { Container, Content, Body, Title , Text, Button, Drawer, Switch,
        Header, Grid, Col, Row, List, ListItem,Icon } from 'native-base';

 import AdressModalList from './listComponent/AdressModalList'; 

 import {Actions} from 'react-native-router-flux';
 import {connect} from 'react-redux';

 
 class AddressModal extends Component {
    constructor(props) {
      super(props);

    }

    render() {
        const mapToAddressList = (data) => {
            return data.map((addressListData, i) => {
                return (
                    <AdressModalList 
                        jibun={addressListData.jibun}
                        roadbun={addressListData.roadbun}
                        zip={addressListData.zip}
                        selectAdress={this.props.selectAdress}
                        index = {i} 
                    />);
            })
        }

      return (
        <View>  
            <Modal
                presentationStyle="pageSheet"
                animationType="fade"
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    alert('Modal has been closed.');
                }}
               
            >
                <View  style={{marginTop:120,alignItems:"center", alignContent:"center",}}>
                    <ScrollView>
                        {   
                            this.props.addressListData? mapToAddressList(this.props.addressListData) : null
                        }
                    </ScrollView>
                </View>
             <View style={{flex:1, flexDirection:"row", justifyContent:"center",}}>
                <Button 
                    style={{width:100, justifyContent:"center", marginLeft:20, 
                            marginRight:20, position:"absolute", bottom:50, 
                          }}
                    onPress={
                        ()=> this.props.closeModal()
                    }      
                >
                    <Text>닫기</Text>
                </Button>
             </View>   

        </Modal>
       </View>
      )
    }
 }
 
 const action = (data) => {
  return {
      type: 'data',
      payload: data
  };
};

export default connect(null, {action})(AddressModal);
 
