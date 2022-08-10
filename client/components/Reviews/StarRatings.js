import ReactStars from 'react-stars';
import React from 'react';
export class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
    };
  }
  ratingChanged() {
    //all reviews will render uneditable stars with edit=false
    //add review will render editable stars with edit=true
    //both need to get starRating from the db
  }
  render() {
    let rating = this.props.review.starRating;
    return (
      <ReactStars
        value={5}
        onChange={ratingChanged}
        size={24}
        color2={'#ffd700'}
        half={true}
      />
    );
  }
}
mapState = ({ singleProduct }) => ({
  reviews: state.singleProduct.reviews,
});

export default Rating;
