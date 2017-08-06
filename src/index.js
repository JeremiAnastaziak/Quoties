import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

//firebase.initializeApp(config);

ReactDOM.render((
    <MuiThemeProvider>
			<App />
    </MuiThemeProvider>
	), document.getElementById('root'));
registerServiceWorker();
