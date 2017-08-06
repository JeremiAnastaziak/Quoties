import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase';
import './New-post.css'


class NewPost extends Component {

  constructor(props) {
    super(props);

		this.submitQuote = this.submitQuote.bind(this);
  }

  componentDidMount() {
		
	}

	submitQuote() {
		const text = document.querySelector('#quote_text');
		const title = document.querySelector('#quote_title');
		const author = document.querySelector('#quote_author');

		firebase.database().ref('/users').set({
			quoteText: text.value,
			quoteAuthor: author.value,
			quoteTitle: title.value
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

      </div>
    );
  }
}

export default NewPost;