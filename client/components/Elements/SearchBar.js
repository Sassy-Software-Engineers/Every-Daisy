import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../store/auth/auth';
import { fetchCart } from '../../store/cart/cart';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';

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
        <h1>Every Daisy of the Week</h1>
        <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand><Nav.Link as={NavLink} to="/">Home</Nav.Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
            <Nav.Link as={NavLink} to="/">Account</Nav.Link>
            {isLoggedIn ? <Nav.Link onClick={handleClick}>Logout</Nav.Link>:
            <Nav.Link as={NavLink} to="/login">Login/Signup</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <div className="search-bar">
          <label htmlFor="search">Search Products:</label>
          <input type="text" placeholder="enter your terms..." name="search" />
          <button>Submit</button>
        </div>

        <div className="cart-icon">
          <Link to={`/cart`}>
            <span>{`Cart (${cartTotalItems})`}</span>
          </Link>
        </div>
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
