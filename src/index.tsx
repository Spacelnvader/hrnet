import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './config/config.report';
import store from './store/main.store';
import { Provider } from 'react-redux';

import './sass/main.scss'
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
