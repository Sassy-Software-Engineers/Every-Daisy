import React from 'react';
import { fetchProducts } from '../store/allProducts';
import { Connect } from 'react-redux';

export class AllProducts extends React.Component {
    componentDidMount(){
        this.props.getProducts()
    }
    render(){
        return (
            <div>
                {products.map((product)=>{
                    return (
                        <Card
                  style={{ width: '50rem' }}
                  className="card border-dark mb-3"
                >
                  <Card.Title>
                    <Link to={`/products/${product.id}`} className="title">
                      {product.title}
                    </Link>
                  </Card.Title>
                  <Card.Img src={product.image} />
                  if(product.reviews){
                  <Card.Text>{product.starRating}</Card.Text>}
                </Card>
                    )
                })}
                 
            </div>
        )
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
  