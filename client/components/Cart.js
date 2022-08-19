import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, setCartAdd, setCartRemove } from '../store/cart/cart';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Cart.css'
import Card from 'react-bootstrap/Card';

export class Cart extends React.Component {
  constructor() {
    super();
  }

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
      <div className="cart">
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => {
            return (
              <Card className='card' key={cartItem.id}>
                <Link to={`/products/${cartItem.productId}`}>
                  <Card.Title className='title'><h2>{cartItem.product.title}</h2></Card.Title>
                </Link>
                <Card.Body className="quantity">
                  Quantity: {cartItem.quantity}
                  <Button
                    value={cartItem.product}
                    onClick={() => this.props.addToCart(cartItem.product)}
                  >
                    +
                  </Button>
                  <Button
                    value={cartItem.product}
                    onClick={() => this.props.removeFromCart(cartItem.product)}
                  >
                    -
                  </Button>
                </Card.Body>
                <h3>${(cartItem.product.price * cartItem.quantity).toFixed(2)}</h3>
              </Card>
            );
          })
        ) : (
          <div>No items yet! Click on "Products" to start shopping!</div>
        )}
        <Card>
        <h1>TOTAL: ${totalPrice.toFixed(2)}</h1>
        </Card>
        <Link to={'/checkout'}>
          <Button type="submit">Checkout</Button>
        </Link>
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
