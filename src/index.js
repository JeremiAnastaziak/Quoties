import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { initFirebase } from './lib/api';

import './styles/colors.css';

initFirebase();
injectTapEventPlugin();

ReactDOM.render((
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
), document.getElementById('root'));

registerServiceWorker();
