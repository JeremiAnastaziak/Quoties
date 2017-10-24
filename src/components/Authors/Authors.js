import React from 'react';
import Quote from '../Quote/Quote';
import './Authors.css';

function Authors(props) {
  let avatarsAsLetters = []

  const editQuote = (quoteId) => {
    this.props.editQuote(quoteId);
  }

  const shouldRenderAvatar = (author) => {
    const authorFirstLetter = author[0];
    if (avatarsAsLetters.includes(authorFirstLetter)) return false
    
    avatarsAsLetters.push(authorFirstLetter);
    return true
  }

  const {
    quotes,
    user } = props;

  return (
    <div className="authors">
      {quotes && Object
        .keys(quotes)
        .sort((lastOne, nextOne) => quotes[lastOne].quoteAuthor > quotes[nextOne].quoteAuthor)
        .map(index =>

          <Quote
            key={index}
            quote={quotes[index]}
            index={index}
            user={user}
            editQuote={editQuote}
            renderAvatar={shouldRenderAvatar(quotes[index].quoteAuthor)} />
        )}
    </div>
  )
}

export default Authors;