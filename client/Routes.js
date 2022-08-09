import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/Auth/AuthForm';
import Home from './components/Home/Home';
import {me} from './store'
import AllProducts from './components/Product/AllProducts';
// import EditProduct from './components/EditProduct';
import SingleProduct from './components/Product/SingleProduct';
import Cart from "./components/Elements/Cart"
import Cookie from './components/User/Cookie';


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
            <Route exact path='/'  component={Home} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
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
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      Cookie();
      dispatch(me());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
