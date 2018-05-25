import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import './NewPost.css'
import Capture from '../Capture/Capture';
import { toggleBodyClass } from '../../lib/helpers';
import { visionApiKey } from 'private/config';

class NewPost extends Component {
	constructor() {
		super();
		this.state = {
			quoteText: '',
			quoteAuthor: '',
			quoteTitle: '',
			quoteTags: '',
			edition: false,
			data: { responses: [{ textAnnotations: []}]},
		}

	}

	componentDidMount() {
		const { quoteId } = this.props.match.params;

		if (this.props.quotes && quoteId) {
			const quote = this.props.quotes[quoteId];

			this.setState({
				...quote,
				edition: true,
				quoteTags: quote.quoteTags && (quote.quoteTags.join(' ') + ' ')
			})
		}
	}

	updateInput = ({ target: { name, value } }) => {
		this.setState({
			[name]: value
		})
	}

	submitQuote = (e) => {
		e.preventDefault();
		const { quoteId } = this.props.match.params;

		this.props.submitQuote(quoteId, {
			quoteAuthor: this.state.quoteAuthor,
			quoteText: this.state.quoteText,
			quoteTitle: this.state.quoteTitle,
			quoteTags: this.state.quoteTags ? this.state.quoteTags.trim().split(' ') : []
		})
	}

	render() {
		return (
			<div className="wrapper">
				<Capture />
				<form ref={(form) => this.quoteForm = form} onSubmit={(e) => this.submitQuote(e)}>
					<AutoComplete
						className="field"
						name="quoteAuthor"
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
						name="quoteText"
						ref={(input) => this.qText = input}
						onChange={this.updateInput}
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
						name="quoteTitle"
						onChange={this.updateInput}
						onFocus={e => this.setState({ edition: true })}
						onBlur={e => this.setState({ edition: false })}
						floatingLabelText="Source"
						fullWidth
						value={this.state.quoteTitle}
						floatingLabelFixed
					/>
					<TextField
						className="field"
						name="quoteTags"
						onChange={this.updateInput}
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
