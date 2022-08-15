import React from 'react';
import { Container, ThemeProvider } from 'react-bootstrap';
import SearchBar from './components/Nav/SearchBar';
import Routes from './components/Routes';

const App = () => (
  <Container fluid>
    <SearchBar />
    <Routes />
  </Container>
);

export default App;
