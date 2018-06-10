import React from 'react';
import uuid from 'uuid/v1';
import { ListItem } from 'material-ui/List';
import {
  pinkA200,
  yellow500,
} from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';
import Card from 'material-ui/Card';
import Favs from 'material-ui/svg-icons/toggle/star';
import QuoteOptions from './QuoteOptions';

const starStyles = {
  position: 'absolute',
  right: '3px',
  top: '40px',
  padding: '5px',
};

const Quote = ({
  deleteQuote,
  submitQuote,
  quote,
  index,
}) => {
  const { quoteText, quoteAuthor, quoteTags = [] } = quote;
  return (
    <Card>
      <ListItem
        primaryText={quoteText}
        secondaryText={
          <div className="secondary-wrapper">
            <p className="author">
              {quoteAuthor}
            </p>
            <p className="tags">
              { quoteTags.map(tag =>
                (<Chip
                  className="tag"
                  backgroundColor={pinkA200}
                  key={uuid()}
                >
                  {tag}
                </Chip>))}
            </p>
          </div>
                }
        rightIconButton={
          <div style={{ marginTop: '-10px' }}>
            <QuoteOptions
              quoteId={index}
              quote={quote}
              submitQuote={submitQuote}
              deleteQuote={deleteQuote}
            />
            {quote.starred &&
              <Favs
                color={yellow500}
                style={starStyles}
              />
            }
          </div>
                }
      />
    </Card>
  );
};

export default Quote;
