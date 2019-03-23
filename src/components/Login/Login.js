import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import get from 'lodash.get';
import { loginWithGoogle, logInAnonymously } from '../../api/auth';

const loginSectionStyles = {
  maxWidth: 'var(--app-max-width)',
  margin: '0 auto',
  textAlign: 'center',
  position: 'relative',
  top: '50%',
  padding: 'var(--app-padding)',
};

class Login extends React.Component {
  handleLogin = (fun, prop) => {
    fun();
    this.setState({
      [prop]: true,
    });
  }

  render() {
    return (
      <section style={loginSectionStyles}>
        <header className="landing-header header">
          <h1 style={{ fontSize: '52px' }}>Quoties</h1>
          <h2>Store your quotes, clean</h2>
        </header>
        <RaisedButton
          onClick={() => this.handleLogin(loginWithGoogle, 'fetchingGoogle')}
          label="Log in with Google"
          labelPosition="before"
          icon={get(this.state, 'fetchingGoogle') ? <CircularProgress size={30} /> : null}
          primary
          fullWidth
        />
        <FlatButton
          style={{ marginTop: '10px' }}
          onClick={() => this.handleLogin(logInAnonymously, 'fetchingAnonymously')}
          label="Test app and log in anonymously"
          labelPosition="before"
          icon={get(this.state, 'fetchingAnonymously') ? <CircularProgress size={30} /> : null}
          fullWidth
        />
      </section>
    );
  }
}

export default Login;
