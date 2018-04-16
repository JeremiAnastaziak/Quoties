import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import './NewPost.css'
import { toggleBodyClass } from '../../lib/helpers';

class NewPost extends Component {
	constructor() {
		super();
		this.state = {
			quoteText: '',
			quoteAuthor: '',
			quoteTitle: '',
			quoteTags: '',
			edition: false
		}

	}

	componentDidMount() {
		console.log(this.state);
		if(this.props.quote) {
			this.setState({
				...this.props.quote,
				quoteTags: this.props.quote.quoteTags && (this.props.quote.quoteTags.join(' ') + ' ')
			})
		}
	}

	submitQuote = (e) => {
		e.preventDefault();
		const isEdition = this.props.edition;
		this.props.submitQuote(isEdition, isEdition ? this.props.edition.quoteId : null, {
			quoteAuthor: this.state.quoteAuthor,
			quoteText: this.state.quoteText,
			quoteTitle: this.state.quoteTitle,
			quoteTags: this.state.quoteTags ? this.state.quoteTags.trim().split(' ') : []
		})
	}

	render() {
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
						searchText={this.state.quoteAuthor}
						filter={AutoComplete.caseInsensitiveFilter}
						dataSource={this.props.authors}
						floatingLabelFixed
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
						floatingLabelFixed
					/>
					<TextField
						className="field"
						onChange={e => this.setState({ quoteTitle: e.target.value })}
						onFocus={e => this.setState({ edition: true })}
						onBlur={e => this.setState({ edition: false })}
						floatingLabelText="Source"
						fullWidth
						value={this.state.quoteTitle}
						floatingLabelFixed
					/>
					<TextField
						className="field"
						onChange={e => this.setState({ quoteTags: e.target.value })}
						onFocus={e => this.setState({ edition: true })}
						onBlur={e => this.setState({ edition: false })}
						floatingLabelText="Tags"
						fullWidth
						value={this.state.quoteTags}
						floatingLabelFixed
					/>
					<RaisedButton
						className="button-submit"
						type="submit"
						label={this.props.edition ? 'Update' : 'Save'}
						primary
					/>
					{this.state.edition ? toggleBodyClass('edition-mode') : ''}
				</form>
			</div>
		);
	}
}

export default NewPost;
