import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import AutoComplete from 'material-ui/AutoComplete';
import firebase from 'firebase';
import './NewPost.css'
import AuthorIcon from 'material-ui/svg-icons/social/person';
import TextIcon from 'material-ui/svg-icons/communication/chat-bubble-outline';
import TitleIcon from 'material-ui/svg-icons/communication/import-contacts';
import { Card } from 'material-ui/Card';
import { toggleBodyClass } from '../utils/helpers';

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
			quoteTitle: '',
			edition: false,
			authors: []
		}

	}

	componentDidMount() {
		this.qAuthor.focus();
		
		let authors = []
		const quotes = this.props.quotes;
		quotes && Object
			.keys(quotes)
			.map(index => !authors.includes(quotes[index].quoteAuthor) && authors.push(quotes[index].quoteAuthor))

		this.setState({
			authors: authors
		})
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
			quoteText: this.state.quoteText,
			quoteAuthor: this.state.quoteAuthor,
			quoteTitle: this.state.quoteTitle

		}).then(() => {
			console.log('added q')
			this.quoteForm.reset();
		}).catch(() => {
		})
	}

	render() {
		const quote = this.props.edition ? this.props.edition.quote : null;
		return (
			<div className="wrapper">
				<form ref={(input) => this.quoteForm = input} onSubmit={(e) => this.submitQuote(e)}>
					<AutoComplete
						className="field"
						ref={(input) => this.qAuthor = input}
						onUpdateInput={value => this.setState({ quoteAuthor: value })}
						onFocus={e => this.setState({ edition: true })}
						onBlur={e => this.setState({ edition: false })}
						floatingLabelText="Author"
						fullWidth
						required
						value={this.state.quoteAuthor}
						filter={AutoComplete.caseInsensitiveFilter}
						dataSource={this.state.authors}
					/>
					<TextField
						className="field"
						ref={(input) => this.qText = input}
						onChange={e => this.setState({ quoteText: e.target.value })}
						onFocus={e => this.setState({ edition: true })}
						onBlur={e => this.setState({ edition: false })}
						floatingLabelText="Text"
						multiLine
						rows={3}
						fullWidth
						required
						value={this.state.quoteText}
					/>
					<TextField
						className="field"
						onChange={e => this.setState({ quoteTitle: e.target.value })}
						onFocus={e => this.setState({ edition: true })}
						onBlur={e => this.setState({ edition: false })}
						floatingLabelText="Source"
						fullWidth
						value={this.state.quoteTitle}
					/>
					<RaisedButton
						className="button-submit"
						type="submit"
						label={quote ? 'Update' : 'Save'}
						primary
					/>

					{this.state.edition ? toggleBodyClass('edition-mode') : ''}

				</form>
			</div>
		);
	}
}

export default NewPost;