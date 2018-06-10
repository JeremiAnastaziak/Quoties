import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { loginWithGoogle, logInAnonymously } from '../../api/auth';

const loginSectionStyles = {
  maxWidth: 'var(--app-max-width)',
  margin: '0 auto',
  textAlign: 'center',
  position: 'relative',
  top: '50%',
  padding: 'var(--app-padding)',
};

const Login = () => (
  <section style={loginSectionStyles}>
    <header className="landing-header header">
      <h1 style={{ fontSize: '52px' }}>Quoties</h1>
      <h2>Store your quotes, clean</h2>
    </header>
    <RaisedButton
      label="Log in with Google"
      onTouchTap={loginWithGoogle}
      fullWidth
      primary
    />
    <FlatButton
      style={{ marginTop: '10px' }}
      label="Test app and log in anonymously"
      fullWidth
      onTouchTap={logInAnonymously}
    />
  </section>
);

export default Login;
