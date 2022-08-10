import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SearchBar from './components/Nav/SearchBar';
import Routes from './components/Routes';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const App = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <SearchBar />
        <Routes />
      </Elements>
    </div>
  );
};

export default App;
