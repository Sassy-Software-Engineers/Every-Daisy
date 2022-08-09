import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, setCartAdd, setCartRemove } from '../store/cart/cart';
import { Link } from 'react-router-dom';

export class Cart extends React.Component {
  constructor() {
    super();
    // this.handleAdd = this.handleAdd.bind(this);
    // this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    console.log('COMPONENT DID MOUNT! Props:', this.props);
    this.props.fetchCart();
  }
  // handleAdd(e) {
  //   this.props.addToCart(e.target.value);
  //   this.props.fetchCart();
  // }
  // handleRemove(e) {
  //   this.props.removeFromCart(e.target.value);
  //   this.props.fetchCart();
  // }

  render() {
    // i dont know how the state will show up -> what path to use to find the product so im just guessing for now
    let cart = this.props.cart; // this.props.cart ? cart = this.props.cart : null;
    let cartItems = cart.cartItems || []; // cart.length > 0 ? let cartItems = cart.cartItems : cartItems = []
    console.log('cartItems', cartItems);
    let totalPrice = cartItems
      ? cartItems.reduce(
          (accum, cur) => accum + +cur.product.price * cur.quantity,
          0
        )
      : null;

    return (
      <div className="cart-component">
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => {
            console.log('cartItem in map', cartItem);
            return (
              <div key={cartItem.id} style={{ border: '1px solid' }}>
                <Link to={`/products/${cartItem.productId}`}>
                  <h2>{cartItem.product.title}</h2>
                </Link>
                <div className="quantity">
                  <small>{cartItem.quantity}</small>
                  {/* find the total price for each item based on how many you're buying */}
                  <button
                    value={cartItem.product}
                    onClick={() => this.props.addToCart(cartItem.product)}
                  >
                    +
                  </button>
                  <button
                    value={cartItem.product}
                    onClick={() => this.props.removeFromCart(cartItem.product)}
                  >
                    -
                  </button>
                </div>
                <p>{cartItem.product.price * cartItem.quantity}</p>
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
    fetchCart: () => dispatch(fetchCart()),
    addToCart: (product) => dispatch(setCartAdd(product)),
    removeFromCart: (product) => dispatch(setCartRemove(product)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
