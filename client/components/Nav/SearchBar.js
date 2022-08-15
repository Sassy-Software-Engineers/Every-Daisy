import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './NavBar.css';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { fetchProducts } from '../../store/products/allProducts';
import { fetchCart } from '../../store/cart/cart';
import { logout } from '../../store/auth/auth';

export class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  componentDidMount() {
    this.props.getCart();
    this.props.getProducts();
  }

  render() {
    const { handleClick } = this.props;
    const { isLoggedIn } = this.props;
    const { updateSearch } = this;
    const filteredProducts = this.props.products.filter(
      (product) =>
        product.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
    );
    const cart = this.props.cart || {};
    const cartItems = cart.cartItems || [];
    const cartTotalItems = cartItems.reduce(
      (accum, cur) => accum + cur.quantity,
      0
    );
    return (
      <div className="search-bar-container">
        <h1>
          Every Daisy of the Week{' '}
          <img src="https://i.pinimg.com/originals/1f/57/6e/1f576ef8600d437f6f8c73c81ddbcbf0.png" />
        </h1>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/products">
                  Products
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to={isLoggedIn ? `/users/${this.props.id}` : '/home'}
                >
                  Account
                </Nav.Link>
                {isLoggedIn ? (
                  <Nav.Link onClick={handleClick}>Logout</Nav.Link>
                ) : (
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                )}
                {isLoggedIn ? (
                  ''
                ) : (
                  <Nav.Link as={NavLink} to="/signup">
                    Signup
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <InputGroup className="col-6">
          <ListGroup>
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
                  {filteredProducts.map((product) => (
                    <ListGroup key={product.id}>
                      <ListGroupItem
                        key={product.id}
                        value={product.title}
                        as={NavLink}
                        to={`/products/${product.id}`}
                      >
                        {product.title}
                      </ListGroupItem>
                    </ListGroup>
                  ))}
                </ul>
              ) : (
                ''
              )}
            </div>
          </ListGroup>
          <div>
            <Button
              variant="outline-secondary"
              onClick={handleClick}
              className="search-btn"
            >
              Search
            </Button>
          </div>
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

const mapState = (state) => ({
  products: state.allProducts,
  isLoggedIn: !!state.auth.id,
  cart: state.cart,
  id: state.auth.id,
});

const mapDispatch = (dispatch) => ({
  handleClick: () => dispatch(logout()),
  getCart: () => dispatch(fetchCart()),
  getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(SearchBar);
