import React from 'react';
import { ListItem } from 'material-ui/List';
import QuoteOptions from './QuoteOptions';
import { cyan500, pinkA200, transparent } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const Quote = ({
    deleteQuote,
    toggleStarred,
    quote,
    divider,
    index,
    renderAvatar
}) => {
    return (
        <div key={index} className={quote.starred ? 'starred quote' : 'quote'}>
            <ListItem
                key={index}
                primaryText={quote.quoteText}
                secondaryText={
                    <div className="secondary-wrapper">
                        <p className="author">{quote.quoteAuthor}</p>
                        {quote.quoteTags && (
                            <p className="tags">
                                {quote.quoteTags.map((tag, position) => (
                                    <Chip
                                        className="tag"
                                        backgroundColor={pinkA200}
                                        key={`${index}-${position}`}
                                    >
                                        {tag}
                                    </Chip>
                                ))}
                            </p>
                        )}
                    </div>
                }
                secondaryTextLines={2}
                leftAvatar={
                    renderAvatar && (
                        <Avatar
                            color={cyan500}
                            backgroundColor={transparent}
                            style={{ left: 8 }}
                        >
                            {quote.quoteAuthor[0]}
                        </Avatar>
                    )
                }
                rightIconButton={
                    <QuoteOptions
                        key={index}
                        qid={index}
                        quote={quote}
                        starred={quote.starred}
                        deleteQuote={deleteQuote}
                        toggleStarred={toggleStarred}
                    />
                }
            />
        </div>
    );
};

export default Quote;
