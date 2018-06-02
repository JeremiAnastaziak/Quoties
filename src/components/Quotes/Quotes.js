import React from 'react';
import Quote from '../Quote/Quote';
import './index.css';

const Quotes = ({ author, starred, quotes = {}, submitQuote, deleteQuote }) => {
    return (
        <div className="cards">
            { Object.keys(quotes)
                .reverse()
                .filter(index => !author || quotes[index].quoteAuthor === author.replace('-', ' '))
                .filter(index => !starred || quotes[index].starred)
                .map(index => (
                    <Quote
                        key={index}
                        quote={quotes[index]}
                        index={index}
                        submitQuote={submitQuote}
                        deleteQuote={deleteQuote}
                    />))
            }
        </div>
    );
};

export default Quotes;
