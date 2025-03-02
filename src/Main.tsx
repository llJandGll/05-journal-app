import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { JournalApp } from './JournalApp';

import { Provider } from 'react-redux';

import './styles.css';
import { store } from './store';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>  
    {/* <React.StrictMode> */}
      <BrowserRouter>
        <JournalApp />
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
)
