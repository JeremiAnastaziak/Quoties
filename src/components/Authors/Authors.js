import React from 'react';
import * as firebase from 'firebase';
import { ListItem } from 'material-ui/List';
import { cyan500, transparent } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Quote from '../Quote/Quote';

class Authors extends React.Component {
  constructor() {
    super();
    this.state = {
      dividers: []
    }
  }

  editQuote = (quoteId) => {
		this.props.editQuote(quoteId);
  }

  renderDividerLetter = author => {
    let state = this.state.dividers;
    state = [...state, author[0]]
    this.setState({
      dividers: state
    })

    return (
      <Avatar
        color={cyan500} backgroundColor={transparent}
        style={{ left: 8 }}
      >
        {author[0]}
      </Avatar>
    )
  }

  render() {
    const quotes = this.props.quotes;
    return (
      <div>
        {
          quotes && Object
            .keys(quotes)
            .sort((lastOne, nextOne) => quotes[lastOne].quoteAuthor > quotes[nextOne].quoteAuthor)
            //.map(index => this.renderQuote(quotes[index], index))
            .map(index => <Quote
              quote={quotes[index]}
              index={index}
              renderDividerLetter={this.renderDividerLetter}
              dividers={this.state.dividers} />) //this.renderQuote(quotes[index], index))

        }
      </div>
    )
  }
}

export default Authors;