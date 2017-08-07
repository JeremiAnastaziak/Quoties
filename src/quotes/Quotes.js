import React, { Component } from 'react';
import * as firebase from 'firebase';
import {List, ListItem} from 'material-ui/List';

class Quotes extends Component {

  constructor(props) {
		super(props);
		
		this.state = {
			quotes: null
		}

		//this.renderQuotes = this.renderQuotes.bind(this);

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
		const renderQuotes = () => {
			return `
				<List>
					<ListItem 
					/>
				</List>
			`
		}

		const quotesData = this.state.quotes;
		let quotes = null;
		if (quotesData) {
			quotes = (
				<div>
					{Object.keys(quotesData).map( dataProp => {
						<ListItem key={dataProp} primaryText={quotesData[dataProp].quoteText} secondaryText={quotesData[dataProp].quoteAuthor}/>
					})} 
				</div>
			);
		 	console.log(quotes);
    } else {
			quotes = '';
    }
    return (
      <div className="wrapper">
					<div>
						{
							quotesData ? (Object.keys(quotesData).map( dataProp => {
								return <ListItem key={dataProp} primaryText={quotesData[dataProp].quoteText} secondaryText={quotesData[dataProp].quoteAuthor}/>
							})) : ''
						}
					</div>
					
      </div>
    );
  }
}

export default Quotes;