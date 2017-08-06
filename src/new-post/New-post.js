import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import firebase from 'firebase';
import './New-post.css'


class NewPost extends Component {

  constructor(props) {
		super(props);
		this.state = {
			submitted: false,
			error: false
		}

		this.submitQuote = this.submitQuote.bind(this);
  }

  componentDidMount() {
		
	}

	submitQuote() {
		const text = document.querySelector('#quote_text');
		const title = document.querySelector('#quote_title');
		const author = document.querySelector('#quote_author');

		firebase.database().ref(`/users/${this.props.user.uid}`).set({
			quoteText: text.value,
			quoteAuthor: author.value,
			quoteTitle: title.value
		}).then(() => {
			this.setState({
				submitted: true,
				error: false
			})
		}).catch(() => {
			this.setState({
				error: true,
				submitted: false
			})
		})
	}

	render() {
    return (
      <div className="wrapper">
				<TextField
					floatingLabelText="Text"
					id="quote_text"
					className="textarea"
					multiLine
					fullWidth
				/>
				<TextField
					floatingLabelText="Author"
					id="quote_author"
					fullWidth
				/>
      	<TextField
					floatingLabelText="Title"
					id="quote_title"
					fullWidth
				/>
				<RaisedButton 
					label="Primary" 
					primary 
					fullWidth
					onTouchTap={this.submitQuote}
				/>

				<Snackbar
          open={this.state.submitted}
          message="Quote have been submitted"
          autoHideDuration={3000}
        />

				<Snackbar
          open={this.state.error}
          message="Shit! Smth went wrong. Try again."
          autoHideDuration={3000}
        />

      </div>
    );
  }
}

export default NewPost;