import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/singleProduct';

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
        </div>
      </div>
    );
  }
}

const mapState = ({ product }) => ({
  product,
});

const mapDispatch = (dispatch) => ({
  fetchProduct: (id) => dispatch(fetchStudent(id)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
