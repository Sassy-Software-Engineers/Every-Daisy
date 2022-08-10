import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, setOrder } from '../../store/cart/cart';

export class Checkout extends React.Component {
  componentDidMount() {
    this.props.fetchCart();
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

    return (
      <div>
        <div className="checkout-form"></div>
        <div className="cartItems-list">
          {cartItems.length > 0 ? (
            cartItems.map((cartItem) => {
              return (
                <div key={cartItem.id}>
                  <p>{cartItem.product.title}</p>
                  <p>{cartItem.quantity}</p>
                  <p>{cartItem.product.price}</p>
                </div>
    );
            })
          ) : (
            <div>Loading!</div>
          )}
          <p>TOTAL: {totalPrice}</p>
        </div>
        <form action="/create-checkout-session" method="POST">
          <button type="submit">Checkout</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    setOrder: () => dispatch(setOrder()),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
