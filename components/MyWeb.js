import React, { Component } from 'react';
import { WebView, View, Linking, StyleSheet, Button } from 'react-native';

import Head from './Head';
import BackGroundImage from './util/backGroundImage';
import { Actions } from 'react-native-router-flux';

export default class MyWeb extends Component {
  state = {
    key: 1,
    isWebViewUrlChanged: false
  };

  componentWillMount(){
    this.props.bcCard !== null ?  Linking.openURL(this.props.url) : null
  }

  resetWebViewToInitialUrl = () => {
    if (this.state.isWebViewUrlChanged) {
      this.setState({
        key: this.state.key + 1,
        isWebViewUrlChanged: false
      });
    }
  };

  setWebViewUrlChanged = webviewState => {
    console.log('webviewState',webviewState)
    if (webviewState.title === 'Finish' ) {
      Actions.Main();
    }
  };

  render() {
    console.log(this.setWebViewUrlChanged)
    console.log('this.props.url',this.props.url)
    
 return (
    <View style={{flex:1, backgroundColor:"#0099ff",}}>
      <BackGroundImage/>
      <Head 
        openDrawer={this.props.openDrawer} 
        closeDrawerHome={this.props.closeDrawer} 
        beforePage = { ()=> Actions.OrderMain()}
      />
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        key={ this.state.key }
        source={{ uri: this.props.url }}
        onNavigationStateChange={ this.setWebViewUrlChanged }
      />
    </View>     
      
    );
  }
}


// export default class MyWeb extends Component {

//   _onShouldStartLoadWithRequest() {
//     return true
//   }

//   render() {
//     return (
      

    //  <View style={{flex:1, backgroundColor:"#0099ff",}}>
    //     <BackGroundImage/>
    //     <Head 
    //       openDrawer={this.props.openDrawer} 
    //       closeDrawerHome={this.props.closeDrawer} 
    //       beforePage = { ()=> Actions.OrderMain()}
    //     />
    //     <WebView 
    //       javaScriptEnabled={true}
    //       domStorageEnabled={true}
    //       source={{uri: ''+this.props.url }}
    //       javaScriptEnabledAndroid={true}
    //       onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
    //       startInLoadingState={true}
    //       onMessage = {(event) => console.log (event)} 
    //       style={{ width: '100%' }}
    //       />
    //   </View>    

//     );
//   }
// }

//웹뷰방식2

// import React, { Component } from 'react';
// import { Button, Text, View, StyleSheet, Linking } from 'react-native';

// import Head from './Head';
// import BackGroundImage from './util/backGroundImage';
// import { Constants, WebBrowser, Expo } from 'expo';

// export default class MyWeb extends Component {

// state = {
//   result: null,
// };

// render() {
//   return (
//     <View style={styles.container}>
//       <Button
//         style={styles.paragraph}
//         title="Open WebBrowser"
//         onPress={this._handlePressButtonAsync}
//       />
//       <Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
//     </View>
//   );
// }



// _handlePressButtonAsync = async () => {

//   // let result = await WebBrowser.openBrowserAsync(this.props.url);

//   Linking.openURL(this.props.url);

//   this.setState({ result });
// };
// }

// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   alignItems: 'center',
//   justifyContent: 'center',
//   paddingTop: Constants.statusBarHeight,
//   backgroundColor: '#ecf0f1',
// },
// });


const styles = StyleSheet.create({
 
  MainContainer :{
      
      flex:1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
  
  }

});
