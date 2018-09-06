import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text , CheckBox } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class OrderList extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
        return (
          <View>  
            <View style={{ marginTop:20, marginLeft:20, marginRight:20, padding:5, paddingTop:15, backgroundColor:'#fff',}}>
                <View style={{flexDirection:"row",}}>
                    <View style={{flex:1}}>
                        <CheckBox 
                            checked={true} 
                        />
                    </View>
                    <View style={{flex:9, marginLeft:10,}}>
                        <View>
                            <Text style={{fontSize:18, fontWeight:"bold",}}>2018.03.02</Text>
                            <Text style={{fontSize:14, marginTop:10,}}>[하이트진로]참이슬 330ml박스(30본)</Text>
                            <Text style={{marginTop:10,}}>2박스 외 3건</Text>
                        </View>
                    </View>     
                </View>
                <View style={{marginTop:10, backgroundColor:'#e1f2fd', alignItems:'center', justifyContent:"center", }}>
                    <View style={{width:"100%", height:40, flexDirection:"row", alignItems:'center', justifyContent:"space-between",}} >
                        <Text style={{fontSize:16, color:"#0099ff", marginLeft:10, }}>17,000원</Text>
                        <Text style={{fontSize:16, fontWeight:'bold', color:"#0099ff", marginRight:10, }}>결제대기</Text>    
                    </View>
                </View>
            </View>

            <View style={{ marginTop:20, marginLeft:20, marginRight:20, padding:5, paddingTop:15, backgroundColor:'#fff',}}>
                <View style={{flexDirection:"row",}}>
                    <View style={{flex:1}}>
                        <CheckBox 
                            checked={true} 
                        />
                    </View>
                    <View style={{flex:9, marginLeft:10,}}>
                        <View>
                            <Text style={{fontSize:18, fontWeight:"bold",}}>2018.03.02</Text>
                            <Text style={{fontSize:14, marginTop:10,}}>[하이트진로]참이슬 330ml박스(30본)</Text>
                            <Text style={{marginTop:10,}}>2박스 외 3건</Text>
                        </View>
                    </View>     
                </View>
                <View style={{marginTop:10, backgroundColor:'#e1f2fd', alignItems:'center', justifyContent:"center", }}>
                    <View style={{width:"100%", height:40, flexDirection:"row", alignItems:'center', justifyContent:"space-between",}} >
                        <Text style={{fontSize:16, color:"#0099ff", marginLeft:10, }}>17,000원</Text>
                        <Text style={{fontSize:16, fontWeight:'bold', color:"#0099ff", marginRight:10, }}>결제대기</Text>    
                    </View>
                </View>
            </View>
          </View>
        );
    }
}
 