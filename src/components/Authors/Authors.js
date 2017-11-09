import React from 'react';
import { Link } from 'react-router-dom';
import Quote from '../Quote/Quote';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import './Authors.css';

const Authors = ({ editQuote, toggleStarred, deleteQuote, quotes, authors }) => {
    return (
        <List>
            {authors.map((author, index) => (
                <Link to={`/authors/${author.toLowerCase().replace(' ','-')}`} key={index}>
                    <Paper zDepth={1} className="author-wrapper">
                        <ListItem primaryText={author} />
                    </Paper>
                </Link>
            ))}
        </List>
    );
};

export default Authors;
