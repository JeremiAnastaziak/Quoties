import React, { Component } from 'react';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';

import './Login.css'



class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
    	user: null
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
  	const rootRef = firebase.database().ref().child('react');
    const speedRef = rootRef.child('speed');
    speedRef.on('value', snap => {
      this.setState({
        speed: snap.val()
      })
    });
  }


  handleLogin() {
  	this.setState({
  		user: 'dada'
  	})
		var provider = new firebase.auth.GoogleAuthProvider();
  	provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  	provider.setCustomParameters({
		  'login_hint': 'user@example.com'
		});
  	firebase.auth().signInWithPopup(provider).then(function(result) {
  	// This gives you a Google Access Token. You can use it to access the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  console.log(this);
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
  }

  handleLogout() {
  	firebase.auth().signOut().then(function(result){
  		console.log('dasda');
  		console.log(result);
  	}).catch(function(e){
  		console.log(e)

  	});
  }

  render() {
    return (
      <div className="wrapper">
      	
		    	{!this.props.user ? (
		    		<RaisedButton label="Log in with Google" onTouchTap={this.handleLogin} primary={true} fullWidth={true} style={{marginTop: '8px'}}/>
		    	) : (
		    		<RaisedButton label="Log out" onTouchTap={this.handleLogout} fullWidth={true} style={{marginTop: '8px'}}/>
		    	)}
      </div>
    );
  }
}

export default Login;
// <Card containerStyle={{
//       		display: 'flex',
//       		flexDirection: 'column',
//       		justifyContent: 'center',
//       		alignItems: 'center',
//       		padding: '10px'
//       	}}> 
//			  </Card>

 	// <TextField
		// 		      hintText="Hint Text"
		// 		      floatingLabelText="Floating Label Text"
		// 		      fullWidth={true}
		// 		    />