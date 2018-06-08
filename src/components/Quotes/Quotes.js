import React from 'react';
import { withRouter } from 'react-router-dom';
import Quote from '../Quote/Quote';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import './index.css';

const Quotes = ({ history, author, starred, quotes, submitQuote, deleteQuote }) => {
    return (
        <div>
            { author &&
                <Chip style={{margin: '8px 0 0 8px'}}
                    onRequestDelete={() => history.push('/quotes')}>
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
                {!quotes &&
                    <div style={{textAlign: 'center'}}>
                        <p>You don't have any quotes yet.</p>
                        <RaisedButton
                            onClick={() => history.push('/add')}
                            label='Add your first quote'
                            primary
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default withRouter(Quotes);
