import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/auth/auth';
import { fetchCart } from '../../store/cart/cart';

export class SearchBar extends React.Component {
  componentDidMount() {
    this.props.getCart();
  }
  render() {
    let handleClick = this.props.handleClick;
    let isLoggedIn = this.props.isLoggedIn;
    let cart = this.props.cart || {};
    let cartItems = cart.cartItems || [];
    let cartTotalItems = cartItems.reduce(
      (accum, cur) => accum + cur.quantity,
      0
    );

    return (
      <div className="search-bar-container">
        <div className="logo-name">
          <h1>Every Daisy of the Week</h1>
        </div>
        <nav>
          <div className="search-bar">
            <label htmlFor="search">Search Products:</label>
            <input
              type="text"
              placeholder="enter your terms..."
              name="search"
            />
            <button>Submit</button>
          </div>

          <div className="cart">
            <button>Cart</button>
          </div>

          <div className="user-actions">
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
          </div>

          <div className="burger-button">
            <button>hamburger</button>
          </div>

          <div className="burger-menu">
            <a>Account</a>
            <a>Orders</a>
            <a>Sale</a>
            <a>Recommendations</a>
          </div>
          <div className="cart-icon">
            <span>{`Cart (${cartTotalItems})`}</span>
          </div>
        </nav>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick: () => dispatch(logout()),
    getCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapState, mapDispatch)(SearchBar);
