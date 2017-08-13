import React, { Component } from 'react';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
    	user: null
		}
  }

  componentDidMount() {

	}
	
	handleNewUser = () => {
		let email = this.email.input.value;
		let password = this.password.input.value;
		console.log(email);
		console.log(password)
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then( () => {
				console.log('registered')
			})
			.catch( (error) => {
				// Handle Errors here.
				console.error("registered")
				var errorCode = error.code;
				var errorMessage = error.message;
				// ...
			});
	}

  render() {
    return (
      <div className="flex-box">
				<div>
					<TextField
						hintText="Type your e-mail here"
						floatingLabelText="E-mail"
						floatingLabelFixed={true}
						type="e-mail"
						fullWidth
						autoComplete={"off"}
						ref={(email) => { this.email = email }}
					/>
					<TextField
						hintText="Type your password here"
						floatingLabelText="Password"
						floatingLabelFixed={true}
						type="password"
						fullWidth
						ref={(password) => { this.password = password }}
					/>
					<RaisedButton 
						label="Create an account" 
						onTouchTap={this.handleNewUser} 
						primary={true} 
						fullWidth={true} 
						style={{marginTop: '8px'}}
					/>
				</div>
			</div>
    );
  }
}

export default Register;