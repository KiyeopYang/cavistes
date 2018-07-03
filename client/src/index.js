/* global document, window */
import 'whatwg-fetch';
import 'babel-polyfill';
import Promise from 'promise-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import store, { history } from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if (!window.Promise) {
  window.Promise = Promise;
} // Promise explorer 호환
/*
Some components use react-tap-event-plugin to listen for touch events
because onClick is not fast enough
This dependency is temporary and will eventually go away.
Until then, be sure to inject this plugin at the start of your app.
https://www.npmjs.com/package/material-ui
 */
injectTapEventPlugin();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#052b76',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffffff',
      main: '#f3f3f3',
      dark: '#c3c3c3',
      contrastText: '#000',
    },
    background: {
      default: 'rgb(242,242,242)',
    },
  },
  typography: {
    fontFamily: [
      'Nanum',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
