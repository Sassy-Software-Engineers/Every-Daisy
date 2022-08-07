import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './App';
import Cookie from './components/User/Cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from 'react-bootstrap';


ReactDOM.render(
  <Container>
    <Cookie />
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </Container>,
  document.getElementById('app')
);
