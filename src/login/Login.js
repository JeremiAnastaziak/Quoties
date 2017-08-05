import React, { Component } from 'react';
import './Login.css';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {

  constructor(props) {
    super(props);
  
  }

  componentDidMount() {
  	
  }

  handleLogin() {
  	const provider = new firebase.auth.GoogleAuthProvider();
  	provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  	provider.setCustomParameters({
		  'login_hint': 'user@example.com'
		});
  	firebase.auth().signInWithPopup(provider).then(function(result) {
  	// This gives you a Google Access Token. You can use it to access the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		  // ...
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});

    const rootRef = firebase.database().ref().child('react');
    const speedRef = rootRef.child('speed');
    speedRef.on('value', snap => {
      this.setState({
        speed: snap.val()
      })
    });
  }

  render() {
    return (
      <div>
    		<RaisedButton label="Login with Google" onTouchTap={this.handleLogin.bind(this)}/>
      </div>
    );
  }
}

export default Login;
