import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ListItem } from 'material-ui/List';
import { cyan500, transparent } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Quote from '../Quote/Quote'

class Quotes extends Component {

	render() {
		const quotes = this.props.quotes;

		return (
			<div>
				{
					quotes && Object
							.keys(quotes)
							.map(index => <Quote quote={quotes[index]} index={index}/>)

					// !this.authors && !this.starred ?
					// 	quotes && Object
					// 		.keys(quotes)
					// 		.map(index => this.renderQuote(quotes[index], index))
					// 	:
					// 	this.authors ?
					// 		quotes && Object
					// 			.keys(quotes)
					// 			.sort((lastOne, nextOne) => quotes[lastOne].quoteAuthor > quotes[nextOne].quoteAuthor)
					// 			.map(index => this.renderQuote(quotes[index], index))
					// 		:
					// 		quotes && Object
					// 			.keys(quotes)
					// 			.filter( quoteId => quotes[quoteId].starred)
					// 			.map(index => this.renderQuote(quotes[index], index))
				}
			</div>
		);
	}
}

export default Quotes;