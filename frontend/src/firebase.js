import * as firebase from 'firebase'
let database
export const init = () => {
  let config = {
    apiKey: "AIzaSyAyO_deDyZz3DTdbq-ZHE0FWgLWs1ir_5U",
    authDomain: "ywchw-221815.firebaseapp.com",
    databaseURL: "https://ywchw-221815.firebaseio.com",
    projectId: "ywchw-221815",
    storageBucket: "ywchw-221815.appspot.com",
    messagingSenderId: "26091237518"
  }
  firebase.initializeApp(config)
  database = firebase.database()
}