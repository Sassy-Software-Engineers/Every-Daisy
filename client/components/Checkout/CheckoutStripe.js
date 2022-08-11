import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, setOrder } from '../../store/cart/cart';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { fetchSecret } from '../../store/checkout/checkout';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      clientSecret: '',
    };
  }
  componentDidMount() {
    this.props.fetchCart();
    this.props.setSecret();
  }

  render() {
    let cart = this.props.cart;
    let cartItems = cart.cartItems || [];
    let totalPrice = cartItems
      ? cartItems.reduce(
          (accum, cur) => accum + +cur.product.price * cur.quantity,
          0
        )
      : null;
      
      
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret: this.props.secret,
      appearance,
    };

    return (
      <div>
        <div>
          <div className="checkout-form"></div>
          <div className="cartItems-list">
            {cartItems.length > 0 ? (
              cartItems.map((cartItem) => {
                return (
                  <div key={cartItem.id}>
                    <p>{cartItem.product.title}</p>
                    <p>{cartItem.quantity}</p>
                    <p>${cartItem.product.price}</p>
                  </div>
                );
              })
            ) : (
              <div>Loading!</div>
            )}
            <p>TOTAL:${totalPrice.toFixed(2)}</p>
          </div>
          {this.props.secret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    secret: state.checkout,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    setOrder: () => dispatch(setOrder()),
    setSecret: () => dispatch(fetchSecret()),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
