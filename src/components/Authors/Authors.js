import React from 'react';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v1';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Encouragement from '../Encouragement/Encouragement';

const Authors = ({ authors, history }) => (
  <List className="cards" style={{ padding: 0 }}>
    { authors.map(author => (
      <Paper
        key={uuid()}
        className="author-wrapper"
        zDepth={1}
        onClick={() => history.push(`/quotes/${author.replace(' ', '-')}`)}
      >
        <ListItem primaryText={author} />
      </Paper>
    )) }
    {!authors.length && <Encouragement page="author" />}
  </List>
);

export default withRouter(Authors);
