import React from 'react';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Encouragement from '../Encouragement/Encouragement';
import './Authors.css';

const Authors = ({ authors, history }) => {
    return (
        <List className="cards" style={{ padding: 0 }}>
            {authors.map((author, index) => (
                <Paper
                    key={index}
                    className="author-wrapper"
                    zDepth={1}
                    onClick={() => history.push(`/quotes/${author.replace(' ','-')}`)}>
                    <ListItem primaryText={author} />
                </Paper>
            ))}
            {!authors.length && <Encouragement page="author"/>}
        </List>
    );
};

export default withRouter(Authors);
