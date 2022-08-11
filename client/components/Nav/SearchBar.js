import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../store/auth/auth';
import { fetchCart } from '../../store/cart/cart';
import { fetchProducts } from '../../store/products/allProducts';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import './NavBar.css';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      search: ''
    }
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(event){
    this.setState({search: event.target.value})
  }

  componentDidMount() {
    this.props.getCart();
    this.props.getProducts();
  }

  render() {
    let handleClick = this.props.handleClick;
    let isLoggedIn = this.props.isLoggedIn;
    let { updateSearch } = this
    let filteredProducts = this.props.products.filter((product)=> {
      return product.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    })
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
            <Nav.Link as={NavLink} to={isLoggedIn ? `/users/${this.props.id}` : '/home'}>Account</Nav.Link>
            {isLoggedIn ? 
            <Nav.Link onClick={handleClick}>Logout</Nav.Link>:
            <div>
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
            </div>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <InputGroup className="col-6">
          <FormControl
            placeholder="Search for products"
            aria-label="Search"
            aria-describedby="basic-addon2"
            type="text"
            value={this.state.search}
            onChange={updateSearch}
          />
          <div>
            {this.state.search != 0 ? (
              <ul>
                {filteredProducts.map((product) => {
                    return (
                      <ListGroup key={product.id}>
                        <ListGroupItem key={product.id} value={product.title} as={NavLink} to={`/products/${product.id}`}>
                          {product.title}
                        </ListGroupItem>
                      </ListGroup>
                    );
                })}
              </ul>
            ) : (
              ""
            )}
          </div>
          <Button variant="outline-secondary" id="button-addon2" onClick={handleClick}>
            Search
          </Button>
    </InputGroup>

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
    products: state.allProducts,
    isLoggedIn: !!state.auth.id,
    cart: state.cart,
    id: state.auth.id
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick: () => dispatch(logout()),
    getCart: () => dispatch(fetchCart()),
    getProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(SearchBar);
