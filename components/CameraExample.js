import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Image
} from "react-native";
import Head from './Head';
import { Camera, Permissions } from "expo";
// import { RNS3 } from "react-native-aws3";

export default class CameraExample extends React.Component {
  state = {
    switchValue: false,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    imageuri: "",
    url: ""
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  cameraChange = () => {
    this.setState({
      imageuri: "",
      url: "",
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      if (photo) {
        this.setState({ imageuri: photo.uri });
      }
    }
  };

  // upload = () => {
  //   const file = {
  //     uri: this.state.imageuri,
  //     name: `${new Date().getTime()}.jpg`,
  //     type: "image/jpeg"
  //   };
  //   const options = {
  //     keyPrefix: "ts/",
  //     bucket: "..name..",
  //     region: "eu-west-1",
  //     accessKey: "..acesskey..",
  //     secretKey: "..secretkey..",
  //     successActionStatus: 201
  //   };
  //   return RNS3.put(file, options)
  //     .then(response => {
  //       if (response.status !== 201)
  //         throw new Error("Failed to upload image to S3");
  //       else {
  //         console.log(
  //           "Successfully uploaded image to s3. s3 bucket url: ",
  //           response.body.postResponse.location
  //         );
  //         this.setState({
  //           url: response.body.postResponse.location,
  //           switchValue: false
  //         });
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return (
        <View>
          <Text>No access to camera</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Head 
            openDrawer={this.props.openDrawer} 
            closeDrawerHome={this.props.closeDrawer} 
            beforePage = { ()=> Actions.Main() }
            title={"비밀번호변경"}
          />
          <View style={styles.switchview}>
            <Text>Show camera</Text>
            <Switch
              onValueChange={value => {
                this.setState({ switchValue: value });
              }}
              value={this.state.switchValue}
              style={styles.switch}
            />
          </View>
          {this.state.switchValue ? (
            <View style={styles.cameraview}>
              {this.state.imageuri != "" ? (
                <Image
                  source={{
                    uri: this.state.imageuri
                  }}
                  style={styles.uploadedImage}
                  resizeMode="contain"
                />
              ) : (
                <Camera
                  style={styles.camera}
                  type={this.state.type}
                  ref={ref => {
                    this.camera = ref;
                  }}
                >
                  <View style={styles.camerabuttonview}>
                    <TouchableOpacity
                      style={styles.cameraButtons}
                      onPress={this.cameraChange}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          marginBottom: 10,
                          color: "white"
                        }}
                      >
                        Flip
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Camera>
              )}
            </View>
          ) : (
            <View style={styles.cameraview}>
              {this.state.url != "" ? (
                <Text>Uploaded url : {this.state.url}</Text>
              ) : null}
              <Text>Camera off</Text>
            </View>
          )}
          {this.state.switchValue ? (
            <View style={styles.buttonsView}>
              {this.state.imageuri == "" ? (
                <View style={styles.captureButtonView}>
                  <TouchableOpacity
                    style={styles.cameraButtons}
                    onPress={this.snap}
                  >
                    <Text
                      style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                    >
                      Capture
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              {/* <View style={styles.captureButtonView}>
                <TouchableOpacity
                  style={styles.cameraButtons}
                  onPress={this.upload}
                >
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                  >
                    Upload
                  </Text>
                </TouchableOpacity>
              </View> */}
            </View>
          ) : null}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1dd1a1",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  switchview: {
    marginTop: 50,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 5
  },
  switch: {
    padding: 5
  },
  cameraview: {
    height: 400,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  camera: {
    height: "95%",
    width: "95%",
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  camerabuttonview: {
    height: "100%",
    backgroundColor: "transparent"
  },
  cameraButtons: {
    borderColor: "#fff",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    margin: 5
  },
  captureButtonView: {
    height: 200
  },
  buttonsView: {
    height: 200,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center"
  },
  uploadedImage: {
    height: "90%",
    width: "90%",
    padding: 10
  }
});


//카메라 예제 2



// import React, { Component, } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     ImageBackground
// } from "react-native";

// import { Camera, Permissions, } from 'expo'

// import { Container, Content, Header, Item, Icon, Input, Button } from 'native-base'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// const PHOTO_INTERVAL = 4000;
// const FOCUS_TIME = 1000;
// const SERVER_URL = "http://192.168.1.45:5005/";

// class CameraExample extends Component {

//     constructor(props) {
      
//       super(props);

//       this.state = {
//         cameraPermission: null,
//         type: Camera.Constants.Type.back,
//         photo : null,
//       }
//   }

//     componentDidMount() {
//       Permissions.askAsync(Permissions.CAMERA)
//         .then(({ status }) =>
//           this.setState({
//             cameraPermission: status === 'granted'
//           })
//         );
//     }


//     takePicture = () => {
//       this.camera.takePictureAsync({
//         quality: 0.1,
//         base64: true,
//         exif: false
//       }).then(photo => {
//         this.setState({ photo }, () => {
//           this.uploadPicture()
//             .then(this.queuePhoto)
//             .catch(this.queuePhoto);
//         });
//       });
//     }

//     uploadPicture = () => {
//       return fetch(SERVER_URL, {
//         body: JSON.stringify({
//           image: this.state.photo.base64
//         }),
//         headers: {
//           'content-type': 'application/json'
//         },
//         method: 'POST'
//       })
//       .then(response => response.json())
//     }
  
//     queuePhoto = () => {
//       // In 27 seconds, turn the camera back on
//       setTimeout(() => {
//         this.setState({ photo: null });
//       }, PHOTO_INTERVAL - FOCUS_TIME);
  
//       // In 30 seconds, take the next picture
//       setTimeout(this.takePicture, PHOTO_INTERVAL);
//     }
  


//     render() {
//       const { photo } = this.state;
//       const { cameraPermission } = this.state;
//             return (
              
//                 <View style={{ flex: 1 }}>
//                     {photo ? (
//                       <ImageBackground
//                         style={{ flex: 1 }}
//                         source={{ uri: photo.uri }} />
//                     ) : (
//                       <Camera
//                         style={{ flex: 1 }}
//                         onPress={this.takePicture}
//                         type={Camera.Constants.Type.back}
//                         ref={cam => this.camera = cam}>
//                         <TouchableOpacity
//                           style={{ flex: 1 }}
//                           onPress={this.takePicture}/>
//                       </Camera>
//                     )}
//                     <Camera 
//                       style={{ 
//                         flex: 1, 
//                         justifyContent: 'space-between' 
//                       }} 

//                       type={Camera.Constants.Type.back}
//                       ref={cam => this.camera = cam}

//                     >
//                         <Header searchBar rounded
//                             style={{
//                                 position: 'absolute', backgroundColor: 'transparent',
//                                 left: 0, top: 0, right: 0, zIndex: 100, alignItems: 'center'
//                             }}
//                         >

//                             <View style={{ flexDirection: 'row', flex: 4 }}>
//                                 <Icon name="logo-snapchat" style={{ color: 'white' }} />
//                                 <Item style={{ backgroundColor: 'transparent' }}>
//                                     <Icon name="ios-search" style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}></Icon>
//                                     <Input
//                                         placeholder="Search"
//                                         placeholderTextColor="white"
//                                     />
//                                 </Item>
//                             </View>

//                             <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around' }}>
//                                 <Icon name="ios-flash" style={{ color: 'white', fontWeight: 'bold' }} />
//                                 <Icon
//                                     onPress={() => {
//                                         this.setState({
//                                             type: this.state.type === Camera.Constants.Type.back ?
//                                                 Camera.Constants.Type.front :
//                                                 Camera.Constants.Type.back
//                                         })
//                                     }}
//                                     name="ios-reverse-camera" style={{ color: 'white', fontWeight: 'bold' }} />
//                             </View>
                            
//                         </Header>

//                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 15, alignItems: 'flex-end' }}>
//                             <MaterialCommunityIcons name="message-reply"
//                                 style={{ color: 'white', fontSize: 36 }}
//                             ></MaterialCommunityIcons>

//                             <View style={{ alignItems: 'center' }}>

//                               <TouchableOpacity onPress={this.takePicture}>
//                                 <MaterialCommunityIcons name="circle-outline"
//                                     style={{ color: 'white', fontSize: 100 }}
//                                 >
//                                 </MaterialCommunityIcons>
//                               </TouchableOpacity>


//                                 <Icon name="ios-images" style={{ color: 'white', fontSize: 36 }} />

//                             </View>
//                             <MaterialCommunityIcons name="google-circles-communities"
//                                 style={{ color: 'white', fontSize: 36 }}
//                             ></MaterialCommunityIcons>

//                         </View>
                        
//                     </Camera>

//                 </View>
//             )
//         }
//     }
// export default CameraExample;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });