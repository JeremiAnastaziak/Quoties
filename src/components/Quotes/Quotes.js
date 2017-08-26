import React, { Component } from 'react';
import * as firebase from 'firebase';
import { List, ListItem } from 'material-ui/List';
import QuoteOptions from './QuoteOptions';

class Quotes extends Component {

	constructor(props) {
		super(props);

		this.state = {
			quotes: {}
		}
	}

	componentDidMount() {
		if (firebase.auth().currentUser) {
			const quotesRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/quotes');
			let quotes;
			quotesRef.on('value', (snapshot) => {
				quotes = snapshot.val();

				this.setState({
					quotes
				})
			});
		}
	}

	deleteQuote = (user, quote) => {
		const qRef = firebase.database().ref(`/users/${user}/quotes/${quote}`)
		qRef
			.remove()
			.then(() => {
				console.log('Q deleted')
			})
			.catch((error) => {
				console.log(error);
			})
	}


	render() {
		const quotesData = this.state.quotes;
		return (
			<div>
				<div>
					{
						this.state.quotes && Object
							.keys(quotesData)
							.map(dataProp => {
								return <ListItem
									key={dataProp}
									primaryText={quotesData[dataProp].quoteText}
									secondaryText={quotesData[dataProp].quoteAuthor}
									rightIconButton={
										<QuoteOptions
											key={dataProp}
											uid={this.props.user.uid}
											qid={dataProp}
											deleteQuote={this.deleteQuote}
										/>}
								/>
							})
					}
				</div>
			</div>
		);
	}
}

export default Quotes;