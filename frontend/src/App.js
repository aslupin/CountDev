import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './page/home';
import Bg from './assets/img/bg.png'
import firebase from 'firebase'

class App extends Component { 
  
  constructor(props) {
    super(props)
    var config = {
      apiKey: "AIzaSyAyO_deDyZz3DTdbq-ZHE0FWgLWs1ir_5U",
      authDomain: "ywchw-221815.firebaseapp.com",
      databaseURL: "https://ywchw-221815.firebaseio.com",
      projectId: "ywchw-221815",
      storageBucket: "ywchw-221815.appspot.com",
      messagingSenderId: "26091237518"
    }
    firebase.initializeApp(config)
  }

  



  render() {
    const bodyNew = {
      fontFamily: 'Mali',
      backgroundImage: 'url('+Bg+')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      width: 'cover'
      
      
    }
    return (
      <div className="App" style={bodyNew}>
        <Home db={firebase}/>
      </div>
    );
  }
}

export default App;
