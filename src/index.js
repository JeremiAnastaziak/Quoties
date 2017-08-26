import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { config } from './private/config';
import './index.css';

injectTapEventPlugin();
firebase.initializeApp(config);
ReactDOM.render((
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
), document.getElementById('root'));