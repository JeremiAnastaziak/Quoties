import React, { Component } from 'react';
import * as firebase from 'firebase';
import {List, ListItem} from 'material-ui/List';
import QuoteOptions from './QuoteOptions';

class Quotes extends Component {

  constructor(props) {
		super(props);
		
		this.state = {
			quotes: null
		}
  }

  componentDidMount() {
		if (firebase.auth().currentUser) {
			var quotesRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/quotes');
			let quotesData;
			quotesRef.on('value', (snapshot) => {
				console.log(snapshot.val())
				quotesData = snapshot.val();
				
				this.setState({
					quotes: quotesData
				})
			});
		}
	}

	render() {
		const quotesData = this.state.quotes;
		return (
			<div>
				<div>
					{
						quotesData ? (Object.keys(quotesData).map( dataProp => {
							return <ListItem 
												key={dataProp} 
												primaryText={quotesData[dataProp].quoteText} 
												secondaryText={quotesData[dataProp].quoteAuthor} 
												rightIconButton={
													<QuoteOptions 
														key={dataProp} 
														uid={this.props.user.uid} 
														qid={dataProp}
													/>}
											/>
						})) : ''
					}
				</div>
			</div>
		);
	}
}

export default Quotes;