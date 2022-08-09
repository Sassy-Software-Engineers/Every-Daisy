import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../../store/products/singleProduct';
import { setCartAdd } from '../../store/cart/cart';
import AddReview from "../Elements/AddReview"
import AllReviews from "../Elements/AllReviews"
import './Products.css'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

class SingleProduct extends React.Component {
  componentDidMount() {
    try {
      this.props.fetchProduct(this.props.match.params.id);
    } catch (err) {
      console.log('error in fetchingProducts');
    }
  }

  render() {
    const { product } = this.props;

    return (
      <div className="single-product-container">
        <div key={product.id}>
          <Image className='img' src={product.image} rounded/>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <Button onClick={()=> this.props.addToCart(product)}>Add To Cart</Button>
          <AddReview> Add Review: </AddReview>
          <AllReviews> All Reviews: </AllReviews>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
      product: state.singleProduct
  }
}

const mapDispatch = (dispatch) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id)),
  addToCart: (product) => dispatch(setCartAdd(product))
});

export default connect(mapState, mapDispatch)(SingleProduct);
