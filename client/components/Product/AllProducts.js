import React from 'react';
import { fetchProducts } from '../../store/products/allProducts';
import { fetchCategories } from '../../store/categories/allCategories';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, setCartAdd } from '../../store/cart/cart';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Products.css';
import Dropdown from 'react-bootstrap/Dropdown';

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
      filter: e
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
      <div className="products-component">
        <h1>
          Every plant you see is cat or dog safe for your furry little friends!
        </h1>

        <div className="category-filter">
          <Dropdown onSelect={this.handleChange}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="all">Show All</Dropdown.Item>
              {categories.map((category) => {
                return (
                  <Dropdown.Item key={category.id} eventKey={category.name}>
                    {category.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>


        {
          products
            .filter((product) => {
              const categoryArray = [];
              product.categories.forEach((category) => categoryArray.push(category.name))
              if (currentFilter === 'all'|| categoryArray.includes(currentFilter)) return product;
            })
            .map((product) => {
              let averageRating = Math.floor(
                product.reviews.reduce((accum, cur) => {
                  return cur.starRating + accum;
                }, 0) / product.reviews.length
              ) || 0;

              return (
                <div className="products-container" key={product.id}>
                  <Card className="card">
                    <Link className="card-title" to={`/products/${product.id}`}>
                      <Card.Title>{product.title}</Card.Title>
                    </Link>
                    <Card.Img className="card-img" src={product.image} />
                    <Card.Body>
                      <small>${product.price}</small>{' '}
                      <Button
                        onClick={() => {
                          return this.props.addItem(product);
                        }}
                      >
                        ADD TO CART
                      </Button>
                    </Card.Body>
                    <div className="star-rating">
                      {[...Array(averageRating)].map((star, index) => {
                        index += 1;
                        return (
                          <span className="star" key={index}>
                            &#9733;
                          </span>
                        );
                      })}
                    </div>
                  </Card>
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
