import React from 'react';
import { connect } from 'react-redux';
import { addNewReview } from '../../store/products/singleProduct';
import { Form, Button, Row, Col } from 'react-bootstrap';

export class AddReview extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      starRating: '',
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
      starRating: '',
    });
  }

  render() {
    const { title, content } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label column lg={2}>
            Title:
          </Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label column lg={2}>
            Review:
          </Form.Label>
          <Form.Control
            type="text"
            value={content}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
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
    addReview: (productId, review) => dispatch(addNewReview(productId, review)),
  };
};

export default connect(mapState, mapDispatchToProps)(AddReview);
