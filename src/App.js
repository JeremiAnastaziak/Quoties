import React, { Component } from 'react';
import Login from './login/Login.js'
import logo from './logo.svg';
import './App.css';
import firebase, { auth, provider } from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var config = {
  apiKey: "AIzaSyBuqmEmntHihsdIaWkXEqsJVJ6U8XbowX8",
  authDomain: "quotes-fc74b.firebaseapp.com",
  databaseURL: "https://quotes-fc74b.firebaseio.com",
  projectId: "quotes-fc74b",
  storageBucket: "quotes-fc74b.appspot.com",
  messagingSenderId: "227040214982"
};

firebase.initializeApp(config);


class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      speed: 10
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('react');
    const speedRef = rootRef.child('speed');
    const auth = new firebase.auth();

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });

    speedRef.on('value', snap => {
      this.setState({
        speed: snap.val()
      })
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.speed}
        <MuiThemeProvider>
          <Login user={this.state.user}></Login>
        </MuiThemeProvider>

      </div>
    );
  }
}

export default App;
