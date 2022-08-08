import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../../store/products/singleProduct';
import Review from "../Elements/AddReview"

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
      <div className="container">
        <div key={product.id}>
          <img src={product.image} />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button>Add To Cart</button>
          <Review> Add Review: </Review>
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
});

export default connect(mapState, mapDispatch)(SingleProduct);
