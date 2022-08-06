import React from 'react';
import { fetchProducts } from '../../store/products/allProducts';
import { fetchCategories } from '../../store/categories/allCategories';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, setCartAdd } from '../../store/cart/cart';

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }
  handleClick(e) {
    this.props.addItem(e.target.value);
  }
  componentDidMount() {
    this.props.getProducts();
    this.props.getCategories();
  }

  render() {
    let products = this.props.products;
    let categories = this.props.categories;
    let currentFilter = this.state.filter;

    return (
      <div
        className="products-component"
        style={{
          margin: 'auto',
          textAlign: 'center',
          fontFamily: 'Consolas, monaco, monospace',
        }}
      >
        <h1 style={{ color: '#96716B' }}>
          Every plant you see is cat or dog safe for your furry little friends!
        </h1>

        <div className="category-filter">
          <select onChange={this.handleChange}>
            <option value="all">Show All</option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        {
          // might need to change to fit whatever the path to the product's categories is
          // EVERY product should have a category
          products
            .filter((product) => {
              if (currentFilter !== 'all') {
                return product.categories.includes(currentFilter);
              } else {
                return product;
              }
            })
            .map((product) => {
       // might need to change product.reviews to whatever the path is to get each review
              let averageRating = Math.floor(
                product.reviews.reduce((accum, cur) => {
                  return cur.starRating + accum;
                }, 0) / product.reviews.length
              );
              
              return (
                <div
                  className="products-container"
                  key={product.id}
                  style={{
                    border: '6px solid #7A968C',
                    borderRadius: '25px ',
                    marginTop: '20px',
                    backgroundColor: '#E8DBD1',
                    padding: '5px',
                  }}
                >
                  <Link to={`/products/${product.id}`}>
                    <h1 style={{ color: '#96716B' }}>{product.title}</h1>
                  </Link>

                  <img
                    src={product.image}
                    style={{
                      width: '15rem',
                      height: '15rem',
                      borderRadius: '25%',
                      border: '4px solid #7A968C',
                    }}
                  />

                  <div>
                    <small>${product.price}</small>{' '}
                    <button value={product} onClick={this.handleClick}>
                      ADD TO CART
                    </button>
                  </div>

                  <div className="star-rating">
                    {[...Array({ averageRating })].map((star, index) => {
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
            })
        }
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.allProducts,
    categories: state.allCategories,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    getCategories: () => dispatch(fetchCategories()),
    getCart: () => dispatch(fetchCart()),
    addItem: (product) => dispatch(setCartAdd(product)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
