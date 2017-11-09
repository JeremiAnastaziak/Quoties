import React from 'react';
import Quotes from '../Quotes/Quotes';

const filterQuotes = quotes => {
    Object.keys(quotes).filter(
        index => !quotes[index].starred && delete quotes[index]
    );
    return quotes;
};

const Starred = props => {
    const { quotes, ...otherProps } = props;
    return <Quotes {...otherProps} quotes={filterQuotes({ ...quotes })} />;
};

export default Starred;
