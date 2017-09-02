import React from 'react';
import * as firebase from 'firebase';
import { ListItem } from 'material-ui/List';
import { cyan500, transparent } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Quote from '../Quote/Quote';

class Starred extends React.Component {
  constructor() {
    super();
    this.dividers = []
  }

  editQuote = (quoteId) => {
    this.props.editQuote(quoteId);
  }

  evaluateDivider = (letter) => {
    let state = this.dividers;
    if (state.includes(letter)) {
      return null
    } else {
      this.dividers = [...state, letter]
      return letter
    }
  }

  render() {
    const quotes = this.props.quotes;
    return (
      <div className="wrapper-authors">
        {
          quotes && Object
            .keys(quotes)
            .sort((lastOne, nextOne) => quotes[lastOne].quoteAuthor > quotes[nextOne].quoteAuthor)
            .map(index => <Quote
              quote={quotes[index]}
              index={index}
              divider={this.evaluateDivider(quotes[index].quoteAuthor[0])} />)
        }
      </div>
    )
  }
}

export default Starred;