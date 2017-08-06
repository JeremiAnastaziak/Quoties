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
      user: null,
      quotes: null
    };
  }

  componentDidMount() {
    const auth = new firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        var quotesRef = firebase.database().ref('users/' + user.uid);
        let quotesData;
        quotesRef.on('value', function(snapshot) {
          quotesData = snapshot.val();
        });
        this.setState({ 
          user
         });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div className="App">
          <BrowserRouter>
            <div>
              <AppBar
                title={<Link to='/'>Title</Link>}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                iconElementRight={<Login user={this.state.user} />}
              />
              <Route exact path="/" component={() => (<Home/>)} />
              <Route exact path="/new-post" component={() => (<NewPost user={this.state.user} />)}/>
            </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
