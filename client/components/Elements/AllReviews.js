import React from 'react';
import { connect } from 'react-redux';

export class AllReviews extends React.Component {

}

const mapDispatchToProps = (dispatch) => {
    return {
        addReview: (review) => dispatch(addNewReview(review))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
