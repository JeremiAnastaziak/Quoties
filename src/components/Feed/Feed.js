import React, { Component } from 'react';
import Quote from '../Quote/Quote'

class Feed extends Component {

	editQuote = (quoteId) => {
		this.props.editQuote(quoteId);
	}

	render() {
		const quotes = this.props.quotes;

		return (
			<div>
				{
					quotes && Object
						.keys(quotes)
						.reverse()
						.map(index => <Quote
							key={index}
							quote={quotes[index]}
							index={index}
							user={this.props.user}
							editQuote={this.editQuote} />)
				}
			</div>
		);
	}
}

export default Feed;