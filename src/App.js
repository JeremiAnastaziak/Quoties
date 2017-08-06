import React, { Component } from 'react';
import Login from './login/Login.js'
import NewPost from './new-post/New-post.js'
import Home from './home/Home.js'

import './App.css';
import firebase, { auth, provider } from 'firebase';
import AppBar from 'material-ui/AppBar';

import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';


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
          <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            iconElementRight={<Login user={this.state.user}></Login>}
          />

          <BrowserRouter>
            <div>
              <Route exact path="/" component={Home} />
              <Route exact path="/new-post" component={NewPost} />
            </div>
          </BrowserRouter>

          {this.state.speed}
          

      </div>
    );
  }
}

export default App;
