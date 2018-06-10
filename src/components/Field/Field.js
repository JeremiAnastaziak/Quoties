import React from 'react';
import TextField from 'material-ui/TextField';

const Field = props => (
  <TextField
    {...props}
    floatingLabelStyle={{ fontSize: '18px' }}
    autoComplete="off"
    fullWidth
    floatingLabelFixed
  />
);

export default Field;
