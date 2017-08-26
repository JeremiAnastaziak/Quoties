import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import firebase from 'firebase';
import './NewPost.css'
import AuthorIcon from 'material-ui/svg-icons/social/person';
import TextIcon from 'material-ui/svg-icons/communication/chat-bubble-outline';
import TitleIcon from 'material-ui/svg-icons/communication/import-contacts';

const iconStyles = {
	marginTop: '35px',
	marginRight: '5px'
}

class NewPost extends Component {

	constructor() {
		super();
		this.state = {
			quoteText: '',
			quoteAuthor: '',
			quoteTitle: ''
		}
	}

	componentDidMount() {
		this.qText.focus();
		if (this.props.edition) {
			this.setState({
				...this.props.edition.quote
			})
		}
	}

	submitQuote = (e) => {
		e.preventDefault();
		if (this.props.edition) {
			this.props.updateQuote(this.props.edition.id, this.state);
			return
		}
		firebase.database().ref(`/users/${this.props.user.uid}/quotes`).push({
			...this.state
		}).then(() => {
			this.quoteForm.reset();
		}).catch(() => {
		})
	}

	render() {
		const quote = this.props.edition ? this.props.edition.quote : null;
		return (
			<div className="wrapper">
				<form ref={(input) => this.quoteForm = input} onSubmit={(e) => this.submitQuote(e)}>
					<div className="row">
						<TextIcon style={iconStyles} />
						<TextField
							ref={(input) => this.qText = input}
							onChange={e => this.setState({ quoteText: e.target.value })}
							floatingLabelText="Text"
							className="textarea"
							multiLine
							fullWidth
							required
							value={this.state.quoteText}
						/>
					</div>
					<div className="row">
						<AuthorIcon style={iconStyles} />
						<TextField
							onChange={e => this.setState({ quoteAuthor: e.target.value })}
							floatingLabelText="Author"
							fullWidth
							required
							value={this.state.quoteAuthor}
						/>
					</div>
					<div className="row">
						<TitleIcon style={iconStyles} />
						<TextField
							onChange={e => this.setState({ quoteTitle: e.target.value })}
							floatingLabelText="Title"
							fullWidth
							value={this.state.quoteTitle}
						/>
					</div>
					<RaisedButton
						type="submit"
						label={quote ? 'Update' : 'Save'}
						primary
						fullWidth
						style={{ marginTop: '20px' }}
					/>
					<Snackbar
						message="Quote have been submitted"
						autoHideDuration={3000}
					/>

					<Snackbar
						message="Shit! Smth went wrong. Try again."
						autoHideDuration={3000}
					/>
				</form>
			</div>
		);
	}
}

export default NewPost;