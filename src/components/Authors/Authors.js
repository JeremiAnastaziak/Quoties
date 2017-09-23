import React from 'react';
import Quote from '../Quote/Quote';
import './Authors.css';

class Authors extends React.Component {
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
      console.log(letter);
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
              key={index}
              quote={quotes[index]}
              index={index}
              user={this.props.user}
              divider={this.evaluateDivider(quotes[index].quoteAuthor[0])} 
              editQuote={this.editQuote} />)

        }
      </div>
    )
  }
}

export default Authors;