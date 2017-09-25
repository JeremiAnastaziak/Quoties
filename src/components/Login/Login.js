import React from 'react';
import * as firebase from 'firebase';

import RaisedButton from 'material-ui/RaisedButton';

import './Login.css'

function Login() {

	const handleGoogleLogin = () => {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
		provider.setCustomParameters({
			'login_hint': 'user@example.com'
		});
		firebase.auth().signInWithPopup(provider).then(function (result) {
		}).catch(function (error) {
			console.error(error);
		});
	}

	return (
		<div className="flex-box wrapper">
				{/* <TextField
					hintText="Type your e-mail here"
					floatingLabelText="E-mail"
					floatingLabelFixed={true}
					type="e-mail"
					fullWidth
					autoComplete={"off"}
					ref={(input) => { email = input }}
				/>
				<TextField
					hintText="Type your password here"
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
				/> */}
				<RaisedButton
					label="Log in with Google"
					onTouchTap={handleGoogleLogin}
					primary
					className="button-google"
				/>
				{/* <Link to='/register'>
					<FlatButton
						label="Create new account"
						fullWidth={true}
						default={true}
						style={{ marginTop: '12px' }}
					/>
				</Link> */}
		</div>
	);
}

export default Login;