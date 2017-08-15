import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import firebase from 'firebase';
import './New-post.css'
import AuthorIcon from 'material-ui/svg-icons/social/person';
import TextIcon from 'material-ui/svg-icons/communication/chat-bubble-outline';
import TitleIcon from 'material-ui/svg-icons/communication/import-contacts';

const iconStyles = {
	marginTop: '39px',
	marginRight: '5px'
}

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

		firebase.database().ref(`/users/${this.props.user.uid}/quotes`).push({
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
				<div className="row">
					<TextIcon style={iconStyles}/>
					<TextField
						floatingLabelText="Text"
						id="quote_text"
						className="textarea"
						multiLine
						fullWidth
						required
					/>
				</div>
				<div className="row">
					<AuthorIcon style={iconStyles}/>
					<TextField
						floatingLabelText="Author"
						id="quote_author"
						fullWidth
						required
					/>
				</div>
				<div className="row">
					<TitleIcon style={iconStyles}/>
					<TextField
						floatingLabelText="Title"
						id="quote_title"
						fullWidth
					/>
				</div>
				<RaisedButton 
					label="Save" 
					primary 
					fullWidth
					onTouchTap={this.submitQuote}
					style={{marginTop: '20px'}}
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