import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { initFirebase } from './api/auth';

import './styles/variables.css';
import './styles/reset.css';
import './styles/app.css';

initFirebase();

ReactDOM.render(
  (
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  ), document.getElementById('root'),
);

registerServiceWorker();
