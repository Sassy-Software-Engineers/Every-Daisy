import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, addCart, removeCart } from '../../store/cart/cart';

export class Cart extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchCart();
  }
  handleAdd(e) {
    this.props.addToCart(e.target.value);
    this.props.fetchCart();
  }
  handleRemove(e) {
    this.props.removeFromCart(e.target.value);
    this.props.fetchCart();
  }

  render() {
    // i dont know how the state will show up -> what path to use to find the product so im just guessing for now
    let cart = this.state.cart;
    let cartItems = cart.cartItems || []
    let totalPrice = cartItems.reduce(
      (accum, cur) => accum + cur.price * cur.quantity,
      0
    );
    return (
      <div className="cart-component">
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => {
            return (
              <div key={cartItem.id}>
                <h2>{cartItem.product.title}</h2>
                <small>{cartItem.quantity}</small>
                {/* find the total price for each item based on how many you're buying */}
                <p>{cartItem.price * cartItem.quantity}</p>
                <button value={cartItem.product} onClick={this.handleAdd}>
                  +
                </button>
                <button value={cartItem.product} onClick={this.handleRemove}>
                  -
                </button>
              </div>
            );
          })
        ) : (
          <div>No items yet! Click on "Products" to start shopping!</div>
        )}
        <h1>TOTAL:</h1>
        <p>{totalPrice}</p>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.allProducts,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: () => dispatch(fetchCart()),
    addToCart: (product) => dispatch(addCart(product)),
    removeFromCart: (product) => dispatch(removeCart(product)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
