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
			var quotesRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid);
      let quotesData;
      quotesRef.on('value', (snapshot) => {
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
      quotes = <ListItem primaryText={quotesData.quoteText} secondaryText={quotesData.quoteAuthor}/>
    } else {
      quotes = '';
    }
    return (
      <div className="wrapper">
					<div>
						{quotes}
					</div>
					
      </div>
    );
  }
}

export default Quotes;