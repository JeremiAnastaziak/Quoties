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
var config = {
    apiKey: "AIzaSyBuqmEmntHihsdIaWkXEqsJVJ6U8XbowX8",
    authDomain: "quotes-fc74b.firebaseapp.com",
    databaseURL: "https://quotes-fc74b.firebaseio.com",
    projectId: "quotes-fc74b",
    storageBucket: "quotes-fc74b.appspot.com",
    messagingSenderId: "227040214982"
  };
  
  firebase.initializeApp(config);
ReactDOM.render((
    <MuiThemeProvider>
			<App />
    </MuiThemeProvider>
	), document.getElementById('root'));
registerServiceWorker();
