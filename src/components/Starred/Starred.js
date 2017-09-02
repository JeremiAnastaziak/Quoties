import React from 'react';
import Quote from '../Quote/Quote';

class Starred extends React.Component {

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
            .filter(index => quotes[index].starred)
            .map(index => <Quote
              quote={quotes[index]}
              index={index}
              editQuote={this.editQuote}
              user={this.props.user}
            />)
        }
      </div>
    )
  }
}

export default Starred;