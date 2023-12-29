import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import '../node_modules/bulma/css/bulma.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

import App from './App';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './utils/ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <ErrorBoundary fallbackComponent={toast.error('server occurd please try again ',{ position: toast.POSITION.TOP_CENTER})}>
    <BrowserRouter>
    <Provider store={store}>
      <App /> 
    </Provider>
    </BrowserRouter>
    </ErrorBoundary> 
  </React.StrictMode>,
  document.getElementById('root')
);
