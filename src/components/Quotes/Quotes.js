import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ListItem } from 'material-ui/List';
import QuoteOptions from './QuoteOptions';
import { cyan500, transparent } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

class Quotes extends Component {

	constructor() {
		super();

		this.authors = window.location.pathname.indexOf('authors') > -1 ? true : false;
		this.dividers = []

	}
	deleteQuote = (quote) => {
		const qRef = firebase.database().ref(`/users/${this.props.user.uid}/quotes/${quote}`)
		qRef
			.remove()
			.then(() => {
				console.log('Q deleted')
			})
			.catch((error) => {
				console.error(error);
			})
	}

	editQuote = (quoteId) => {
		this.props.editQuote(quoteId);
	}

	renderAvatar = author => {
		let state = this.dividers;
		this.dividers = [...state, author[0]];
		return (
			<Avatar
				color={cyan500} backgroundColor={transparent}
				style={{ left: 8 }}
			>
				{author[0]}
			</Avatar>
		) 
	}

	renderQuote = (quote, index) => {
		const emptyAvatar = (<Avatar backgroundColor={transparent} style={{ left: 8 }}> </Avatar>)
		return (
			<div>
				{!this.dividers.includes(quote.quoteAuthor[0]) && this.authors && <Divider inset={true} />}
				<ListItem
					key={index}
					primaryText={quote.quoteText}
					secondaryText={quote.quoteAuthor}
					leftAvatar={
						this.authors ? 
							!this.dividers.includes(quote.quoteAuthor[0]) ? this.renderAvatar(quote.quoteAuthor) : emptyAvatar 
						: null
					}
					rightIconButton={
						<QuoteOptions
							key={index}
							qid={index}
							editQuote={this.editQuote}
							deleteQuote={this.deleteQuote}
						/>}
				/>
			</div>
		)
	}

	render() {
		const quotes = this.props.quotes;
		return (
			<div>
				{
					!this.authors ?
						quotes && Object
							.keys(quotes)
							.map(index => this.renderQuote(quotes[index], index))
						:
						quotes && Object
							.keys(quotes)
							.sort((lastOne, nextOne) => quotes[lastOne].quoteAuthor > quotes[nextOne].quoteAuthor)
							.map(index => this.renderQuote(quotes[index], index))
				}
			</div>
		);
	}
}

export default Quotes;