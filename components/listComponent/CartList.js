import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Header, Title, 
    Content, Footer, Button,Left,Icon,Body,Right,Item,Input,Text,Row,Col,Grid,CheckBox } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import * as actions from '../../actions';

const isModify = false;

class CartList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          cartData : {
              title: this.props.title,
              code: this.props.code,
              qty: this.props.qty
          } , 
          cartCount: this.props.qty,  
          stateRefresh: false,
          idSaveChecked: this.props.allChecked,
          unitData : [],
          postJson : {
            usridx:1,
            carts:[
                {code:61,qty:10},
                {code:100,qty:5}
              ]
            },
        };
        this.counter = this.counter.bind(this);
        this.clickToDeleteButton = this.clickToDeleteButton.bind(this);
        this.clickToCheckBox =  this.clickToCheckBox.bind(this);
      }

    componentDidUpdate(){
        //삭제 후 스테이트에 리듀어의 프롭값이 제대로 전달 되기 위해 컴포넌트가 업데이트 되면 한번씩 재할당 후 스테이트를 다시 셋 시킴
        if( this.state.cartData.title !== this.props.title || this.state.cartData.qty !== this.props.qty ){

            this.state.cartData.title = this.props.title;
            this.state.cartData.code = this.props.code;
            this.state.cartData.qty = this.props.qty;
            this.state.cartCount = this.props.qty;
            this.state.idSaveChecked = false;
            this.setState({

            })   
        }
       isModify = false;

    }  
    
    componentWillReceiveProps(nextProps){
        // 리스트 컴포넌트 맵핑시 true false값을 판단하여 수량과, 다음 구매로 넘길 id로 구성된 array를 만듦 

        //현재의 프롭값과 수정된 프랍값이 다른경우 실행
        if( this.props.deleteProduct !== nextProps.deleteProduct ){
            if( nextProps.deleteProduct === true ){
                this.props.disableChecked('reCorver')
                return 
            }
            return
        }


        if( this.props.allChecked ){
            this.setState({ idSaveChecked : false });
            if(this.state.idSaveChecked){
                this.props.cartCounter(-1);
            }
            this.props.cartListIdsave(this.state.cartData , "remove");
        }else{
            if( !this.state.idSaveChecked && isModify === false ){
                this.setState({ idSaveChecked : true });
                this.props.cartCounter(+1);
                this.props.cartListIdsave(this.state.cartData, "push") 
            } 
        }


    }

    counter(action){
        if( this.state.cartCount >= 2 ){
            action === "plus" ? this.state.cartCount += 1 : this.state.cartCount -= 1
        }else if( this.state.cartCount < 2 ){
            action === "plus" ? this.state.cartCount += 1 : null
        }
        this.setState({})
    }

    clickToDeleteButton( id ){
        this.props.disableChecked('onClickDeleteButton')
        this.props.allCheckedHandler('disable') 
        this.props.deleteCartData(id)
        this.props.cartListDelete(id)
    }

    clickToCheckBox(){
        if(this.state.idSaveChecked){
            this.setState({idSaveChecked: false })
            this.props.cartCounter(-1) 
            this.props.allCheckedHandler("false") 
            this.props.cartListIdsave(this.state.cartData, "remove")
        }else{
            this.setState({idSaveChecked: true})
            this.props.cartCounter(+1) 
            this.props.cartListIdsave( this.state.cartData, "push")
        }
    }
    
    render() {
        return (
            <Row style={{ 
                    width: this.props.isVisibleItem ? null : '90%',
                    marginLeft: this.props.isVisibleItem ? null : '5%',
                    marginTop:0, 
                    paddingBottom: this.props.isVisibleItem ? null : 10, 
                    borderBottomWidth: this.props.isVisibleItem ? null : 1  , 
                    borderBottomColor:"#ddd", 
                    alignItems:"center",
                    flexDirection:'row', 
                }}>
                {
                    this.props.isVisibleItem ? null :  
                    <TouchableOpacity 
                        style={{flex:1.3, backgroundColor:'#fff', height:35, marginLeft:5, marginRight:10,}}
                        onPress={()=>this.clickToCheckBox()} 
                    > 
                        <CheckBox 
                            checked={
                                this.state.idSaveChecked
                            } 
                            //체크박스 옵션
                            onPress={()=>this.clickToCheckBox()} 
                            style={{marginTop:10,}}
                        />
                    </TouchableOpacity>

                }
                <View style={{flex:5,  backgroundColor:'#fff',}}> 
                    <Row style={[
                            { alignItems:"center"},
                            this.props.isVisibleItem ? { marginLeft : 20, justifyContent:"space-between" } : {marginTop:5,}
                        ]}>
                        
                        <Text>{this.state.cartData.title}</Text>
                        {
                        this.props.isVisibleItem ? 
                        <Text style={{marginRight:20,}}>
                            {`수량 : ${this.state.cartCount}ea`}
                        </Text>
                        : null
                        }
                    </Row>
                    {/* 가격관련 <Row style={{ alignItems:"center"}}><Text>{this.state.cartData.price}원</Text></Row> */}
                    <Row style={[
                        
                        { alignItems:"center"},
                        this.props.isVisibleItem ? { marginLeft : 20, marginTop : 5 } : {marginTop:5,}
                    ]}>
                        {
                            this.props.isVisibleItem ? null :
                            <Row style={{marginBottom:5,}}>

                                <Text style={{marginRight:10,}}>수량</Text>

                                <TouchableOpacity onPress={
                                    ()=> this.counter("minus")
                                }>
                                    <Icon type="Entypo" name='minus' style={styles.iconStyle} />
                                </TouchableOpacity>

                                <View style={{width:20, height:20, marginLeft:5, marginRight:5, alignItems:'center', borderColor:'#999',}}>
                                    <Text style={{ marginLeft:3, marginRight:3, color:'#777', fontSize:18, marginTop:1, }}>{this.state.cartCount}</Text>
                                </View>
                                    
                                <TouchableOpacity onPress={
                                    ()=>  this.counter("plus")
                                }>
                                    <Icon type="Entypo" name='plus' style={styles.iconStyle} />
                                </TouchableOpacity>

                            </Row>
                        }
                    </Row>
                </View>
                {
                    this.props.isVisibleItem ? null :  

                    <View style={{flex:4, flexDirection:'row', marginTop:8,}}>
                        <TouchableOpacity style={[
                            styles.cartModifyButton, { 
                            //넘겨받은 수량과 현재의 카운트 수량이 달라야만 수정 버튼을 활성화
                            backgroundColor: this.state.cartCount === this.state.cartData.qty ? '#ddd' : '#0099ff'  
                        }]} onPress={
                            ()=>{   
                                if( this.state.cartCount !== this.state.cartData.qty ){
                                    this.setState({
                                        cartData : {
                                            ...this.state.cartData,
                                            qty : this.state.cartCount
                                        }
                                    });

                                    isModify = true

                                    this.props.updateTocartListData( this.props.index, this.state.cartCount )

                                    this.props.allCheckedHandler('disable')
                                    this.props.disableChecked()
                                    alert("수정되었습니다")
                                    }
                                }
                        }>

                            <Text style={{fontSize:14, color:'#fff'}}>수정</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={{
                            width:50, 
                            height:50, 
                            justifyContent:"center", 
                            alignItems:"center",
                            borderWidth:1, 
                            borderColor:'#0099ff',
                            }} 
                            onPress={
                                ()=> {this.clickToDeleteButton(this.props.code, this.state.cartData)}
                            }
                        >
                            <Text style={{fontSize:14, color:'#0099ff',}}>삭제</Text>
                        </TouchableOpacity>

                    </View>
                }
                
            </Row>
        );
    }
}

const styles = StyleSheet.create({
    cartModifyButton:{
        width:50, 
        height:50, 
        marginRight:5,
        backgroundColor:"#0099ff", 
        justifyContent:"center", 
        alignItems:"center",
    },
    cartModifyButtonText:{
        fontSize:14,
    },
    iconStyle : {
        width:26, 
        height:26, 
        fontSize:24, 
        borderWidth:0.5,
        color:'#999',
    }
})

const mapDispatchToProps = (dispatch) =>{
    return{
      cartListDelete : (id) => dispatch( actions.cartListDelete(id) )
    };
};
 
export default connect(null, mapDispatchToProps)(CartList);

