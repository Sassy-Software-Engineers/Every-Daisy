import React from 'react';
import { connect } from 'react-redux';
import {
  fetchProduct,
  updateProduct,
} from '../../store/products/singleProduct';
import { setCartAdd } from '../../store/cart/cart';
import AddReview from '../Reviews/AddReview';
import AllReviews from '../Reviews/AllReviews';
import './Products.css';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      price: 0,
      quantity: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate(prev) {
    if (prev.product.id !== this.props.product.id) {
      this.setState({
        title: this.props.product.title || '',
        price: this.props.product.price || 0,
        quantity: this.props.product.quantity || 0,
      });
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.updateProduct({ ...this.props.product, ...this.state });
    this.props.fetchProduct(this.props.match.params.id);
  }

  componentDidMount() {
    try {
      this.props.fetchProduct(this.props.match.params.id);
      this.setState({
        title: this.props.product.title,
        price: this.props.product.price,
        quantity: this.props.product.quantity,
      });
    } catch (err) {
      console.log('error in fetchingProducts');
    }
  }

  render() {
    const { product } = this.props;
    const { auth } = this.props;
    const { title, price, quantity } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div className="single-product-container">
        <div key={product.id}>
          <Image className="img" src={product.image} rounded />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <Button onClick={() => this.props.addToCart(product)}>
            Add To Cart
          </Button>
          {auth.isAdmin && (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control
                  name="title"
                  value={title}
                  onChange={handleChange}
                  type="text"
                />
                <Form.Label htmlFor="price">Price</Form.Label>
                <Form.Control
                  name="price"
                  value={price}
                  onChange={handleChange}
                  type="number"
                />
                <Form.Label htmlFor="quantity">Stock</Form.Label>
                <Form.Control
                  name="quantity"
                  value={quantity}
                  onChange={handleChange}
                  type="number"
                />
              </Form.Group>
              <Button variant="outline-dark" type="submit">
                Submit
              </Button>
            </Form>
          )}

          <AddReview> Add Review: </AddReview>
          <AllReviews> All Reviews: </AllReviews>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id)),
  addToCart: (product) => dispatch(setCartAdd(product)),
  updateProduct: (product) => dispatch(updateProduct(product)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
