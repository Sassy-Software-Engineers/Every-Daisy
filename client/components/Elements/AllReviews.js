import React from 'react';
import { connect } from 'react-redux';
import allProducts from '../../store/products/allProducts';
import AddReview from "./AddReview"


export class AllReviews extends React.Component {
    componentDidMount() {
        this.props.getReviews();
    }

    render() {
        const reviews = this.props.reviews
        return (
          <div>
            <AddReview> Add Review: </AddReview>
            <ul>
                {reviews.map((review => {
                    return (
                        <li>
                            <p>{review.title} </p>
                            <p>{review.starRating} </p>
                            <p>{review.content}</p>
                        </li>
                    )
                }))}
                <p>Leaf a review for our plant!</p>
            </ul>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
       reviews: state.allReviews
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getReviews: () => dispatch(fetchReviews())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
