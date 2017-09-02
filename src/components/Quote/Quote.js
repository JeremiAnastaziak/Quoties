import React from 'react';
import * as firebase from 'firebase';
import { ListItem } from 'material-ui/List';
import QuoteOptions from './QuoteOptions';
import { cyan500, transparent } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

class Quote extends React.Component {

  deleteQuote = (quoteId) => {
		const qRef = firebase.database().ref(`/users/${this.props.user.uid}/quotes/${quoteId}`)
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

  toggleStarred = (quoteId) => {
		const qRef = firebase.database().ref(`/users/${this.props.user.uid}/quotes/${quoteId}`)
		qRef
			.update({ starred: !this.props.quotes[quoteId].starred })
  }
  
  renderLetter = (letter) => {
    return (
      <Avatar
        color={cyan500} backgroundColor={transparent}
        style={{ left: 8 }}
      >
        {letter}
      </Avatar>
    )
  }

  
  render() {
    const emptyAvatar = (<Avatar backgroundColor={transparent} style={{ left: 8 }}> </Avatar>)
    const quote = this.props.quote;
    const divider = this.props.divider;
    return (
      <div key={this.props.index}>
        {divider && <Divider inset={true} />}
        <ListItem
          key={this.props.index}
          primaryText={quote.quoteText}
          secondaryText={quote.quoteAuthor}
          leftAvatar={
              divider && this.renderLetter(divider)
          }
          rightIconButton={
            <QuoteOptions
              key={this.props.index}
              qid={this.props.index}
              starred={quote.starred}
              editQuote={this.editQuote}
              deleteQuote={this.deleteQuote}
              toggleStarred={this.toggleStarred}
            />}
        />
      </div>
    )
  }
}

export default Quote;