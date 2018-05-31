import React from 'react';
import Quote from '../Quote/Quote';

const Quotes = ({ quotes, submitQuote, deleteQuote }) => {
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
                            submitQuote={submitQuote}
							deleteQuote={deleteQuote}
                        />
                    ))}
        </div>
    );
};

export default Quotes;
