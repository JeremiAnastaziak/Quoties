import React from 'react';
import Quote from '../Quote/Quote';
import './Authors.css';

const  Authors = ({editQuote, toggleStarred, deleteQuote, quotes}) => {
  let avatarsAsLetters = []

  const shouldRenderAvatar = (author) => {
    const authorFirstLetter = author[0];
    if (avatarsAsLetters.includes(authorFirstLetter)) return false

    avatarsAsLetters.push(authorFirstLetter);
    return true
  }

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
            editQuote={editQuote}
            deleteQuote={deleteQuote}
            toggleStarred={toggleStarred}
            renderAvatar={shouldRenderAvatar(quotes[index].quoteAuthor)} />
        )}
    </div>
  )
}

export default Authors;
