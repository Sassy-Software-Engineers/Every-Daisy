import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeReview } from '../../store/products/singleProduct';
import './Reviews.css';
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
    const reviews = this.props.product.reviews;
    return (
      <ListGroup>
        <ListGroupItem as="h4" className="review-title">
          Reviews:
        </ListGroupItem>
        {reviews && reviews.length ? (
          <ListGroupItem className="review-body">
            {reviews.map((review) => {
              return (
                <ListGroupItem key={review.id}>
                  <ListGroupItem as="h6">{review.title}</ListGroupItem>
                  <ListGroupItem>{review.content}</ListGroupItem>
                  <p> Rating: </p>
                      {[...Array(review.starRating)].map((star, index) => {
                        index += 1;
                        return (
                          <span className="star" key={index}>
                            &#9733;
                          </span>
                        );
                      })}
                </ListGroupItem>
              );
            })}
          </ListGroupItem>
        ) : (
          <ListGroupItem as="h5" className=".review-title">
            No reviews yet, leaf a review!
          </ListGroupItem>
        )}
      </ListGroup>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteReview: (productId, review) =>
      dispatch(removeReview(productId, review)),
  };
};

export default connect(mapState, mapDispatchToProps)(AllReviews);
