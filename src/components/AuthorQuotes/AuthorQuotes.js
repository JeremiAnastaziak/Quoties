import React from 'react';
import Quotes from '../Quotes/Quotes';

const filterQuotes = (quotes, author) => {
    Object.keys(quotes).filter(
        index => !quotes[index].quoteAuthor.toUpperCase().includes(author.replace('-', ' ').toUpperCase()) && delete quotes[index]
    );
    return quotes;
};

const AuthorQuotes = (props) => {
    const {author, quotes, ...otherProps} = props;
    return (
        <Quotes
            {...otherProps}
            quotes={filterQuotes({...quotes}, author)}
        />
    )
}

export default AuthorQuotes;
