import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom';

const Encouragement = ({ page, history }) =>
  (<div style={{ textAlign: 'center' }}>
    <p>You don't have any {page} yet.</p>
    <RaisedButton
      onClick={() => history.push('/add')}
      label="Add your first quote"
      primary
    />
  </div>);

export default withRouter(Encouragement);
