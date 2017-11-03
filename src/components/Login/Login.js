import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { loginWithGoogle } from '../../lib/api';
import './Login.css';

const Login = () => {
    return (
        <div className="landing flex-center">
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
        </div>
    );
};

export default Login;
