import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { loginWithGoogle, logInAnonymously } from '../../api/auth';
import './Login.css';

const Login = () => (
  <div className="landing flex-center" style={{ maxWidth: 'var(--app-max-width)', margin: '0 auto' }}>
    <header className="landing-header header">
      <h1 className="header-heading">Quoties</h1>
      <h2 className="header-subheading">Store your quotes</h2>
      <p className="header-para">With organized way</p>
    </header>
    <RaisedButton
      label="Log in with Google"
      onTouchTap={loginWithGoogle}
      primary
      className="button-google"
    />
    <FlatButton
      style={{ marginTop: '10px' }}
      label="Test app and log in anonymously"
      onTouchTap={logInAnonymously}
      className="button-google"
    />
  </div>
);

export default Login;
