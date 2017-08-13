import React, { Component } from 'react';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import './Login.css'

class Login extends Component {

  constructor(props) {
    super(props);

  }

	handleEmailLogin = () => {
		let email = this.email.input.value;
		let password = this.password.input.value;
		console.log(email);
		console.log(password)
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then( () => {
				console.log('user logged in')
			})
			.catch( (error) => {
				// Handle Errors here.
				console.error('user logged in')
				var errorCode = error.code;
				var errorMessage = error.message;
				// ...
			});
	}

  handleGoogleLogin = () => {
  	this.setState({
  		user: 'dada'
  	})
		var provider = new firebase.auth.GoogleAuthProvider();
  	provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  	provider.setCustomParameters({
		  'login_hint': 'user@example.com'
		});
  	firebase.auth().signInWithPopup(provider).then(function(result) {
		  var token = result.credential.accessToken;
		}).catch(function(error) {
			console.error(error);
		});
  }

  handleLogout = () => {
  	firebase.auth().signOut().then(function(result){
  	}).catch(function(error){
			console.error(error)
  	});
  }

  render() {
    return (
      <div className="flex-box">
				<div>
					<TextField
						hintText="E-mail field"
						floatingLabelText="E-mail"
						floatingLabelFixed={true}
						type="e-mail"
						fullWidth
						autoComplete={"off"}
						ref={(email) => { this.email = email }}
					/>
					<TextField
						hintText="Password Field"
						floatingLabelText="Password"
						floatingLabelFixed={true}
						type="password"
						fullWidth
						ref={(password) => { this.password = password }}
						
					/>
					<RaisedButton 
						label="Log in" 
						onTouchTap={this.handleEmailLogin} 
						primary={true} 
						fullWidth={true} 
						style={{marginTop: '8px'}}
					/>
					<RaisedButton 
						label="Log in with Google" 
						onTouchTap={this.handleGoogleLogin} 
						default={true} 
						fullWidth={true} 
						style={{marginTop: '8px'}}
					/>
					<Link to='/register'>
						<FlatButton 
							label="Create new account" 
							fullWidth={true}
							default={true}
							style={{marginTop: '12px'}}
						/>
					</Link>
      	</div>
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