import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Icon, Text, Row, Col } from 'native-base';
import { connect } from 'react-redux';

import update from 'immutability-helper'; // 2.6.5

class SearchList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: this.props.imgUrl,
            drinkData: {
                code: this.props.uniqId,
                title: this.props.title,
                qty: 0,
            },
            memoData : {
                usridx: this.props.usridx,
                title: "title",
                posit : "거래처" ,
                content: null,
            },
            stateRefresh: false,
            showToast: true
        };
        this.counter = this.counter.bind(this);
        this.clickCartButton = this.clickCartButton.bind(this);
        this.memoTextActivate = this.memoTextActivate.bind(this);
    }

    counter(action) {
        return () => {
            if (action === "plus") {
                this.state.drinkData.qty = this.state.drinkData.qty + 1
            } else {
                this.state.drinkData.qty = this.state.drinkData.qty < 1 ? 0 : this.state.drinkData.qty = this.state.drinkData.qty - 1
            }
            this.setState({
                stateRefresh: true
            })
        }
    }

    clickCartButton() {
        return () => {
            //갯수가 1개 이하일때 경고메시지 띄우기
            if (this.state.drinkData.qty < 1) {
                return alert("1개이상 담을 수 있습니다.")
            }
            if (this.props.increamentCartCount(this.state.drinkData)) {
                return this.props.toast.show('장바구니에 추가되었습니다.')
            }

        }
    }


    memoTextActivate(text){
        this.setState({
            memoData : update(this.state.memoData, { 
                content : {$set:text}
            }),
        }) 
    }


    submitMemoData(){
        if( this.state.memoData.content === null || this.state.memoData.content === ''  ){
           alert("내용을 입력해주세요")
        }else{
            fetch('https://api.joomok.net/boards/qna', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.memoData)
            })
            .then((response) => response.json())
            .then((responseData) => {
                alert("메시지를 보냈습니다.")

            })
            .catch((error) => {
                alert('problem while adding data');
            })
            .done();   
        }
    }

    _onError = () => { 
       this.setState({
         imgUrl : `http://joomok.net/default/M0x00x${this.props.drinkType}00000000x.jpg`
       })
    }

    render() {
        return (
            this.props.title === "제품이 없습니다." ?
                <View style={{flex:1, marginLeft:20, marginRight:20}}>
                
                    <View style={{flex:2, }}>
                        <Text style={{color:'#fff',}}>
                           { `해당제품이 없습니다. 
필요하신 제품이 있으시면
메모를 남겨주세요 신속히 답변드리겠습니다.`}
                        </Text>
                        
                    </View>
                    
                    <View style={{flex:2}}>
                        <TextInput 
                            placeholder={`필요한 제품을 남겨주세요
예) 제품명 : 참이슬 용량 :350ml`}fil
                            multiline={true} 
                            onChangeText={ this.memoTextActivate } 
                            underlineColorAndroid={"#fff"}
                            style={{ 
                                height:200, 
                                backgroundColor:"#fff", 
                                marginTop:10, 
                                marginBottom:20,
                                paddingLeft:10,
                                borderWidth:1,
                                borderColor:'#777',
                                }} 
                        />
                    </View>

                    <View style={{flex:1}}>
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'flex-start', marginBottom: 15, }}
                            onPress={
                                ()=> this.submitMemoData()
                            }
                        >
                            <View style={styles.submitButton}
                            >
                                <Text style={{ fontSize: 24, color: "#fff", fontWeight: "800", }}>
                                    전송
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                :

                <View style={styles.wrapTosearchList}>

                    <Row style={{ marginTop: 10, height: 80, }}>
                        <Col style={{ flex: 3 }}>
                            <Image
                                source={{uri: this.state.imgUrl }}
                                onError={this._onError}
                                style={{ 
                                    height: 80, marginLeft: 20, resizeMode: "contain",
                                }}
                            />
                        </Col>

                        <Col style={{ flex: 4.5 }}>

                            <Row><Text style={{fontSize:14,}}>{this.props.title}</Text></Row>
                            <Row><Text style={{fontSize:14,}}>{"1박스(짝) "+this.props.unit + "개"}</Text></Row>
                            <Row>
                                <Text style={{fontSize:14,}}>수량</Text>
                                <View style={{ flexDirection: "row", marginLeft: 10, }}>

                                    <TouchableOpacity onPress={this.counter("minus")}>
                                        <Icon type="Entypo" name='minus' style={styles.iconStyle} />
                                    </TouchableOpacity>

                                    <View style={{ width: 40, height: 20, marginLeft: 5, marginRight: 5, alignItems: 'center', borderColor: '#999', }}>
                                        <Text style={{ marginLeft: 3, marginRight: 3, color: '#777', fontSize: 14, marginTop: 1, }}>{this.state.drinkData.qty}</Text>
                                    </View>

                                    <TouchableOpacity onPress={this.counter("plus")}>
                                        <Icon type="Entypo" name='plus' style={styles.iconStyle} />
                                    </TouchableOpacity>
                                </View>
                            </Row>
                        </Col>

                        <Col style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={this.clickCartButton()}
                                id={this.props.uniqId}
                            >
                                <Image
                                    source={require('../../assets/img/cart.jpg')}
                                    style={{ width: 60, resizeMode: "contain", marginRight: 20, }}
                                />
                                {/* <Icon type="MaterialCommunityIcons" name='cart' style={{fontSize:60, color:'#000',}} /> */}
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <View style={{
                        width: 25,
                        height: 25,
                        borderRadius: 13,
                        backgroundColor: '#0099ff',
                        position: 'absolute',
                        top: '50%',
                        marginTop: -6.5,
                        marginLeft: -18,
                    }}></View>
                    <View style={{
                        width: 25,
                        height: 25,
                        borderRadius: 13,
                        backgroundColor: '#0099ff',
                        position: 'absolute',
                        top: '50%',
                        right: 0,
                        marginTop: -6.5,
                        marginRight: -18,
                    }}></View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapTosearchList: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        paddingBottom: 10,
        backgroundColor: 'rgba(255,255,255,1)'
    },
    iconStyle: {
        width: 26,
        height: 26,
        fontSize: 24,
        borderWidth: 0.5,
        color: '#999',
    },
    submitButton: {
        width: "96%",
        height: 80,
        marginTop: 10,
        marginLeft: "2%",
        //backgroundColor: "none",
        borderRadius: 4,
        borderWidth: 3,
        borderColor: "#fff",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 1,
        shadowOpacity: 0.2,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default connect(null)(SearchList);

