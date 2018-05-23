import React from 'react';
import Quote from '../Quote/Quote';

const Quotes = ({ quotes, toggleStarred, editQuote, deleteQuote }) => {
    console.log(quotes);
    return (
        <div>
            {quotes &&
                Object.keys(quotes)
                    .reverse()
                    .map(index => (
                        <Quote
                            key={index}
                            quote={quotes[index]}
                            index={index}
                            editQuote={editQuote}
                            toggleStarred={toggleStarred}
							deleteQuote={deleteQuote}
                        />
                    ))}
        </div>
    );
};

export default Quotes;
