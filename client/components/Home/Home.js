import React from 'react';
import { connect } from 'react-redux';
import './Home.css';
import { fetchProducts } from '../../store/products/allProducts';
/**
 * COMPONENT
 */
export class Home extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { username } = this.props;
    const products = this.props.products || [];
    return (
      <div className="homepage">
        <h3>Welcome{username && `, ${username}`}!</h3>
        <div className="featured-products">
          Staff Picks
          <div className="card">
            <img
              className="card-img-top"
              src={products.length > 0 ? products[0].image : undefined}
              alt="wild catnip"
            />
            <div className="card-title">
              {products.length > 0 ? products[0].title : <div>Loading...</div>}
            </div>
            <div className="card-body">
              Cats go crazy for our farm-grown catnip!
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    products: state.allProducts,
  };
};
const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  };
};
export default connect(mapState, mapDispatch)(Home);
