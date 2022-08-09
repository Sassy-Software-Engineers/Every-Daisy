import React from 'react';
import { connect } from 'react-redux';
import { addNewReview } from '../../store/products/singleProduct';


export class AddReview extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addReview(this.props.product.id, this.state);
    this.setState({
      title: '',
      content: '',
    });
  }

  render() {
    const { title, content } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div>
        <form id="ProductReview-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />

          <label htmlFor="content">Review:</label>
          <input
            type="text"
            name="content"
            value={content}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    product: state.singleProduct
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addReview: (productId,review) => dispatch(addNewReview(productId, review)),
  };
};

export default connect(mapState, mapDispatchToProps)(AddReview);
