import React from 'react';
import { connect } from 'react-redux';
import { removeReview } from '../../store/products/singleProduct';

export class AllReviews extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    event.preventDefault();
    this.props.deleteReview(event.target.value);
  }

    render() {
        const reviews = this.props.product.reviews
        return (
          <div>
            <h1>All Reviews:</h1>
            {reviews && reviews.length ? (
                <ul>
                    {reviews.map((review) => {
                        return (
                            <div key = {review.id}>
                                <h2>{review.title}</h2>
                                <p>{review.content}</p>
                                <button onClick={this.handleClick} value={review.id}>X</button>
                            </div>
                        );
                    })}
                </ul>
            ) : (
                <h5>No reviews yet, leaf a review!</h5>
            )
            }
          </div>
        )
    }
}

const mapState = (state) => {
    return {
        product: state.singleProduct
    }
  }

const mapDispatchToProps = (dispatch) => {
  return {
    deleteReview: (productId, review) => dispatch(removeReview(productId, review))
    
  };
};

export default connect(mapState, mapDispatchToProps)(AllReviews);
