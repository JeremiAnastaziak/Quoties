import React from 'react';
import Quote from '../Quote/Quote';

const Starred = ({ quotes, editQuote, toggleStarred, deleteQuote }) => {
    return (
        <div>
            {quotes &&
                Object.keys(quotes)
                    .filter(index => quotes[index].starred)
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

export default Starred;
