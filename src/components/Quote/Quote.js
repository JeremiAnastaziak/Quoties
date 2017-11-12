import React from 'react';
import { ListItem } from 'material-ui/List';
import QuoteOptions from './QuoteOptions';
import {
    cyan500,
    pinkA200,
    transparent,
    yellow500,
    grey500
} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Card from 'material-ui/Card';
import classNames from 'classnames';
import Favs from 'material-ui/svg-icons/toggle/star';
import NotFavs from 'material-ui/svg-icons/toggle/star-border';

const starStyles = {
    position: 'absolute',
    right: '3px',
    top: '40px',
    padding: '5px'
};

const Quote = ({
    deleteQuote,
    toggleStarred,
    quote,
    divider,
    index,
    renderAvatar
}) => {
    return (
        <Card key={index} className={classNames({ starred: quote.starred })}>
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
                    <div>
                        <QuoteOptions
                            key={index}
                            qid={index}
                            quote={quote}
                            starred={quote.starred}
                            deleteQuote={deleteQuote}
                            toggleStarred={toggleStarred}
                        />
                        {quote.starred ? (
                            <Favs
                                onTouchTap={() => toggleStarred(index)}
                                color={yellow500}
                                style={starStyles}
                            />
                        ) : (
                            <NotFavs
                                onTouchTap={() => toggleStarred(index)}
                                color={grey500}
                                style={starStyles}
                            />
                        )}
                    </div>
                }
            />
        </Card>
    );
};

export default Quote;
