import React from 'react';
import { withRouter } from 'react-router-dom';
import Quote from '../Quote/Quote';
import Chip from 'material-ui/Chip';
import './index.css';

const Quotes = ({ history, author, starred, quotes = {}, submitQuote, deleteQuote }) => {
    return (
        <div>
            { author &&
                <Chip style={{margin: '8px 0 0 8px'}}
                    onRequestDelete={() => history.push('/quotes')}>
                    {author}
                </Chip>
            }
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
        </div>
    );
};

export default withRouter(Quotes);
