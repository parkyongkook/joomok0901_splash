import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TextInput, CameraRoll, ScrollView, ActivityIndicator, } from 'react-native';
import {
    Container, CheckBox, Header, Content, Form,
    Item, Input, Label, Left, Button, Icon, Text, Body, Title, Right, Picker
} from 'native-base';

import { Actions } from 'react-native-router-flux';

import AddressModal from './AddressModal';
import BackGroundImage from './util/backGroundImage';
import Head from './Head';
import ModalDropdown from 'react-native-modal-dropdown';

import update from 'immutability-helper'; // 2.6.5
import * as firebase from 'firebase';
import { database } from '../firebase/Config';
// import { ImagePicker, Permissions} from 'expo';

let yearArr = [];
let monthArr = [
    '12',
    '11',
    '10',
    '09',
    '08',
    '07',
    '06',
    '05',
    '04',
    '03',
    '02',
    '01',
];
let dayArr = [];
const that = this;

export default class SignUp_Information extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companySerial : {
                serial1: null,
                serial2: null,
                serial3: null,
            },
            drinkSerial:{
                serial1: null,
                serial2: null,
                serial3: null,
            },
            photos: [],
            localNum: {
                localNumArr: [
                    "02",
                    "031",
                    "032",
                    "033",
                    "041",
                    "042",
                    "043",
                    "044",
                    "051",
                    "052",
                    "053",
                    "054",
                    "055",
                    "061",
                    "062",
                    "063",
                    "064",
                ],
                localNumIndex: 0,
                phone_a: null,
                phone_b: null
            },
            birthTab: {
                year: "출생년도",
                month: "월",
                day: "일",
            },
            modalVisible: false,
            selected1: null,
            Checked1: false,
            Checked2: false,
            comSerialVal : false,
            image: null,
            imageText: "no image",
            selected2: undefined,
            idOverwrapInspect: false,
            addressTxt: null,
            adressDataList: false,
            necessaryUserData: {
                username: this.props.userName,
                // username: '박용국',
                userid: null,
                mobile: this.props.mobile,
                // mobile: '01089528963',
                birth: this.props.userBirth,
                // birth: '19820523',
                password: null,
                passConfirm: null,
                email: null,
                recommander: null,
                com_name: null,
                com_addr: null,
                com_addr1: null,
                com_zipcode: null,
                com_phone: null ,
                com_serial: null,
                com_certify: null,
                com_category: null,
                isagree_rule: 0,
                isagree_info: 0
            }
        };
        this.isNumber = this.isNumber.bind(this);
        this.isValidDate = this.isValidDate.bind(this);
        this.confirmSignup = this.confirmSignup.bind(this);
        this.checkStrType = this.checkStrType.bind(this);
        this.adressSearch = this.adressSearch.bind(this);
        this.selectAdress = this.selectAdress.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.isValEmail = this.isValEmail.bind(this);
        this.onSelectBirth = this.onSelectBirth.bind(this);
        this.phonNumberChanger = this.phonNumberChanger.bind(this);
        this.onSelectCameraroll = this.onSelectCameraroll.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.companyValidation = this.companyValidation.bind(this);
    }

    componentWillMount() {

        var today = new Date(); // 날자 변수 선언
        var yearNow = today.getFullYear();
        var adultYear = yearNow - 20;

        for (const i = adultYear; i > 1900; i--) {
            yearArr.push(i)
        }
    }

    phonNumberChanger(type, text) {
        if (type === "front") {
            this.setState({
                localNum: update(this.state.localNum, {
                    phone_a: { $set: text },
                }),
                necessaryUserData: update(this.state.necessaryUserData, {
                    com_phone: {
                        $set: this.state.localNum.localNumArr[this.state.localNum.localNumIndex] +
                            text + this.state.localNum.phone_b
                    }
                })
            })
        } else {
            this.setState({
                localNum: update(this.state.localNum, {
                    phone_b: { $set: text },
                }),
                necessaryUserData: update(this.state.necessaryUserData, {
                    com_phone: {
                        $set: this.state.localNum.localNumArr[this.state.localNum.localNumIndex] +
                            this.state.localNum.phone_a + text
                    }
                })
            })
        }
    }

    onSelectBirth(type, i, v) {

        const dayChecker = (day) => {
            for (const j = 1; j < day; j++) {
                if (j < 10) {
                    var k = "0" + j
                    dayArr.push(k)
                } else {
                    dayArr.push(j)
                }
            }
        }

        const isMonthChcker = v === "04" || v === "06" || v === "09" || v === "11"

        if (type === "year") {
            this.setState({
                birthTab: update(this.state.birthTab, {
                    year: { $set: v },
                })
            })
        }

        if (type === "month") {

            if (this.state.birthTab.year === "출생년도") {
                alert("출생년도를 선택해 주세요")
                this.setState({
                    birthTab: update(this.state.birthTab, {
                        month: { $set: "월" },
                    })
                })
                return
            }

            dayArr = [];
            this.setState({
                birthTab: update(this.state.birthTab, {
                    month: { $set: v },
                    day: { $set: "일" }
                })
            })
            if (isMonthChcker) {
                dayChecker("31")
            } else if (v !== "02") {
                dayChecker("32")
            } else {
                dayChecker("30")
            }
        }

        if (type === "day") {

            if (this.state.birthTab.month === "월") {
                return
            }

            this.setState({
                birthTab: update(this.state.birthTab, {
                    day: { $set: v },
                }),
                necessaryUserData: update(this.state.necessaryUserData, {
                    birth: { $set: this.state.birthTab.year + this.state.birthTab.month + v }
                })

            })
        }

    }


    onSelectCameraroll(idx,val){
        this._pickImage
        // return val == "파일첨부" ? this._pickImage : console.log(val)
        // if( val == "파일첨부" ){
        //     console.log(val)
        //    this._pickImage
        // }else{
        //     console.log(val)
        // }

    }

    //생년월일 유효성 체크
    isValidDate(dateStr) {

        var year = Number(dateStr.substr(0, 4));
        var month = Number(dateStr.substr(4, 2));
        var day = Number(dateStr.substr(6, 2));

        var today = new Date(); // 날자 변수 선언
        var yearNow = today.getFullYear();
        var adultYear = yearNow - 20;

        if (year < 1900 || year > adultYear) {
            alert("년도를 확인하세요. " + adultYear + "년생 이전 출생자만 등록 가능합니다.");
            return false;
        }
        if (month < 1 || month > 12) {
            alert("생일은 1월부터 12월까지 입력 가능합니다.");
            return false;
        }
        if (day < 1 || day > 31) {
            alert("생일은 1일부터 31일까지 입력가능합니다.");
            return false;
        }
        if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
            alert(month + "월은 31일이 존재하지 않습니다.");
            return false;
        }
        if (month == 2) {
            var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
            if (day > 29 || (day == 29 && !isleap)) {
                alert(year + "년 2월은  " + day + "일이 없습니다.");
                return false;
            }
        }
        return true;

    }

    isValEmail(email) {
        regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return regEmail.test(email) ?  true : false
    }

    onValueChange(value: string) {
        this.setState({
            selected1: value
        });
    }

    onValueChange2(value: string) {
        this.setState({
            necessaryUserData: update(this.state.necessaryUserData, {
                com_category: { $set: value }
            })
        })
    }

    checkStrType(data, type) {
        const str = data;
        var err = 0;

        for (var i = 0; i < str.length; i++) {
            var chk = str.substring(i, i + 1);
            if (!chk.match(/[0-9]|[a-z]|[A-Z]|[!]|[-]|[_]/)) {
                err = err + 1;
            }
        }
        if (err > 0) {
            alert(type + "숫자 및 영문, 일부특수 문자(!,_,-)만 입력가능합니다.");
            return true;
        }
    }

    overlapCheck(userId) {
        //숫자 및 영문만 사용가능하도록 체크.
        if (userId === null) {
            return alert("아이디 항목이 비어있습니다.")
        }
        if (!this.checkStrType(userId, "아이디는 ")) {
            if (userId !== null) {
                if (userId.length < 5) {
                    return alert("5자이상 가능합니다.")
                }
                if (userId.length > 20) {
                    return alert("20자 이하 가능합니다.")
                }
                return fetch('https://api.joomok.net/members/validid?userid=' + userId + "&debug=y")
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            idOverwrapInspect: true
                        })
                        alert(responseJson.message)
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                return alert("아이디 항목이 비어있습니다.")
            }
        }
    }

    isNumber(s) {
        s += ''; // 문자열로 변환
        s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
        if (s == '' || isNaN(s)) return false;
        return true;
    }

    confirmSignup(data) {

        var coll = [];

        for (const v in data) {
            coll.push(data[v])
        }

        const inspect = (element, index, array) => element !== null && element !== "" ? true : false
        const isVal = coll.every(inspect)

        //아이디 항목검사
        if( formState.userid === null || formState.userid === '' ){
            return alert('아이디 항목이 비어있습니다.')
        }

        //아이디 중복확인
        if (!this.state.idOverwrapInspect) {
            return alert("아이디 중복확인은 필수입니다.")
        }

        //비밀번호 검증
        if( formState.password === null || formState.password === '' || formState.passConfirm === null || formState.passConfirm === '' ){
            return alert('비밀번호 항목이 비어있습니다.')
        }

        if (formState.password.length < 8 || formState.password.length > 20) {
            return alert("비밀번호는 8자 이상 20자 이하의 특수문자, 영문만 가능합니다.")
        }
        if ( this.checkStrType(formState.password, "비밀번호")) {
            return this.checkStrType( formState.password, "비밀번호")
        }
        if ( formState.password.length < 8 || formState.password.length > 20) {
            return alert("비밀번호는 8자 이상 20자 이하의 특수문자, 영문만 가능합니다.")
        }
        if ( formState.password !== formState.passConfirm) {
            return alert("비밀번호가 일치하지 않습니다.")
        }

        //이메일검증
        if (!this.isValEmail( formState.email)) {
            return alert("이메일항목이 비어있거나 올바르지 않습니다.")
        }

        if (!this.isValEmail( formState.email)) {
            return alert("잘못된 형식의 이메일 입니다.")
        }

        if( formState.com_addr === null || formState.com_addr === '' ){
            return alert('사업장주소를 입력해 주세요')
        }

        if( formState.com_addr1 === null || formState.com_addr1 === ''  ){
            return alert('상세주소를 입력해 주세요')
        }

        //사업장명 검증
        if( formState.com_name === null || formState.com_name === '' ){
            return alert('사업장명은 필수항목 입니다.')
        }

        //사업장 전화번호
        if( formState.com_phone === null || formState.com_phone === ''  ){
            return alert('사업장 전화번호는 필수항목 입니다.')
        }

        //사업장 전화번호
        if( formState.com_phone.length < 9 ){
            return alert('올바른 사업장 전화번호를 적어주세요')
        }

        //사업자 번호
        if( formState.com_serial === null || formState.com_serial === '' ){
            return alert('사업자 번호는 필수 항목입니다.')
        }

        if( this.state.comSerialVal === false ){
            return alert('사업자의 유효성 검사를 해주세요')
        }

        //주류판매 번호
        if( formState.com_certify === null || formState.com_certify === ''  ){
            return alert('주류판매 번호는 필수 항목입니다.')
        }

        this.setState({
            necessaryUserData: update(this.state.necessaryUserData, {
                com_certify: { $set: this.state.drinkSerial.serial1+this.state.drinkSerial.serial2+this.state.drinkSerial.serial3 }
            })
        })

        //사업자 등록증 첨부 확인
        if (this.state.image == null) {
            return alert("사업자등록증 첨부는 필수 입니다.")
        }

        if (this.state.imageText ==  "no image") {
            return alert("사업자등록증 첨부는 필수 입니다.")
        }

        if ( formState.com_category == null ) {
            return alert("사업장 분류는 필수항목입니다.")
        }

        //이용약관 검증
        if (!formState.isagree_info || !formState.isagree_rule) {
            return alert("이용약관및 개인정보 수집에 동의해주세요")
        }

        fetch('https://api.joomok.net/members', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.necessaryUserData)
        })
        .then((response) => response.json())
        .then((responseData) => {

            if( responseData.code === 500 ){
                return alert('시스템등록 실패 관리자에게 문의하세요',responseData.message)
            }

            if( responseData.code === 412 ){
                return alert(responseData.message)
            }

            //파이어베이스 회원가입 시작.
            firebase.auth().createUserWithEmailAndPassword(this.state.necessaryUserData.userid+"@joomok.com" , this.state.necessaryUserData.userid)
            .then( ()=>{
                alert("회원가입이 성공하였습니다.");
                this.fileUpload()
                Actions.login();
            })
            .catch(()=>{
                alert("회원가입이 실패하였습니다.");
            })

        })
        .catch((error) => {
            if( error  ){

            }
            alert(error);
        })
        .done();
    }

    adressSearch(address) {
        this.setState({
            isLoading : true,
        })
        fetch('https://api.joomok.net/members/search?com_addr=' + address)
        .then((response) => response.json())
        .then((adressDataList) => {
            adressDataList.code === "404" ? alert('올바른 주소가 아닙니다 다시확인해 주세요') : 
            this.setState({
                adressDataList: adressDataList.data,
                modalVisible: true,
            })
        })
        .catch((error) => {
            console.log('error',error);
        })
        .done(()=>this.setState({isLoading : false,}));
    }

    selectAdress(address, zip) {
        this.setState({
            modalVisible: false,
            necessaryUserData: update(this.state.necessaryUserData, {
                com_addr: { $set: address },
                com_zipcode: { $set: zip }
            })
        })
    }

    closeModal() {
        this.setState({
            modalVisible: false
        })
    }

    //이미지 업로드 함수 
    // _pickImage = async () => {
    //     console.log('pickimage')
    //     const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    //     if (status !== 'granted') {
    //         console.log('granted')
    //         await Permissions.askAsync(Permissions.CAMERA_ROLL)
    //     } 

    //     let result = await ImagePicker.launchImageLibraryAsync({ 
    //         mediaTypes: 'Images',
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //     });

    //     if (!result.cancelled) {
    //         console.log('cancelled')
    //         this.setState({
    //             image: result.uri,
    //             imageText: "이미지가 첨부되었습니다."
    //         });
    //     }
    // };


    

    fileUpload(){
        alert('파일업로드 실행')
        // let localUri = this.state.image;
        // let filename = localUri.split('/').pop();
      
        // let match = /\.(\w+)$/.exec(filename);
        // let type = match ? `image/${match[1]}` : `image`;

        // // create formdata

        // const data = new FormData();

        // data.append('serial', {
        //     uri: localUri,
        //     type: type,
        //     name: filename,
        // })
        // data.append('usridx', 9)
        // data.append('userid', 'joomok')

        // fetch('http://pay.joomok.net/serialpic', {
        //     method: 'POST',
        //     body: data,
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // })
        // .then((response) => response.json())
        // .then((responseData) => {
        //     console.log('responseData',responseData)
        //     alert('업로드가 완료되었습니다')
        // })
        // .catch((error) => {
        //     alert('업로드에 실패 하였습니다.')
        //     console.log('error',error);
        // })
        // .done();
        
    }

    companyValidation(){
        let companySerial = this.state.companySerial.serial1+this.state.companySerial.serial2+this.state.companySerial.serial3
        fetch('https://api.joomok.net/members/serials?com_serial='+companySerial, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseData) => {

                if( responseData.code === 412 ){
                    return alert('유효하지 않은 사업자 번호입니다.')
                }

                if(responseData.code === 409){
                    return alert('이미지 등록된 사업자 번호입니다.')
                }

                return alert('정상적인 사업자 입니다.')
            })
            .catch((error) => {
                return alert('유효하지 않은 사업자 번호입니다.')
                console.log('error', error);
            })
        .done(()=>
            this.setState({ 
                comSerialVal : true, 
                necessaryUserData: update(this.state.necessaryUserData, {
                    com_serial: { $set: companySerial }
                })
            })
        );
    }


    render() {

        let serialState = this.state.companySerial;
        let mergeSerial = serialState.serial1+serialState.serial2+serialState.serial3

        let serialDrinkState = this.state.drinkSerial;
        let mergeDrinkSerial = serialDrinkState.serial1+serialDrinkState.serial2+serialDrinkState.serial3

        console.log(this.state.necessaryUserData)
        let { image } = this.state;

        return (
            <Container style={{
                backgroundColor: "#0099ff",
            }}>

                <BackGroundImage />

                <Head
                    title={"회원가입"}
                    hideMenu={true}
                    openDrawer={this.props.openDrawer}
                    closeDrawerHome={this.props.closeDrawer}
                    beforePage={
                        () => {
                            this.state.stateOfComponent ? this.setState({ stateOfComponent: false }) :
                                Actions.SignUp_Authentication();
                        }
                    }
                />

                <Content style={{ backgroundColor: '#fff', }}>
                    <View style={{ width: '90%', marginLeft: '5%', marginTop: 20, marginBottom: 10, flexDirection: 'row', }}>
                        <View style={{ flex: 1, height: 40, borderBottomWidth: 1, borderBottomColor: '#0099ff', }}>
                            <Text style={{ fontSize: 24, color: '#0099ff', }}>회원정보입력</Text>
                        </View>
                        <View style={{ flex: 1, height: 40, borderBottomWidth: 1, borderBottomColor: '#ddd', }}></View>
                    </View>

                    <View style={styles.SignUpFormParent}>
                        <View style={styles.SignUpTitle}>
                            <Text style={styles.loginSubText}>이름</Text>
                        </View>
                        <View style={styles.SignUpSubText}><Text style={styles.loginSubText}>{this.state.necessaryUserData.username}</Text></View>
                    </View>
                    <View style={styles.SignUpFormParent}>
                        <View style={styles.SignUpTitle}>
                            <Text style={styles.loginSubText}>휴대폰</Text>
                        </View>
                        <View style={styles.SignUpSubText}><Text style={styles.loginSubText}>{this.state.necessaryUserData.mobile}</Text></View>
                    </View>
                    <View style={styles.SignUpFormParent}>
                        <View style={styles.SignUpTitle}><Text style={styles.loginSubText} >아이디</Text></View>
                        <View style={{ flex: 5, height: 25, marginRight: 15, flexDirection: "row", }}>
                            <Item Regular style={{ flex: 4, height: 25, marginRight: 10, backgroundColor: "#fff", borderRadius: 5, }} >
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    selectionColor={"#555"}
                                    placeholder={"아이디 입력"}
                                    onChangeText={
                                        text => {
                                            this.setState({
                                                necessaryUserData: update(this.state.necessaryUserData, {
                                                    userid: { $set: text }
                                                }),
                                                idOverwrapInspect: false
                                            })

                                        }}
                                    style={styles.textInput}
                                />
                            </Item>
                            <Button style={[styles.inputButton, {
                                flex: 2,
                                backgroundColor: "rgba(0,0,0,0)",
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: "#777",
                                justifyContent: "center",
                            }]} onPress={
                                () => {
                                    this.overlapCheck(this.state.necessaryUserData.userid)
                                }
                            }>
                                <Text style={{ fontSize: 12, textAlign: "center", color: '#777', }}>중복확인</Text>
                            </Button>
                        </View>
                    </View>

                    <View style={styles.SignUpFormParent}>
                        <View style={styles.SignUpTitle}>
                            <Text style={styles.loginSubText}>생년월일</Text>
                        </View>
                        <View style={styles.SignUpSubText}><Text style={styles.loginSubText}>{this.state.necessaryUserData.birth}</Text></View>
                    </View>

                    <View style={styles.SignUpFormParent}>

                        <View style={styles.SignUpTitle}>
                            <Text style={styles.loginSubText} >비밀번호</Text>
                        </View>

                        <View style={styles.SignUpSubText}>
                            <Item Regular style={styles.SignUpMobileInput}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    selectionColor={"#555"}
                                    placeholder={"비밀번호 10자이상"}
                                    secureTextEntry={true}
                                    onChangeText={
                                        (text) =>
                                            this.setState({
                                                necessaryUserData: update(this.state.necessaryUserData, {
                                                    password: { $set: text }
                                                })
                                            })
                                    }
                                    style={styles.textInput}
                                />
                            </Item>
                        </View>
                    </View>
                    <View style={styles.SignUpFormParent}>
                        <View style={styles.SignUpTitle}><Text style={styles.loginSubText} >비밀번호확인</Text></View>
                        <View style={styles.SignUpSubText}>
                            <Item Regular style={styles.SignUpMobileInput}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    selectionColor={"#555"}
                                    placeholder={"비밀번호 확인"}
                                    secureTextEntry={true}
                                    onChangeText={
                                        (text) =>
                                            this.setState({
                                                necessaryUserData: update(this.state.necessaryUserData, {
                                                    passConfirm: { $set: text }
                                                })
                                            })
                                    }
                                    style={styles.textInput}
                                />
                            </Item>
                        </View>
                    </View>
                    <View style={styles.SignUpFormParent}>
                        <View style={styles.SignUpTitle}><Text style={styles.loginSubText}>이메일</Text></View>
                        <View style={{ flex: 5, height: 25, marginRight: 15, flexDirection: "row", }}>
                            <Item Regular style={styles.SignUpMobileInput}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    selectionColor={"#555"}
                                    style={styles.textInput}
                                    placeholder={"예시) sample@email.com"}
                                    onChangeText={
                                        (text) =>
                                            this.setState({
                                                necessaryUserData: update(this.state.necessaryUserData, {
                                                    email: { $set: text }
                                                })
                                            })
                                    }
                                />
                            </Item>
                        </View>
                    </View>


                    <View style={styles.SignUpFormParent}>

                        <View style={styles.SignUpTitle}>
                            <Text style={styles.loginSubText}>사업장주소</Text>
                        </View>

                        <View style={{
                            flex: 5,
                            height: 55,
                            marginRight: 15,
                        }}>

                            <View style={{ flex: 1, height: 25, flexDirection: "column", }}>

                                <View style={{ flex: 1, height: 25, flexDirection: "row", }} >

                                    <Item Regular style={{
                                        flex: 4,
                                        height: 25,
                                        marginRight: 10,
                                        backgroundColor: "#fff",
                                        borderRadius: 5,
                                    }}>
                                        <TextInput
                                            value={
                                                this.state.necessaryUserData.com_addr ? this.state.necessaryUserData.com_addr : null
                                            }
                                            selectionColor={"#555"}
                                            placeholder={"검색할 주소를 입력하세요"}
                                            underlineColorAndroid='transparent'
                                            style={{ flex: 4, marginRight: 10, }}
                                            onChangeText={
                                                (text) =>
                                                    this.setState({
                                                        necessaryUserData: update(this.state.necessaryUserData, {
                                                            com_addr: { $set: text }
                                                        })
                                                    })
                                            }
                                            style={styles.textInput}
                                        />
                                    </Item>

                                    <Button onPress={
                                        () => {
                                            this.state.necessaryUserData.com_addr !== null ?
                                                this.adressSearch(this.state.necessaryUserData.com_addr)
                                                : alert("주소를 입력하세요")
                                        }
                                    }
                                        style={[styles.inputButton, {
                                            flex: 2,
                                            backgroundColor: "rgba(0,0,0,0)",
                                            borderRadius: 5,
                                            borderWidth: 1,
                                            borderColor: "#777",
                                        }]}
                                    >
                                        <Text style={{ fontSize: 12, color: '#777', }}>우편번호</Text>
                                    </Button>
                                </View>

                                <View style={{ height: 25, }} >
                                    <Item Regular style={{ flex: 1, height: 25, backgroundColor: "#fff", borderRadius: 5, }}>
                                        <TextInput
                                            underlineColorAndroid='transparent'
                                            selectionColor={"#555"}
                                            placeholder={"상세주소"}
                                            onChangeText={
                                                (text) =>
                                                    this.setState({
                                                        necessaryUserData: update(this.state.necessaryUserData, {
                                                            com_addr1: { $set: text }
                                                        })
                                                    })
                                            }
                                            style={styles.textInput}
                                        />
                                    </Item>
                                </View>

                            </View>


                        </View>
                    </View>

                    <View style={styles.SignUpFormParent}>
                        <View style={styles.SignUpTitle}><Text style={styles.loginSubText} >사업장명</Text></View>
                        <View style={styles.SignUpSubText}>
                            <Item Regular style={styles.SignUpMobileInput}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    selectionColor={"#555"}
                                    onChangeText={
                                        (text) =>
                                            this.setState({
                                                necessaryUserData: update(this.state.necessaryUserData, {
                                                    com_name: { $set: text }
                                                })
                                            })
                                    }
                                    style={styles.textInput}
                                />
                            </Item>
                        </View>
                    </View>

                    <View style={styles.SignUpFormParent}>

                        <View style={{
                            flex: 2.04,
                            height: 25,
                            marginLeft: 15,
                            justifyContent: "center",
                        }}>
                            <Text style={styles.loginSubText} >사업장 전화번호</Text></View>

                        <View style={{ flex: 5, height: 25, marginRight: 15, flexDirection: "row", }}>

                            <View style={{
                                flex: 3,
                                backgroundColor: "#eee",
                                borderRadius: 5,
                                marginRight: 2,
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <Text style={{ fontSize: 14, flex: 3, textAlign: "center", color: "#70aed5", }}>
                                    {
                                        this.state.localNum.localNumArr[this.state.localNum.localNumIndex]
                                    }
                                </Text>
                                <ModalDropdown

                                    onSelect={
                                        (i, v) => this.setState({
                                            localNum: update(this.state.localNum, {
                                                localNumIndex: { $set: i }
                                            })
                                        })
                                    }
                                    dropdownStyle={{ width: 85, marginLeft: -64, }}
                                    options={this.state.localNum.localNumArr}
                                    style={{
                                        height: 20, marginRight: 5, flex: 1,
                                        justifyContent: "center", alignItems: "center",
                                        flexDirection: "row",
                                        backgroundColor: '#eee',
                                    }}
                                >
                                    <Icon type="FontAwesome" name="caret-down"
                                        style={{
                                            fontSize: 18,
                                            color: "#0099ff"
                                        }}
                                    />
                                </ModalDropdown>
                            </View>

                            <Item Regular style={{ flex: 3, height: 25, backgroundColor: "#fff", borderRadius: 5, }}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    selectionColor={"#555"}
                                    onChangeText={
                                        (text) =>
                                            this.phonNumberChanger("front", text)
                                    }
                                    style={styles.textInput}
                                />
                            </Item>

                            <Item Regular style={{ flex: 3, height: 25, backgroundColor: "#fff", borderRadius: 5, }}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    selectionColor={"#555"}
                                    onChangeText={
                                        (text) =>
                                            this.phonNumberChanger("back", text)
                                    }
                                    style={styles.textInput}
                                />
                            </Item>

                        </View>

                    </View>


                    <View style={styles.SignUpFormParent}>
                        <View style={styles.SignUpTitle}>< Text style={styles.loginSubText} >사업자번호</Text></View>
                        <View style={{ flex: 5, height: 25, marginRight: 15, flexDirection: "row", }}>
                            <Item Regular style={{ flex: 3, height: 25, backgroundColor: "#eee", borderRadius: 5, }}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    selectionColor={"#555"}
                                    onChangeText={
                                        (text) =>
                                            this.setState({
                                                companySerial: update(this.state.companySerial, {
                                                    serial1: { $set: text }
                                                }),
                                                necessaryUserData : update(this.state.necessaryUserData, {
                                                    com_serial: { $set: mergeSerial }
                                                }),
                                                comSerialVal: false,
                                            })
                                    }
                                    style={styles.textInput}
                                />
                            </Item>
                            <Item Regular style={{ flex: 3, height: 25, backgroundColor: "#eee", borderRadius: 5, }}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    selectionColor={"#555"}
                                    onChangeText={
                                        (text) =>
                                            this.setState({
                                                companySerial: update(this.state.companySerial, {
                                                    serial2: { $set: text }
                                                }),
                                                necessaryUserData : update(this.state.necessaryUserData, {
                                                    com_serial: { $set: mergeSerial }
                                                }),
                                            })
                                    }
                                    style={styles.textInput}
                                />
                            </Item>
                            <Item Regular style={{ flex: 3, height: 25, marginRight: 5, backgroundColor: "#eee", borderRadius: 5, }}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    selectionColor={"#555"}
                                    onChangeText={
                                        (text) =>
                                            this.setState({
                                                companySerial: update(this.state.companySerial, {
                                                    serial3: { $set: text }
                                                }),
                                                necessaryUserData : update(this.state.necessaryUserData, {
                                                    com_serial: { $set: mergeSerial }
                                                }),
                                            })
                                    }
                                    style={styles.textInput}
                                />
                            </Item>
                            <Button style={[styles.inputButton, {
                                                flex: 4.6,
                                                backgroundColor: "rgba(0,0,0,0)",
                                                borderRadius: 5,
                                                borderWidth: 1,
                                                borderColor: "#777",
                                            }]}
                                    onPress={ this.companyValidation }        
                            >
                                <Text style={{ fontSize: 12, color: '#777', }}>유효성검사</Text>
                            </Button>
                        </View>
                    </View>

                    <View style={styles.SignUpFormParent}>
                        <View style={styles.SignUpTitle}><Text style={styles.loginSubText} >주류판매번호</Text></View>
                        <View style={{ flex: 5, height: 25, marginRight: 15, flexDirection: "row", }}>
                            <Item Regular style={{ flex: 3, height: 25, backgroundColor: "#eee", borderRadius: 5, }}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    selectionColor={"#555"}
                                    onChangeText={
                                        (text) =>
                                            this.setState({
                                                drinkSerial: update(this.state.drinkSerial, {
                                                    serial1: { $set: text }
                                                }),
                                                necessaryUserData : update(this.state.necessaryUserData, {
                                                    com_certify: { $set: this.state.drinkSerial.serial1+this.state.drinkSerial.serial2+this.state.drinkSerial.serial3 }
                                                }),
                                            })
                                    }
                                    style={styles.textInput}
                                />
                            </Item>
                            <Item Regular style={{ flex: 3, height: 25, backgroundColor: "#eee", borderRadius: 5, }}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    selectionColor={"#555"}
                                    onChangeText={
                                        (text) =>
                                            this.setState({
                                                drinkSerial: update(this.state.drinkSerial, {
                                                    serial2: { $set: text }
                                                }),
                                                necessaryUserData : update(this.state.necessaryUserData, {
                                                    com_certify: { $set: this.state.drinkSerial.serial1+this.state.drinkSerial.serial2+this.state.drinkSerial.serial3 }
                                                }),
                                            })
                                    }
                                    style={styles.textInput}
                                />
                            </Item>
                            <Item Regular style={{ flex: 3, height: 25, marginRight: 5, backgroundColor: "#eee", borderRadius: 5, }}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    selectionColor={"#555"}
                                    onChangeText={
                                        (text) =>
                                            this.setState({
                                                drinkSerial: update(this.state.drinkSerial, {
                                                    serial3: { $set: text }
                                                }),
                                                necessaryUserData : update(this.state.necessaryUserData, {
                                                    com_certify: { $set: this.state.drinkSerial.serial1+this.state.drinkSerial.serial2+this.state.drinkSerial.serial3 }
                                                }),
                                            })
                                    }
                                    style={styles.textInput}
                                />
                            </Item>
                        </View>
                    </View>

                    <View style={styles.SignUpFormParent}>

                        <View style={styles.SignUpTitle}><Text style={styles.loginSubText} >사업자등록증</Text></View>

                        <View style={{ flex: 5, height: 25, marginRight: 15, flexDirection: "row", }}>
                            <Item Regular style={{ flex: 4, height: 25, marginRight: 5, backgroundColor: "#eee", borderRadius: 5, }}>
                                <Text style={{ marginLeft: 10, fontSize: 14, color: "#bbb", }}>{this.state.imageText}</Text>
                            </Item>
                            <Button style={[styles.inputButton, {
                                flex: 2,
                                backgroundColor: "rgba(0,0,0,0)",
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: "#777",
                            }]}
                                onPress={this._pickImage} >
                                <Text style={{ fontSize: 12, color: '#777', marginLeft: 8, }}>파일첨부</Text>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                    {image && <Image source={{ url: image }} style={{ height: 100 }} />}
                                </View>
                            </Button>

                        </View>

                    </View>

                    <View style={styles.SignUpFormParent}>
                        <View style={styles.SignUpTitle}><Text style={styles.loginSubText} >사업장 분류</Text></View>
                        <View style={{ flex: 5, height: 25, marginRight: 15, flexDirection: "row", }}>
                            <Item Regular style={styles.SignUpMobileInput}>
                    

                                    <Picker
                                        mode="dropdown"
                                        placeholder="업종선택"
                                        placeholderStyle={{ color: "#bfc6ea", fontSize: 14, }}
                                        style={{ backgroundColor: '#eee', height: 26, width: '100%' }}
                                        selectedValue={this.state.necessaryUserData.com_category}
                                        onValueChange={this.onValueChange2.bind(this)}
                                    >
                                        <Picker.Item label="소매사업자(일반음식점)" value="10" />
                                        <Picker.Item label="소매사업자(주점)" value="20" />
                                        <Picker.Item label="소매사업자(유흥)" value="30" />
                                        <Picker.Item label="일반판매점(마트,편의점)" value="40" />

                                    </Picker>

                            </Item>
                        </View>
                    </View>

                    <View style={styles.SignUpFormParent}>
                        <View style={styles.SignUpTitle}><Text style={styles.loginSubText}>추천인</Text></View>
                        <View style={{ flex: 5, height: 25, marginRight: 15, flexDirection: "row", }}>
                            <Item Regular style={styles.SignUpMobileInput}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    selectionColor={"#555"}
                                    placeholder={"추천인 아이디 입력"}
                                    onChangeText={
                                        (text) =>
                                            this.setState({
                                                necessaryUserData: update(this.state.necessaryUserData, {
                                                    recommander: { $set: text }
                                                })
                                            })
                                    }
                                    style={styles.textInput}
                                />
                            </Item>
                        </View>
                    </View>
                    <View style={styles.SignUpFormParent}>
                        <CheckBox
                            color="skyblue"
                            checked={this.state.necessaryUserData.isagree_rule === 1}
                            //체크박스 옵션
                            onPress={
                                () => {
                                    this.state.necessaryUserData.isagree_rule !== 1 ?
                                        this.setState({
                                            necessaryUserData: update(this.state.necessaryUserData, {
                                                isagree_rule: { $set: 1 }
                                            })
                                        })
                                        :
                                        this.setState({
                                            necessaryUserData: update(this.state.necessaryUserData, {
                                                isagree_rule: { $set: 0 }
                                            })
                                        })
                                }
                            }
                            style={{ marginTop: 5, }}
                        />
                        <View style={styles.ItemTitle}><Text style={styles.loginSubText}>이용약관</Text></View>
                        <TouchableOpacity style={styles.ItemText}>
                            <Text style={styles.loginSubText}>펼쳐보기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.SignUpFormParent}>
                        <CheckBox
                            color="skyblue"
                            checked={this.state.necessaryUserData.isagree_info === 1}
                            //체크박스 옵션
                            onPress={
                                () => {
                                    this.state.necessaryUserData.isagree_info !== 1 ?
                                        this.setState({
                                            necessaryUserData: update(this.state.necessaryUserData, {
                                                isagree_info: { $set: 1 }
                                            })
                                        })
                                        :
                                        this.setState({
                                            necessaryUserData: update(this.state.necessaryUserData, {
                                                isagree_info: { $set: 0 }
                                            })
                                        })
                                }
                            }
                            style={{ marginTop: 5, }}
                        />
                        <View style={styles.ItemTitle}><Text style={styles.loginSubText}>개인정보 수집 및 이용에 대한 안내(필수)</Text></View>
                        <TouchableOpacity style={styles.ItemText}>
                            <Text style={styles.loginSubText}>펼쳐보기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 30, marginBottom: 30, justifyContent: "space-around", }}>

                        <Button style={{
                            width: "45%",
                            height: 60,
                            justifyContent: "center",
                            backgroundColor: "#0099ff",
                        }}
                            onPress={
                                () => {
                                    this.confirmSignup(this.state.necessaryUserData)
                                }
                            }>
                            <Text style={{ color: "#fff", fontSize: 20, }}>확인</Text>
                        </Button>
                        <Button style={{
                            width: "45%",
                            justifyContent: "center",
                            backgroundColor: "rgba(0,0,0,0)",
                            borderRadius: 4,
                            borderWidth: 2,
                            borderColor: "#0099ff",
                            height: 60,
                            padding:0
                        }}
                            onPress={
                                () => {
                                    Actions.Login()
                                }
                            }
                        >

                            <Text style={{ color: '#0099ff', fontSize: 20, }}>취소</Text>
                        </Button>
                    </View>
                    </Content>
            <AddressModal
                modalVisible={this.state.modalVisible}
                addressListData={this.state.adressDataList}
                selectAdress={this.selectAdress}
                closeModal={this.closeModal}
            />

        {this.state.isLoading ?
            <ActivityIndicator
                size="large"
                color="#0000ff"
                style={{ width: "100%", height: "100%", position: "absolute", backgroundColor: "#fff", opacity: 0.5, }}
            />
            :
        null}
      </Container >
    );
    }
}

const styles = StyleSheet.create({
    loginSubText: {
        fontSize: 14,
        color: "#000",
    }, SignUpFormParent: {

        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 7,

    }, SignUpTitle: {
        flex: 2,
        height: 25,
        marginLeft: 15,
        justifyContent: "center",

    }, SignUpSubText: {
        flex: 5,
        height: 25,
        marginRight: 15,
        justifyContent: "center",

    }, SignUpMobileInput: {

        flex: 4,
        height: 25,
        width: '100%',
        backgroundColor: "#eee",
        borderRadius: 5,

    }, ItemTitle: {
        flex: 20,
        height: 25,
        marginRight: 10,
        marginLeft: 15,
        justifyContent: "center"
    }, ItemText: {
        flex: 5,
        height: 25,
        marginLeft: 10,
        justifyContent: "center"
    },
    textInput: {
        flex: 1,
        height: 25,
        paddingLeft: 10,
        paddingTop:0,
        paddingBottom:0,
        backgroundColor: '#eee',
        borderBottomWidth:0,

    },
    inputButton: {
        flex: 10,
        height: 25,
        paddingTop: 0, 
        paddingBottom: 0,

    },
    birthDropBox: {
        flex: 1,
        backgroundColor: "#eee",
        borderRadius: 5,
        marginRight: 2,
        flexDirection: "row",
        alignItems: "center",
    }
});

