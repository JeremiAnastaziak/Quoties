import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ListItem } from 'material-ui/List';
import QuoteOptions from './QuoteOptions';

class Quotes extends Component {

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


	render() {
		const quotes = this.props.quotes;
		return (
			<div>
				<div>
					{
						quotes && Object
							.keys(quotes)
							.map(index => {
								return (
									<ListItem
										key={index}
										primaryText={quotes[index].quoteText}
										secondaryText={quotes[index].quoteAuthor}
										rightIconButton={
											<QuoteOptions
												key={index}
												qid={index}
												editQuote={this.editQuote}
												deleteQuote={this.deleteQuote}
											/>}
									/>
								)
							})
					}
				</div>
			</div>
		);
	}
}

export default Quotes;