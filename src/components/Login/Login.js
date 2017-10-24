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
		<div className="landing">
			<h1 className="landing-header">Quoties</h1>
			<h2 className="landing-subheader">Store your quotes</h2> 
			<p className="landing-para">With organized way</p>
			<RaisedButton
				label="Log in with Google"
				onTouchTap={handleGoogleLogin}
				primary
				className="button-google"
			/>
		</div>
	);
}

export default Login;