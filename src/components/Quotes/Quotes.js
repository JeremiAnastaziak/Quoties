import React from 'react';
import { withRouter } from 'react-router-dom';
import Chip from 'material-ui/Chip';
import CircularProgress from 'material-ui/CircularProgress';
import Quote from '../Quote/Quote';
import Encouragement from '../Encouragement/Encouragement';

const Quotes = ({
  history, author, starred, quotes, submitQuote, deleteQuote,
}) => (
  <div>
    { author &&
    <Chip
      style={{ margin: '8px 0 0 8px' }}
      onRequestDelete={() => history.push('/quotes')}
    >
      {author}
    </Chip>
            }
    <div className="cards">
      { quotes && Object.keys(quotes)
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
      <div style={{ textAlign: 'center' }}>
        {quotes && !Object.keys(quotes).length && <CircularProgress />}
        {quotes === null && <Encouragement page="quote" />}
      </div>
    </div>
  </div>
);

export default withRouter(Quotes);
