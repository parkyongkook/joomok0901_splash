import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar, Text, Image, Platform } from 'react-native';
import { Drawer, Title, Header, Button, Left, Right, Body, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

export default class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            logoTitle: "JOOMOK",
        };
    }

    componentDidMount() {
        this.props.title ? this.setState({ logoTitle: this.props.title }) : this.setState({ logoTitle: "JOOMOK" })
    }

    consolefunc() {
        console.log("어 돌아가네!!?????")
    }

    render() {
        const beforePage = (
            <Button transparent 
                onPress={() => {
                    if( this.props.stateOfComponent === true ){
                       return this.props.changeStateOfComponent()
                    }
                    Actions.pop()
                } 
                    }
                >
                <Icon type="EvilIcons" name='arrow-left'
                    style={{ color: "#fff", fontSize: 40, }}
                />
            </Button>
        )

        return (
            <Header noShadow style={{
                height: Platform.OS === "ios" ? 80 : 90,
                backgroundColor: "rgba(0,0,0,0)",
            }}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />

                <Left style={{ flex: 2, 
                    marginTop: Platform.OS === 'ios' ? 10 : 30, 
                    }}>
                    {this.props.beforePage ? beforePage : null}
                </Left>

                <Body style={{ flex: 5, flexDirection: "row", justifyContent: "center", }}>
                    <View style={{ flex: 3, justifyContent: 'center', flexDirection: "row", alignItems: "center", position: "relative", }}>
                        {
                            this.props.title ?
                                <Text style={{ fontSize: 26, color: "#fff",
                                 marginTop: Platform.OS === 'ios' ? 10 : 30, 
                                }}>
                                    {this.props.title}
                                </Text>
                                :
                                <Image
                                    style={{
                                        flex: 1,
                                        resizeMode: "contain",
                                        justifyContent: 'flex-start',
                                        width: '100%',
                                        marginTop: Platform.OS === "ios" ? 0 : 25,
                                    }}
                                    source={require('../assets/img/logo.png')}
                                />
                        }
                    </View>
                    {/* <TouchableOpacity onPress={ !this.props.title ? ()=> Actions.Main() : null  }>
                  <Title style={{color:"#fff",}}>{this.state.logoTitle}</Title>
                </TouchableOpacity> */}
                </Body>

                <Right style={{ flex: 2, 
                     marginTop: Platform.OS === "ios" ? 0 : 30, 
                    }}>
                    {this.props.hideMenu ? null :
                        <TouchableOpacity
                            style={{
                                width: 20,
                                height: 30,
                                marginTop: 15,
                            }}
                            onPress={this.props.openDrawer}
                        >
                            {/* <Icon name='menu' style={{fontSize:40, fontWeight:"bold", color:"#fff",}} /> */}
                            <View style={styles.rightMenuButton} />
                            <View style={styles.rightMenuButton} />
                            <View style={styles.rightMenuButton} />
                        </TouchableOpacity>
                    }
                </Right>

            </Header>
        );
    }
}

const styles = StyleSheet.create({
    rightMenuButton: {
        height: 7,
        width: 7,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        marginBottom: 2,
    },
});

