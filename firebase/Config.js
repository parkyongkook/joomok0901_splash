import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyADWvLTsMPEsgjhLoz9Wd1XokCiLUxu-MQ",
    authDomain: "boxingscheduler.firebaseapp.com",
    databaseURL: "https://boxingscheduler.firebaseio.com",
    projectId: "boxingscheduler",
    storageBucket: "boxingscheduler.appspot.com",
    messagingSenderId: "886048952836"
};

firebase.initializeApp(config);
const database = firebase.database();
const fireDataBase = firebase.database().ref();
var finalData; 
fireDataBase.on("value",snap => {
    finalData = snap.val()
})

export default finalData;