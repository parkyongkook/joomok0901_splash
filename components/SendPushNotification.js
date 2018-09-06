import React from 'react';
import { StyleSheet, Text, View, StatusBar, ListView } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base'
import { finalData , fireDataBase , database } from '../firebase/Config'
import update from 'immutability-helper'; // 2.6.5
import * as firebase from 'firebase';
import PushUserList from './listComponent/PushUserList'; 

var data = []
var userUidKey= []
var userData = []
let count = 0

import { Permissions, Notifications } from 'expo';

export default class App extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.state = {
            pushList : {
                title: "",
                newContact: "",
                email: "",
                uid: "",
            },
            listViewData: data,
            userListData : userData ,
            currentUser: ""
        }

        this.mapToPushUserList = this.mapToPushUserList.bind(this);
    }

    componentDidMount() {
        var currentUser
        var that = this

        listener = firebase.auth().onAuthStateChanged(function (user) {
            if (user != null) {
                currentUser = user
                that.registerForPushNotificationsAsync(currentUser)
            }
            listener();
        });


        

        firebase.database().ref('/contacts').on('child_added', function (data) {
            var newData = [...that.state.listViewData]
            newData.push(data)
            that.setState({ listViewData: newData })
        })

        firebase.database().ref('/users').on('child_added', function (data) {

            var userData = [...that.state.userListData]

            userData.push(data)

            that.setState({ userListData: userData })
            
        })


    }

    mapToPushUserList = (data) => {
        return data.map((cartListData, i) => {
        return (
            <PushUserList 
                // email={}
                // expoKey={}
                // uid={}
                index = {i} 
                key={i}
            />);
        })
    }

    // loadSubscribers = () => {

    //     var messages = []
    //     //return the main promise
    //     return firebase.database().ref('/subscribers').once('value').then(function (snapshot) {
    //         snapshot.forEach(function (childSnapshot) {
    //             var childKey = childSnapshot.key;
    //             messages.push({
    //                 "to": childKey,
    //                 "sound": "default",
    //                 "body": 'this.state.newContact'
    //             });
    //         });
    //         //firebase.database then() respved a single promise that resolves
    //         //once all the messages have been resolved 
    //         return Promise.all(messages)

    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }

    registerForPushNotificationsAsync = async (currentUser) => {

        const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // 사용자 권한을 부여하지 않은경우 여기서 중지
        if (finalStatus !== 'granted') {
            return;
        }

        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();

        // POST the token to our backend so we can use it to send pushes from there
        var updates = {}
        updates['/expoToken'] = token

        await firebase.database().ref('/users/' + currentUser.uid).update(updates)

        //call the push notification 

    }

    addRow(data) {

        var arr = JSON.parse(JSON.stringify(this.state.userListData[0]))
        var key = firebase.database().ref('/contacts').push().key

        firebase.database().ref('/contacts').child(key).set({ 
            title : data.title,
            message : data.newContact ,
            email : arr.email,
            uid : arr.uid
        })

    }

    async deleteRow(secId, rowId, rowMap, data) {
        await firebase.database().ref('contacts/' + data.key).set(null)
        rowMap[`${secId}${rowId}`].props.closeRow();
        var newData = [...this.state.listViewData];
        newData.splice(rowId, 1)
        this.setState({ listViewData: newData });
    }

    render() {
        return (

            <Container style={styles.container} >

                <Header style={{ marginTop: StatusBar.currentHeight }}>
                </Header>

                <View style={{flexDirection:'row',}}>
                    <View style={{flex:5,flexDirection:'column', height:80, marginLeft:20,}}>
                        <Input
                            onChangeText={(title) => this.setState({ 
                                pushList : update(this.state.pushList, { 
                                    title : { $set: title }
                                })
                            })}

                            placeholder="title"
                            style={{backgroundColor:'#eee', marginTop:10,}}
                        />
                        <Input
                            onChangeText={(newContact) => this.setState({ 
                                pushList : update(this.state.pushList, { 
                                    newContact : {$set: newContact }
                                })
                            })}

                            placeholder="body"
                            style={{backgroundColor:'#eee', marginTop:10,}}
                        />
                    </View>

                    <View style={{flex:1,height:80, justifyContent:'center',}}>
                        <Button 
                            onPress={() => this.addRow( this.state.pushList )}
                            style={{marginLeft:10,}}
                            >
                            
                                <Icon name="add" />
                        </Button>
                    </View>
                </View>

                <View style={{flex:1, backgroundColor:'#ddd',}}>

                     <List
                        enableEmptySections
                        dataSource={this.ds.cloneWithRows( this.state.userListData )}
                        renderRow={
                        data => 
                            <ListItem style={{ flexDirection:'column', }}>
                                <View>
                                    <Text>이메일 :  { data.val().email }</Text>
                                </View>
                                <View>
                                    <Text>uid :  { data.val().uid }</Text>
                                </View>
                            </ListItem>
                        }
                        renderLeftHiddenRow={ (data,title) =>
                            <Button full onPress={() => this.addRow(data,title)} >
                                <Icon name="information-circle" />
                            </Button>
                        }
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={() => this.deleteRow(secId, rowId, rowMap, data)}>
                                <Icon name="trash" />
                            </Button>
                        }
                        leftOpenValue={-75}
                        rightOpenValue={-75}
                    />

                </View>

                <Content>

                    <List
                        enableEmptySections
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={
                        data => 
                            <ListItem style={{ flexDirection:'column', }}>
                                <View>
                                    <Text>타이틀 :  { data.val().title}</Text>
                                </View>
                                <View>
                                    <Text>내용 :  {data.val().message}</Text>
                                </View>
                            </ListItem>
                        }
                        renderLeftHiddenRow={ (data,title) =>
                            <Button full onPress={() => this.addRow(data,title)} >
                                <Icon name="information-circle" />
                            </Button>
                        }
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={() => this.deleteRow(secId, rowId, rowMap, data)}>
                                <Icon name="trash" />
                            </Button>
                        }
                        leftOpenValue={-75}
                        rightOpenValue={-75}
                    />

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
});
