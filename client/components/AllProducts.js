import React from 'react';
import { fetchProducts } from '../store/allProducts';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    let products = this.props.products;
    return (
      <div
        className="products-component"
        style={{ margin: 'auto', textAlign: 'center', fontFamily:'Consolas, monaco, monospace' }}
      >
        <h1 style={{color:'#96716B'}}>Every plant you see is cat or dog safe for your furry little friends!</h1>
        {products.map((product) => {
          return (
            <div
              className="products-container"
              key={product.id}
              style={{
                border: '2px solid #7A968C',
                borderRadius:'25px ',
                marginTop: '20px',
                backgroundColor: '#FFF0E6',
                padding:'5px'
              }}
            >
              <Link to={`/products/${product.id}`}>
                <h1 style={{ color: '#96716B' }}>{product.title}</h1>
              </Link>
              <img
                src={product.image}
                style={{ width: '15rem', height: '15rem', borderRadius: '25%', border:'4px solid #7A968C' }}
              />
              <p><small>${product.price}</small></p>

              <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <span className="star" key={index}>
                      &#9733;
                    </span>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.allProducts,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
