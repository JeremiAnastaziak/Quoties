import React from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import './Login.css'

function Login() {
	let email;
	let password;
	const handleEmailLogin = () => {
		firebase.auth().signInWithEmailAndPassword(email.input.value, password.input.value)
			.then(() => {
				console.log('user logged in')
			})
			.catch((error) => {
				console.error('user logged in')
				// var errorCode = error.code;
				// var errorMessage = error.message;
			});
	}

	const handleGoogleLogin = () => {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
		provider.setCustomParameters({
			'login_hint': 'user@example.com'
		});
		firebase.auth().signInWithPopup(provider).then(function (result) {
			// var token = result.credential.accessToken;
		}).catch(function (error) {
			console.error(error);
		});
	}

	return (
		<div className="flex-box wrapper">
			<div>
				<TextField
					hintText="E-mail field"
					floatingLabelText="E-mail"
					floatingLabelFixed={true}
					type="e-mail"
					fullWidth
					autoComplete={"off"}
					ref={(input) => { email = input }}
				/>
				<TextField
					hintText="Password Field"
					floatingLabelText="Password"
					floatingLabelFixed={true}
					type="password"
					fullWidth
					ref={(input) => { password = input }}

				/>
				<RaisedButton
					label="Log in"
					onTouchTap={handleEmailLogin}
					primary={true}
					fullWidth={true}
					style={{ marginTop: '8px' }}
				/>
				<RaisedButton
					label="Log in with Google"
					onTouchTap={handleGoogleLogin}
					default={true}
					fullWidth={true}
					style={{ marginTop: '8px' }}
				/>
				<Link to='/register'>
					<FlatButton
						label="Create new account"
						fullWidth={true}
						default={true}
						style={{ marginTop: '12px' }}
					/>
				</Link>
			</div>
		</div>
	);
}

export default Login;