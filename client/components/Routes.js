import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './Auth/AuthForm';
import Home from './Home/Home';
import { me } from '../store';
import AllProducts from './Product/AllProducts';
import SingleProduct from './Product/SingleProduct';
import Cart from './Cart';
import BPIndex from './Backpanel/BPIndex';
import Cookie from './Auth/Cookie';
import CheckoutStripe from './Checkout/CheckoutStripe';
import Confirmation from './Checkout/Confirmation';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/products/:id" component={SingleProduct} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/backpanel" component={BPIndex} />
          <Route exact path="/checkout" component={CheckoutStripe} />
          <Route exact path="/confirmation" component={Confirmation} />
          <Route path="/home">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      Cookie();
      dispatch(me());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
