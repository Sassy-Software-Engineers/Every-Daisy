import React from 'react';
import { connect } from 'react-redux';

export class AllReviews extends React.Component {

    render() {
        const reviews = this.props.product.reviews
        return (
          <div>
            <h1>All Reviews:</h1>
            {reviews && reviews.length ? (
                <ul>
                    {reviews.map((review) => {
                        return (
                            <div>
                                <h2>{review.title}</h2>
                                <p>{review.content}</p>
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


  export default connect(mapState)(AllReviews);
